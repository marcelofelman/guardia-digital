// app/components/home/Hero.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Orbitron, Bruno_Ace, Bruno_Ace_SC } from 'next/font/google';


const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: "900"
});

// Lazy load WebGL effect
const WebGLEffect = dynamic(() => import('./WebGLEffect'), {
  ssr: false,
  loading: () => null
});

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  // Animación con clip-path reveal para el título
  const titleVariants = {
    hidden: {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Subtítulo con micro-delay
  const subtitleVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // CTA con micro-delay y animación de entrada
  const ctaVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* CSS Fallback Background con animación */}
      <motion.div
        className="absolute inset-0 z-0 bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* WebGL Smoke Effect */}
      <WebGLEffect />

      <motion.div
        className="hero-content relative z-20 text-center px-4 sm:px-6 lg:px-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto">
          {/* Título con clip-path reveal */}
          <motion.h1
            className={cn("text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg", orbitron.className)}
          // variants={titleVariants}
          >
            Guardia Digital
          </motion.h1>

          {/* Subtítulo con micro-delay */}
          <motion.p
            className="text-xl md:text-2xl mb-10 text-white/90 drop-shadow-md max-w-2xl mx-auto"
          // variants={subtitleVariants}
          >
            Protegiendo tu presencia digital con tecnología de vanguardia.
          </motion.p>

          {/* CTA con micro-delay y animación */}
          <motion.button
            className="cta-button bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            // variants={ctaVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar solicitud
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
