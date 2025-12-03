// src/pages/Home.tsx
import { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import SoonBlocks from "../components/home/SoonBlocks";
import Newsletter from "../components/newsletter/Newsletter";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="mt-20 flex flex-col items-center px-4">
      <HeroSection onOpenLoginModal={() => setShowLogin(true)} />
      <FeaturesSection />
      <SoonBlocks />

      <div className="my-16 w-full flex justify-center">
        <Newsletter />
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
