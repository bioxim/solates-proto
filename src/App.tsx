import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Airdrop from "./pages/Airdrop";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}