import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const usersRef = collection(db, "newsletter_subscribers");
        const q = query(usersRef, where("token", "==", token));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setStatus("error");
          return;
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        await updateDoc(userDoc.ref, {
          verified: true,
          verifiedAt: new Date(),
        });

        // Enviar mail de confirmación
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONFIRMED!,
          { to_email: userData.email },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center text-white bg-slate-900">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-violet-400">✅ Email verified successfully!</h2>
          <p>You’ll now receive Solates updates directly to your inbox.</p>
        </div>
      )}
      {status === "error" && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-red-400">❌ Verification failed</h2>
          <p>Invalid or expired link. Please subscribe again.</p>
        </div>
      )}
    </div>
  );
}
