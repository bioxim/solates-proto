import { useState } from "react";
import emailjs from "@emailjs/browser";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "duplicate" | "confirmed">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // === Verificación de formato ===
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      const usersRef = collection(db, "newsletter_subscribers");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      // === Si ya existe el email ===
      if (!querySnapshot.empty) {
        const existing = querySnapshot.docs[0].data();
        if (existing.verified) {
          setStatus("duplicate");
          setMessage("⚠️ This email is already subscribed and verified.");
          return;
        } else {
          setMessage("📩 A verification email was already sent. Please check your inbox.");
          setStatus("sent");
          return;
        }
      }

      // === Crear token de verificación ===
      const verificationToken = crypto.randomUUID();
      const verificationLink = `${import.meta.env.VITE_APP_BASE_URL}/verify?token=${verificationToken}`;

      // === Enviar mail de verificación con EmailJS ===
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VERIFY!,
        {
          to_email: email,
          verification_link: verificationLink,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // === Registrar temporalmente en Firestore ===
      await addDoc(usersRef, {
        email,
        verified: false,
        token: verificationToken,
        createdAt: serverTimestamp(),
      });

      setStatus("sent");
      setMessage("✅ Verification email sent! Please confirm via the link in your inbox.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="text-center bg-slate-900/40 p-6 rounded-2xl border border-slate-700 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-violet-400">Join our newsletter</h2>
      <p className="text-sm text-slate-400 mb-4">
        Get the latest Solates updates, learning quests, and $OLA insights.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-xl text-slate-200 bg-slate-800 border border-slate-700 focus:border-violet-500 focus:outline-none"
          disabled={status === "sending"}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Subscribe"}
        </button>
      </form>

      {message && <p className="text-sm text-slate-300 mt-4">{message}</p>}
    </div>
  );
}
