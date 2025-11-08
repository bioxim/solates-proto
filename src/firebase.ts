/* eslint-disable @typescript-eslint/no-explicit-any */
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  runTransaction, // 👈 añadido para manejo transaccional
  collectionGroup,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- Configuración Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyD8E9BpGcCvlM7nDlwIpUAka2XY8tHqpd4",
  authDomain: "solates.firebaseapp.com",
  projectId: "solates",
  storageBucket: "solates.firebasestorage.app",
  messagingSenderId: "1013713107813",
  appId: "1:1013713107813:web:0e89c9fac0f50396b13f8c",
  measurementId: "G-7DS4SMR49Z",
};

// --- Inicialización ---
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

// === Newsletter ===
export async function subscribeToNewsletter(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) throw new Error("Invalid email format.");

  try {
    const q = query(collection(db, "newsletter"), where("email", "==", email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) return snapshot.docs[0].id;

    const docRef = await addDoc(collection(db, "newsletter"), {
      email,
      createdAt: serverTimestamp(),
      verified: false,
    });

    return docRef.id;
  } catch (err) {
    console.error("Error adding email:", err);
    throw err;
  }
}

const genToken = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
};

// === Newsletter tokens ===
export async function createPendingSubscription(email: string) {
  const token = genToken();
  const docRef = await addDoc(collection(db, "newsletter"), {
    email,
    verified: false,
    token,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, token };
}

export async function verifySubscriptionToken(token: string) {
  const q = query(collection(db, "newsletter"), where("token", "==", token));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0];
  const data = docSnap.data();
  if (data.verified === true) return data.email;
  await updateDoc(doc(db, "newsletter", docSnap.id), {
    verified: true,
    verifiedAt: serverTimestamp(),
  });
  return data.email;
}

// === Registro y verificación de usuario ===
export async function registerAndSendVerification(email: string) {
  try {
    const randomPassword = Math.random().toString(36).slice(-10);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      randomPassword
    );
    await sendEmailVerification(userCredential.user);
    return true;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") return true;
    throw new Error(error.message);
  }
}

// === Listener para verificados ===
export function listenForEmailVerification() {
  onAuthStateChanged(auth, async (user) => {
    if (user && user.email && user.emailVerified) {
      try {
        await subscribeToNewsletter(user.email);
      } catch (err) {
        console.error("Error saving verified email:", err);
      }
    }
  });
}

// === Crear perfil de usuario ===
export async function createUserProfile(user: any) {
  if (!user?.uid) return;
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      avatarUrl: user.photoURL || "",
      xp: 0,
      level: 1,
      role: "student",
      referredBy: null,
      joinedAt: serverTimestamp(),
    });
  }
}

// === Actualizar perfil ===
export async function updateUserProfile(uid: string, data: Record<string, any>) {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, { ...data, updatedAt: serverTimestamp() });
  } catch (err) {
    console.error("Error updating user profile:", err);
  }
}

// === Añadir código de referido ===
export async function addReferralCode(uid: string, code: string) {
  if (!uid) return;
  try {
    const codeRef = doc(db, "users", uid, "referralCodes", code);
    await setDoc(codeRef, {
      code,
      status: "unused",
      createdAt: serverTimestamp(),
      owner: uid,
    });
  } catch (err) {
    console.error("Error adding referral code:", err);
    throw err;
  }
}

// === Actualizar estado de código ===
export async function updateReferralCode(
  uid: string,
  code: string,
  status: "unused" | "pending" | "completed"
) {
  if (!uid) return;
  try {
    const codeRef = doc(db, "users", uid, "referralCodes", code);
    await updateDoc(codeRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    console.log(`Referral code ${code} updated to ${status}`);
  } catch (err) {
    console.error("Error updating referral code:", err);
    throw err;
  }
}


// === Sumar puntos (versión transaccional) ===
export async function addUserXP(uid: string, points: number) {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  try {
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(userRef);
      if (!snapshot.exists()) return;
      const currentXP = snapshot.data()?.xp || 0;
      const newXP = currentXP + points;
      transaction.update(userRef, {
        xp: newXP,
        updatedAt: serverTimestamp(),
      });
    });
    console.log(`✅ Added ${points} XP to user ${uid}`);
  } catch (err) {
    console.error("Error adding XP transactionally:", err);
    throw err;
  }
}

// === Sistema de referidos ===
// === VERSIÓN CORREGIDA Y EFICIENTE ===
export async function handleReferralUsage(
  currentUid: string,
  referralCode: string
): Promise<string | null> {
  try {
    // 1. BÚSQUEDA EFICIENTE
    // En lugar de leer todos los usuarios, buscamos en todas las
    // subcolecciones "referralCodes" a la vez.
    const codesQuery = query(
      collectionGroup(db, "referralCodes"),
      where("code", "==", referralCode)
    );

    const codesSnap = await getDocs(codesQuery);

    if (codesSnap.empty) {
      alert("⚠️ Invalid referral code. Please check and try again.");
      console.warn("Invalid referral code:", referralCode);
      return null;
    }

    // 2. OBTENER DATOS
    const codeDoc = codesSnap.docs[0];
    const codeData = codeDoc.data();

    // Obtenemos el ID del dueño del código
    // codeDoc.ref.parent.parent -> (code) -> (referralCodes) -> (USER DOCUMENT)
    if (!codeDoc.ref.parent.parent) {
        throw new Error("Code document structure is invalid.");
    }
    const referrerUid = codeDoc.ref.parent.parent.id;

    console.log(`Found code ${referralCode} under user ${referrerUid}`);

    // 3. VALIDACIONES
    if (referrerUid === currentUid) {
      alert("⚠️ You cannot use your own referral code!");
      return null;
    }

    if (codeData.status !== "unused") {
      alert("⚠️ This code has already been used.");
      return null;
    }

    // (Opcional pero recomendado) Validar que el usuario actual no haya sido referido
    const currentUserDoc = await getDoc(doc(db, "users", currentUid));
    if (currentUserDoc.data()?.referredBy) {
         alert("⚠️ You have already used a referral code.");
         return null;
    }

    // 4. EJECUTAR ACCIONES
    // Estas funciones ahora fallarán por permisos,
    // ¡pero las arreglaremos en el Paso 2 con las reglas!

    // 💰 1️⃣ Dar puntos al que refirió
    await addUserXP(referrerUid, 100);

    // 💰 2️⃣ Dar puntos al nuevo usuario
    await addUserXP(currentUid, 15);

    // 📝 3️⃣ Actualizar estado del código
    await updateReferralCode(referrerUid, referralCode, "completed");

    // 🪪 4️⃣ Guardar quién lo refirió
    await updateUserProfile(currentUid, { referredBy: referrerUid });

    alert("🎉 Referral applied successfully!");
    console.log(`✅ Referral success: ${referrerUid} +100 / ${currentUid} +15`);
    return referrerUid; // Devuelve el ID para la UI

  } catch (err) {
    console.error("🔥 Error handling referral:", err);
    // Aquí es donde probablemente verás el error de permisos
    if ((err as Error).message.includes("permission-denied")) {
         alert("❌ Error applying referral. (Permissions error). Please check console.");
    } else {
         alert("❌ Error handling referral, please try again.");
    }
    return null;
  }
}
