"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from "../../../data/testimonials";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };


  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.9,
    }),
  };

  return (
    <section className="testimonials py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:bg-gradient-to-br dark:from-blue-900/70 dark:via-indigo-900/70 dark:to-purple-900/70 overflow-x-hidden">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        <div className="relative max-w-3xl mx-auto min-h-[300px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.3 },
              }}
              className="absolute inset-0 w-full p-8 bg-card rounded-lg shadow-lg text-center"
            >
              <p className="comment text-lg mb-4 text-card-foreground">&quot;{TESTIMONIALS[currentIndex].comment}&quot;</p>
              <p className="author font-semibold text-card-foreground">- {TESTIMONIALS[currentIndex].name}, {TESTIMONIALS[currentIndex].title}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground p-2 rounded-full shadow-md hover:bg-secondary/80 transition-colors z-20"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground p-2 rounded-full shadow-md hover:bg-secondary/80 transition-colors z-20"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;