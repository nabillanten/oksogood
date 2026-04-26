"use client";

import React, {useState, useMemo} from "react";
import {motion, AnimatePresence} from "motion/react";
import {Utensils, Star, Coffee, Heart, LucideIcon} from "lucide-react";
import {CartProvider} from "@/context/CartContext";
import {Navbar} from "@/components/Navbar";
import {ProductCard} from "@/components/ProductCard";
import {ProductModal} from "@/components/ProductModal";
import {CartDrawer} from "@/components/CartDrawer";
import {FloatingWAButton} from "@/components/FloatinWAButton";
import {PRODUCTS} from "@/constants";
import {Category, Product} from "@/types";
import {Button} from "@/components/ui/button";

function AppContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const categories: Category[] = [
    "Semua",
    "Nasi Bento",
    "Mix Platter",
    "Mojito",
    "Combo",
  ];

  interface FloatingIconProps {
    icon: LucideIcon;
    className?: string;
    delay?: number;
  }

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Semua") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const FloatingIcon = ({
    icon: Icon,
    className,
    delay = 0,
  }: FloatingIconProps) => (
    <motion.div
      initial={{y: 0}}
      animate={{y: [-15, 15, -15]}}
      transition={{duration: 4, repeat: Infinity, ease: "easeInOut", delay}}
      className={`absolute z-10 ${className}`}>
      <Icon className="w-12 h-12 text-brand-orange/80 rotate-12 drop-shadow-[2px_2px_0px_#000]" />
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center bg-pattern overflow-hidden pt-12">
        {/* Floating Decoration Icons */}
        <FloatingIcon icon={Utensils} className="top-40 left-[15%]" delay={0} />
        <FloatingIcon
          icon={Coffee}
          className="bottom-32 left-[20%]"
          delay={1}
        />
        <FloatingIcon icon={Star} className="top-40 right-[20%]" delay={0.5} />
        <FloatingIcon
          icon={Heart}
          className="bottom-32 right-[15%]"
          delay={1.5}
        />

        <div className="container mx-auto px-4 z-20 text-center flex flex-col items-center">
          <motion.div
            initial={{scale: 0.8, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{type: "spring", stiffness: 100}}>
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none text-sticker capitalize mb-4">
              OkSoGood
            </h1>
            <div className="text-sticker-sub -rotate-1 scale-110 md:scale-125">
              <p className="text-xs md:text-base">
                Namanya aja ok, apalagi rasanya!
              </p>
            </div>
            <div className="mt-6 md:mt-8 lg:mt-16 flex gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-brand-orange border-black shadow-[6px_6px_0px_#000] hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({behavior: "smooth"})
                }>
                Pesan Sekarang
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Ticker (Marquee) */}
        <div className="absolute bottom-0 left-0 w-full bg-black py-4 overflow-hidden border-t-2 border-black">
          <div className="animate-marquee whitespace-nowrap flex font-black uppercase text-2xl md:text-5xl text-white italic tracking-tighter items-center">
            {Array(10)
              .fill("")
              .map((_, i) => (
                <React.Fragment key={i}>
                  <span>Golden Katsu Bento</span>
                  <span className="mx-8 text-brand-orange">/</span>
                  <span>Classic Teriyaki Bento</span>
                  <span className="mx-8 text-brand-orange">/</span>
                  <span>Solo Mix Platter</span>
                  <span className="mx-8 text-brand-orange">/</span>
                  <span>Signature Mojito</span>
                  <span className="mx-8 text-brand-orange">/</span>
                </React.Fragment>
              ))}
          </div>
        </div>
      </section>

      {/* Menu Catalog Section */}
      <section
        id="menu"
        className="py-24 bg-brand-cream border-t-4 border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black text-brand-red mb-6 italic underline decoration-brand-orange decoration-4 underline-offset-8">
              MAU MAKAN APA HARI INI?
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 font-black uppercase text-xs tracking-widest transition-all border-4 ${
                    activeCategory === cat
                      ? "bg-brand-red border-black text-white shadow-[4px_4px_0px_#000] -translate-y-1"
                      : "bg-white border-brand-peach text-neutral-400 hover:border-black hover:text-black"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setSelectedProduct}
                  onShowToast={showToast}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 font-sans border-t-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-5xl font-black italic mb-6 capitalize">
            OkSoGood
          </h3>
          <p className="text-neutral-400 max-w-sm mx-auto mb-12">
            Namanya aja ok, apalagi rasanya.
            <br /> Pre-order sekarang untuk kebahagiaan besok!
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            {["Instagram", "TikTok", "WhatsApp"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-black uppercase text-xs border-2 border-white px-6 py-2 hover:bg-white hover:text-black transition-all">
                {social}
              </a>
            ))}
          </div>
          <p className="mt-20 text-[10px] uppercase font-black tracking-widest text-neutral-500">
            &copy; 2026 OkSoGood. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* UI Elements */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onShowToast={showToast}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FloatingWAButton />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{opacity: 0, y: -50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, scale: 0.9, y: -50}}
            className="fixed top-10 inset-x-0 mx-auto z-60 w-fit">
            <div className="bg-white text-brand-red px-8 py-3 border-4 border-black shadow-[4px_4px_0px_#000] flex items-center gap-3">
              <span className="font-black">✅</span>
              <span className="font-black text-xs uppercase tracking-tight">
                {toast}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
