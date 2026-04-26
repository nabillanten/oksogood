"use client";

import React, {useState} from "react";
import {X, MessageCircle} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {Product} from "@/types";
import {Button} from "./ui/button";
import {useCart} from "@/context/CartContext";
import {generateSingleProductWhatsAppUrl} from "@/utils/whatsapp";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onShowToast,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);

  const {addToCart} = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onShowToast(`✅ ${quantity}x ${product.name} ditambahkan ke keranjang!`);
    onClose();
  };

  const handleDirectWA = () => {
    const url = generateSingleProductWhatsAppUrl(product.name, quantity);
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          layoutId={`product-${product.id}`}
          initial={{opacity: 0, scale: 0.9, y: 20}}
          animate={{opacity: 1, scale: 1, y: 0}}
          exit={{opacity: 0, scale: 0.9, y: 20}}
          className="relative bg-white w-full max-w-5xl border-4 border-brand-red overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-brand-red p-2 transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="md:w-1/2 relative bg-brand-tan/10">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover min-h-75 md:min-h-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="mb-4 md:mb-8">
              <p className="text-brand-orange uppercase text-xs font-black tracking-widest mb-4">
                {product.category}
              </p>
              <h2 className="text-2xl md:text-5xl font-black text-brand-red italic uppercase mb-2 md:mb-6 leading-none">
                {product.name}
              </h2>
              <p className="text-neutral-500 font-bold uppercase text-xs leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="mb-4 md:mb-12">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 md:mb-4 italic">
                Jumlah Pesanan
              </p>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-1 bg-brand-cream border-2 border-brand-red p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className=" w-10 md:h-10 hover:bg-brand-peach transition-colors font-black">
                    -
                  </button>
                  <span className="text-lg font-black w-4 md:w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className=" w-10 md:h-10 hover:bg-brand-peach transition-colors font-black">
                    +
                  </button>
                </div>
                <div>
                  <p className="text-2xl md:text-4xl font-black text-brand-orange italic">
                    <span className="text-base font-bold mr-1 uppercase">
                      Rp
                    </span>
                    {(product.price * quantity) / 1000}k
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2 md:gap-4">
              <Button
                variant="primary"
                size="sm"
                className="w-full md:py-6 text-base"
                onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full md:py-6 text-base gap-3 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                onClick={handleDirectWA}>
                <MessageCircle className="w-6 h-6" /> Order via WA
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
