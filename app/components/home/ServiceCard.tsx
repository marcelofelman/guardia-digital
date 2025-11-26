// app/components/home/ServiceCard.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { Button } from '../ui/button';

interface ServiceCardProps {
  title: string;
  price: string;
  asunto: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, asunto }) => {
  const handleRequest = () => {
    // Logic to open modal or navigate to form with pre-selected subject
    console.log(`Initiating request for: ${title} with subject: ${asunto}`);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card
        title={title}
        price={price}
        actions={[
          <Button key="request-btn" onClick={handleRequest} className="w-full">
            Iniciar solicitud
          </Button>,
        ]}
      >
        {/* Additional content for the service card can go here */}
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
