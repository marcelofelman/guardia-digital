// app/components/ui/Card.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '../../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  price?: string;
  actions?: React.ReactNode[];
  variant?: 'default' | 'primary' | 'secondary'; // Example variants
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle, 
  price, 
  actions, 
  variant = 'default', 
  image, 
  imageWidth = 500, 
  imageHeight = 300, 
  children, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "bg-card text-card-foreground rounded-lg border border-white/20 shadow-md p-6 flex flex-col gap-4 h-full",
        className
      )} 
      {...props}
    >
      {image && (
        <div className="rounded-lg overflow-hidden">
          <Image src={image} alt={title || 'Card image'} width={imageWidth} height={imageHeight} className="w-full h-auto" />
        </div>
      )}
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      {price && <span className="text-lg font-bold text-primary">{price}</span>}
      {children}
      {actions && <div className="card-actions mt-auto pt-4 flex gap-2">{actions}</div>}
    </div>
  );
};

export default Card;
