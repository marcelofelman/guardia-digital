// app/components/home/ServicesGrid.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { SERVICES } from "../../../data/services";

const ServicesGrid: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="services-grid py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Servicios
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {SERVICES.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
