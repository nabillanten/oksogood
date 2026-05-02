import React from "react";
import {Plus, Eye} from "lucide-react";
import {Product} from "@/types";
import {Button} from "./ui/button";
import {useCart} from "@/context/CartContext";
import {motion} from "motion/react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onShowToast: (message: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onShowToast,
}) => {
  const {addToCart} = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    onShowToast(`${product.name} ditambahkan!`);
  };

  return (
    <motion.div
      layout
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, scale: 0.95}}
      whileHover={{y: -4}}
      className="group bg-white border-2 border-brand-peach p-4 flex flex-col group relative">
      <div className="relative aspect-4/4 overflow-hidden mb-4 bg-brand-tan/10">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-brand-red text-white text-[8px] uppercase font-black px-2 py-1 tracking-widest">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-black uppercase tracking-tight mb-1 text-brand-red leading-tight">
          {product.name}
        </h3>

        <p className="text-[10px] text-neutral-500 font-bold uppercase mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-brand-cream/50">
          <div>
            <p className="text-2xl font-black text-brand-orange">
              <span className="text-sm font-bold mr-0.5 uppercase">Rp</span>
              {product.price > 1000
                ? `${product.price / 1000}k`
                : product.price}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 border-brand-peach"
              onClick={() => onQuickView(product)}>
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="primary"
              size="icon"
              className="w-10 h-10"
              onClick={handleAddToCart}>
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      {product.id === "bento-2" && (
        <div className="absolute top-0 right-0 bg-brand-orange text-white px-2 py-1 text-[8px] font-black uppercase tracking-tighter -rotate-3 translate-x-2 -translate-y-2">
          Best Seller
        </div>
      )}
    </motion.div>
  );
};
