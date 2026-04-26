import React from "react";
import {X, Trash2, MessageCircle, ShoppingBag} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {useCart} from "@/context/CartContext";
import {Button} from "./ui/button";
import {generateWhatsAppUrl} from "@/utils/whatsapp";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({isOpen, onClose}) => {
  const {cart, removeFromCart, updateQuantity, totalPrice, totalItems} =
    useCart();

  const handleCheckout = () => {
    const url = generateWhatsAppUrl(cart, totalPrice);
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{x: "100%"}}
            animate={{x: 0}}
            exit={{x: "100%"}}
            transition={{type: "spring", damping: 25, stiffness: 200}}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white border-l-4 border-brand-red shadow-2xl flex flex-col">
            <div className="p-8 border-b-2 border-brand-peach flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black italic uppercase">
                  Keranjang
                </h2>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  {totalItems} ITEMS SELECTED
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 transition-colors">
                <X className="w-8 h-8 text-brand-red" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <ShoppingBag className="opacity-40 w-16 h-16 mb-4 text-brand-red" />
                  <p className="text-2xl font-black italic opacity-40">
                    MASIH KOSONG!
                  </p>
                  <Button onClick={onClose}>Tambahkan produk</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={`${item.product.id}`}
                    className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-brand-cream border-2 border-brand-peach shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black uppercase text-sm leading-tight text-brand-red">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-300 hover:text-brand-red p-1 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 bg-brand-cream font-black text-xs hover:bg-brand-peach transition-colors">
                            -
                          </button>
                          <span className="text-sm font-black w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 bg-brand-cream font-black text-xs hover:bg-brand-peach transition-colors">
                            +
                          </button>
                        </div>
                        <span className="font-black text-brand-orange">
                          Rp {(item.product.price * item.quantity) / 1000}k
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-neutral-50 border-t-4 border-brand-peach">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    Estimasi Total
                  </span>
                  <span className="text-4xl font-black text-brand-red">
                    Rp {totalPrice / 1000}k
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full py-6 text-base shadow-none gap-3"
                  onClick={handleCheckout}>
                  <MessageCircle className="w-6 h-6" />
                  Pesan via WhatsApp
                </Button>
                <p className="text-[9px] mt-4 text-center uppercase font-black text-neutral-400 tracking-tighter">
                  Text pesanan dirakit otomatis oleh Checkout Engine
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
