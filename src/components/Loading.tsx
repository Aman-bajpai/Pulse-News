import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'spinner' | 'pulse' | 'dots';
}

export const Loading = ({
  size = 'md',
  text = 'Loading...',
  variant = 'spinner'
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`bg-primary-600 rounded-full ${sizeClasses[size]}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        {text && (
          <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-600 rounded-full"
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
        {text && (
          <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className={`border-4 border-gray-200 border-t-primary-600 rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {text && (
        <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
      )}
    </div>
  );
};
