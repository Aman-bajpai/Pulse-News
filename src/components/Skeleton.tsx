import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: SkeletonProps) => {
  const baseClasses = 'bg-gray-200 animate-pulse';

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  const getSizeClasses = () => {
    const classes = [];

    if (width) {
      classes.push(typeof width === 'number' ? `w-${width}` : `w-[${width}]`);
    }

    if (height) {
      classes.push(typeof height === 'number' ? `h-${height}` : `h-[${height}]`);
    } else if (variant === 'text') {
      classes.push('h-4');
    } else if (variant === 'circular') {
      classes.push('aspect-square');
    }

    return classes.join(' ');
  };

  if (lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()}`}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.1
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  );
};
