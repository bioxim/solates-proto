import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)]">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard 🚀</h1>
      <p className="mb-6">This is the starting point of Solates app.</p>
      <button
        onClick={logout}
        className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:opacity-90"
      >
        Logout
      </button>
    </div>
  );
}
