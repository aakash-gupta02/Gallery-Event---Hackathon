import React from "react";
import { FiHome, FiFrown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-body relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#90ffffbe] opacity-40 blur-2xl"
            style={{
              width: `${120 + Math.random() * 180}px`,
              height: `${120 + Math.random() * 180}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animation: `float${i} 18s ease-in-out infinite alternate`,
              zIndex: 0,
            }}
          />
        ))}
        <style>
          {`
                        ${[...Array(10)]
                          .map(
                            (_, i) => `
                                @keyframes float${i} {
                                    0% { transform: translateY(0px);}
                                    100% { transform: translateY(${
                                      Math.random() * 60 + 40
                                    }px);}
                                }
                            `
                          )
                          .join("")}
                    `}
        </style>
      </div>
      {/* Animated 404 Text */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-9xl font-bold text-primary relative">
          4
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            0
          </motion.span>
          4
        </h1>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mb-8"
      >
        <div className="flex justify-center text-4xl text-text-muted mb-4">
          <FiFrown />
        </div>
        <h2 className="text-2xl font-semibold text-text-heading mb-2">
          Page Not Found
        </h2>
        <p className="text-text-body">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      {/* Home Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="flex items-center px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverted rounded-lg shadow-card transition-all"
      >
        <FiHome className="mr-2" />
        Return Home
      </motion.button>
    </div>
  );
};

export default NotFoundPage;
