import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
        auth, 
        createUserProfile, 
      } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

// Layouts
import DocsLayout from "./pages/docs/DocsLayout";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RightSidebar from "./components/RightSidebar";
import PrivateRoute from "./components/PrivateRoute";

// Public pages
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Airdrop from "./pages/Airdrop";
import Leaderboard from "./pages/Leaderboard";

// Docs pages
import Whitepaper from "./pages/docs/Whitepaper";
import Tokenomics from "./pages/docs/Tokenomics";
import Roadmap from "./pages/docs/Roadmap";
import General from "./pages/docs/airdrop/General";
import PointSystem from "./pages/docs/airdrop/PointSystem";
import Rewards from "./pages/docs/airdrop/Rewards";

// Private pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Quests from "./pages/Quests";
import QuestDetail from "./pages/QuestDetail";
import InviteFriends from "./pages/InviteFriends";
import Admin from "./pages/Admin";
import AdminQuests from "./pages/admin/AdminQuests";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNewsletter from "./pages/admin/AdminNewsletters";
import AdminUsers from "./pages/admin/AdminUsers";



export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) createUserProfile(user); 
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Router>
        <Navbar />
        {user && <RightSidebar />}

        <main className="flex-grow">
          <Routes>
            {/* 🌍 Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* 📘 Documentation routes */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route path="whitepaper" element={<Whitepaper />} />
              <Route path="tokenomics" element={<Tokenomics />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="airdrop/general" element={<General />} />
              <Route path="airdrop/pointsystem" element={<PointSystem />} />
              <Route path="airdrop/rewards" element={<Rewards />} />
            </Route>

            {/* 🔒 Private routes */}
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
              path="/quest/:id"
              element={
                <PrivateRoute>
                  <QuestDetail />
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
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/quests"
              element={
                <PrivateRoute>
                  <AdminQuests />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <PrivateRoute>
                  <AdminSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/newsletter"
              element={
                <PrivateRoute>
                  <AdminNewsletter />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute>
                  <AdminUsers />
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
