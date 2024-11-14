'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingSpinnerProps {
  isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1))
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div className="relative w-full h-full max-w-lg max-h-lg flex flex-col items-center justify-center">
            {/* Animated background shapes */}
            <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q25,30 50,50 T100,50"
                fill="none"
                stroke="rgba(var(--primary-rgb), 0.2)"
                strokeWidth="0.5"
                animate={{
                  d: [
                    "M0,50 Q25,30 50,50 T100,50",
                    "M0,50 Q25,70 50,50 T100,50",
                    "M0,50 Q25,30 50,50 T100,50",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,50 Q25,70 50,50 T100,50"
                fill="none"
                stroke="rgba(var(--secondary-rgb), 0.2)"
                strokeWidth="0.5"
                animate={{
                  d: [
                    "M0,50 Q25,70 50,50 T100,50",
                    "M0,50 Q25,30 50,50 T100,50",
                    "M0,50 Q25,70 50,50 T100,50",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>

            {/* Glowing orb */}
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Spinning logo */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-32 h-32 sm:w-32 sm:h-32 md:w-36 md:h-36"
            >
              <Image
                src="/hospital/hospitallogo.png"
                alt="Loading"
                layout="fill"
                objectFit="contain"
                className="rounded-full shadow-lg"
              />
            </motion.div>

          
    
            {/* Progress bar */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-4 bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-primary via-primary to-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Floating particles */}
            {Array.from({ length: 30 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingSpinner