import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BottomWave } from '../components/BottomWave';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onStart();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div
      onClick={onStart}
      className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden cursor-pointer select-none"
    >
      <div className="pt-20" />

      {/* Center Hero matching Screenshot 1 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative flex flex-col items-center"
        >
          {/* Logo with 3D Float */}
          <motion.div
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut'
            }}
          >
            <img
              src="https://i.postimg.cc/gkHbxBYK/logoapp.png"
              alt="ALIADAS CDC"
              className="w-64 max-w-[280px] object-contain drop-shadow-sm"
            />
          </motion.div>

          {/* Slogan exactly as screenshot */}
          <div className="mt-8 space-y-0.5 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-extrabold text-[#4E0A7D] tracking-tight font-heading"
            >
              Tu suerte,
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-2xl font-extrabold text-[#4E0A7D] tracking-tight font-heading"
            >
              nuestra pasión
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave matching Screenshot 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="w-full relative z-0"
      >
        <BottomWave />
      </motion.div>
    </div>
  );
};
