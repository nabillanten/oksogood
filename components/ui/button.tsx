import React from "react";
import {motion, HTMLMotionProps} from "motion/react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none border-2";

  const variants = {
    primary:
      "bg-brand-red border-brand-red text-white hover:bg-brand-orange hover:border-brand-orange",
    secondary:
      "bg-brand-orange border-brand-orange text-white hover:bg-brand-red hover:border-brand-red",
    outline:
      "border-brand-red text-brand-red hover:bg-brand-peach hover:text-brand-red",
    ghost: "border-transparent hover:bg-brand-peach/20 text-brand-red",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-10 py-5 text-sm",
    icon: "p-2",
  };

  return (
    <motion.button
      whileHover={{y: -2}}
      whileTap={{scale: 0.98}}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}>
      {children}
    </motion.button>
  );
};
