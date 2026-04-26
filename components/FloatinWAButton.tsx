import React from "react";
import {MessageCircle} from "lucide-react";
import {motion} from "motion/react";
import {WHATSAPP_NUMBER} from "@/constants";

export const FloatingWAButton: React.FC = () => {
  const handleWAUrl = () => {
    const message =
      "Halo OkSoGood! Saya ingin tanya-tanya tentang menu Pre-Order hari ini.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      <motion.button
        initial={{scale: 0, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={handleWAUrl}
        className="bg-brand-red text-white w-16 h-16 flex items-center justify-center shadow-xl border-4 border-brand-cream cursor-pointer">
        <MessageCircle className="w-8 h-8" />
      </motion.button>
      <div className="absolute -top-4 -right-4 bg-brand-orange text-white text-[8px] px-2 py-1 font-black rounded-full animate-bounce shadow uppercase tracking-widest">
        ASK ME
      </div>
    </div>
  );
};
