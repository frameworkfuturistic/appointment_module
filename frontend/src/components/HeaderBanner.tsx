// HeaderBanner.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderBannerProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({
  title,
  subtitle,
  bgImage,
}) => {
  return (
    <div
      className="relative w-full h-[12vh] md:h-[20vh] lg:h-[30vh] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
        <motion.h1
          className="text-3xl sm:text-xl md:text-2xl lg:text-4xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <p className="text-lg sm:text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed my-4 text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeaderBanner;
