import { type ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg)] text-[var(--text)]">
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}
