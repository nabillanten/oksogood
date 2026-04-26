import React from "react";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/context/CartContext";
import {Button} from "./ui/button";
import Image from "next/image";
import logo from "@/public/images/logo.png";

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({onOpenCart}) => {
  const {totalItems} = useCart();

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/90 backdrop-blur-md border-2 border-black h-16 sm:h-20 flex items-center rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300">
      <div className="px-4 sm:px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}>
          <Image
            src={logo}
            alt="logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>

        {/* Promo Ticker Pengganti Menu */}
        <div className="hidden sm:flex flex-1 mx-6 overflow-hidden bg-brand-orange border-2 border-black py-1.5 px-2 rounded-md shadow-[3px_3px_0px_#000]">
          <div className="animate-marquee whitespace-nowrap text-[11px] font-black uppercase tracking-widest text-white">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <React.Fragment key={i}>
                  <span>PROMO HARI INI: SINGLE CHILL COMBO CUMA 20K!</span>
                  <span className="mx-4 text-brand-orange">🔥</span>
                  <span> PESAN SEKARANG</span>
                  <span className="mx-4 text-brand-orange">🔥</span>
                  <span>SEBELUM KEHABISAN</span>
                  <span className="mx-4 text-brand-orange">🔥</span>
                  <span>BUKA SETIAP HARI 10.00 - 22.00</span>
                  <span className="mx-4 text-brand-orange">🔥</span>
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-2 border-2 border-black shadow-[3px_3px_0px_#000] text-black hover:bg-neutral-50 font-bold"
            onClick={() => handleScroll("menu")}>
            Lihat Produk
          </Button>

          <button
            onClick={onOpenCart}
            className="relative border-2 border-black p-2 bg-white hover:bg-neutral-50 transition-colors rounded-md">
            <ShoppingCart className="w-5 h-5 text-brand-red" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] w-5 h-5 flex items-center justify-center font-black border-2 border-black rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
