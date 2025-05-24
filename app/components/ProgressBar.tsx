import React from 'react';
import { motion } from 'framer-motion';

type ProgressBarProps = {
  percentage: number;
  isCompleted?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, isCompleted = false }) => {
  const gradient = isCompleted
    ? 'linear-gradient(77deg, #00c853 30%, #007f3f 99%)'
    : 'linear-gradient(77deg, #ff6000 1%, #ff2e4d 52%, #ff2e56 30%, #ff2f84 85%, #ff2f96 99%)';

  return (
    <div className="relative w-full h-2 rounded-lg overflow-hidden bg-gray-200">
      <motion.div
        className="h-full rounded"
        style={{
          background: gradient,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
    </div>
  );
};

export default ProgressBar;