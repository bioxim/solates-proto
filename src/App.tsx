import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// Documents
import Docs from "./pages/Docs";
import Airdrop from "./pages/Airdrop";
import Leaderboard from "./pages/Leaderboard";
import DocsLayout from "./pages/docs/DocsLayout";
import General from "./pages/docs/airdrop/General";
import PointSystem from "./pages/docs/airdrop/PointSystem";
import Rewards from "./pages/docs/airdrop/Rewards";
// Users w/login
import PrivateRoute from "./components/PrivateRoute";
import RightSidebar from "./components/RightSidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Quests from "./pages/Quests";
import InviteFriends from "./pages/InviteFriends";


export default function App() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, setUser);
      return () => unsub();
    }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Router>
        <Navbar />
        {user && <RightSidebar />} {/* ✅ Ahora está dentro del Router */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/docs/airdrop" element={<DocsLayout />}>
              <Route path="general" element={<General />} />
              <Route path="pointsystem" element={<PointSystem />} />
              <Route path="rewards" element={<Rewards />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/quests"
              element={
                <PrivateRoute>
                  <Quests />
                </PrivateRoute>
              }
            />
            <Route
              path="/invite-friends"
              element={
                <PrivateRoute>
                  <InviteFriends />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>

  );
}
