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
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8E9BpGcCvlM7nDlwIpUAka2XY8tHqpd4",
  authDomain: "solates.firebaseapp.com",
  projectId: "solates",
  storageBucket: "solates.firebasestorage.app",
  messagingSenderId: "1013713107813",
  appId: "1:1013713107813:web:0e89c9fac0f50396b13f8c",
  measurementId: "G-7DS4SMR49Z",
};

// Inicialización
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);


// --- Newsletter ---
export async function subscribeToNewsletter(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) throw new Error("Invalid email format.");

  try {
    const q = query(collection(db, "newsletter"), where("email", "==", email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("Email already subscribed:", email);
      return snapshot.docs[0].id; // devuelve id existente
    }

    const docRef = await addDoc(collection(db, "newsletter"), {
      email,
      createdAt: serverTimestamp(),
      verified: false, // opcional
    });

    console.log("Email saved in Firestore:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error adding email:", err);
    throw err;
  }
}

// -- Newsletter -- generate token
const genToken = () => {
  // use crypto if available
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  try { return crypto.randomUUID(); } catch (e) { return Math.random().toString(36).slice(2)+Date.now().toString(36); }
};

/**
 * Creates a pending newsletter doc and returns the token.
 */
export async function createPendingSubscription(email: string) {
  const token = genToken();
  const docRef = await addDoc(collection(db, "newsletter"), {
    email,
    verified: false,
    token,
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, token };
}

/**
 * Verify a Newsletter token, set verified=true and return the email (or null).
 */
export async function verifySubscriptionToken(token: string) {
  const q = query(collection(db, "newsletter"), where("token", "==", token));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  // take first match
  const docSnap = snap.docs[0];
  const data = docSnap.data();
  if (data.verified === true) return data.email;
  await updateDoc(doc(db, "newsletter", docSnap.id), { verified: true, verifiedAt: serverTimestamp() });
  return data.email;
}

// --- End Newsletter

// --- Registro temporal + verificación ---
export async function registerAndSendVerification(email: string) {
  try {
    const randomPassword = Math.random().toString(36).slice(-10);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      randomPassword
    );

    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent to:", email);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      console.warn("User already registered:", email);
      return true; // No lanzar error si ya existe
    }
    console.error("Error during registration:", error.message);
    throw new Error(error.message);
  }
}


// --- Listener de verificados ---
export function listenForEmailVerification() {
  onAuthStateChanged(auth, async (user) => {
    if (user && user.email && user.emailVerified) {
      console.log("User verified:", user.email);
      try {
        await subscribeToNewsletter(user.email);
        console.log("Verified email saved:", user.email);
      } catch (err) {
        console.error("Error saving verified email:", err);
      }
    }
  });
}


// --- ✅ NUEVO: Crear perfil de usuario al loguearse ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      joinedAt: serverTimestamp(),
    });
    console.log("User profile created:", user.email);
  } else {
    console.log("User profile already exists:", user.email);
  }
}

// ✅ Actualiza XP, tareas o cualquier campo del perfil
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserProfile(uid: string, data: Record<string, any>) {
  if (!uid) {
    console.warn("updateUserProfile: missing uid");
    return;
  }

  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("User profile updated:", data);
  } catch (err) {
    console.error("Error updating user profile:", err);
  }
}

// --- Referral Codes ---
// Añade un código de referido para un usuario
export async function addReferralCode(uid: string, code: string) {
  if (!uid) return;
  try {
    const codeRef = doc(db, "users", uid, "referralCodes", code);
    await setDoc(codeRef, {
      code,
      status: "unused",
      createdAt: serverTimestamp(),
    });
    console.log("Referral code added:", code);
  } catch (err) {
    console.error("Error adding referral code:", err);
    throw err;
  }
}

// Actualiza el estado de un código de referido
export async function updateReferralCode(uid: string, code: string, status: "unused" | "pending" | "completed") {
  if (!uid) return;
  try {
    const codeRef = doc(db, "users", uid, "referralCodes", code);
    await setDoc(codeRef, { status }, { merge: true });
    console.log("Referral code updated:", code, status);
  } catch (err) {
    console.error("Error updating referral code:", err);
    throw err;
  }
}

// Sumar puntos/XP de forma persistente
export async function addUserXP(uid: string, points: number) {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  try {
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) return;
    const currentXP = snapshot.data()?.xp || 0;
    await updateUserProfile(uid, { xp: currentXP + points });
    console.log(`Added ${points} XP to user ${uid}`);
  } catch (err) {
    console.error("Error adding XP:", err);
    throw err;
  }
}
