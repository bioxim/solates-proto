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
  serverTimestamp,
} from "firebase/firestore";

// --- Configuración del proyecto Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyD8E9BpGcCvlM7nDlwIpUAka2XY8tHqpd4",
  authDomain: "solates.firebaseapp.com",
  projectId: "solates",
  storageBucket: "solates.firebasestorage.app",
  messagingSenderId: "1013713107813",
  appId: "1:1013713107813:web:0e89c9fac0f50396b13f8c",
  measurementId: "G-7DS4SMR49Z",
};

// --- Inicialización de Firebase ---
const app = initializeApp(firebaseConfig);

// --- Analytics ---
export const analytics = getAnalytics(app);

// --- Auth ---
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// --- Firestore ---
export const db = getFirestore(app);

// --- Guarda el email en Firestore ---
export async function subscribeToNewsletter(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) throw new Error("Invalid email format.");

  try {
    const docRef = await addDoc(collection(db, "newsletter"), {
      email,
      createdAt: serverTimestamp(),
    });
    console.log("Email saved in Firestore:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error adding email:", err);
    throw err;
  }
}

// --- Crea usuario temporal y envía verificación por correo ---
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
    console.error("Error during registration:", error.message);
    throw new Error(error.message);
  }
}

// --- Escucha usuarios verificados y los guarda en Firestore ---
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
