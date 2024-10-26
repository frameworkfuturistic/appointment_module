'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full space-y-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
        >
          <AlertCircle className="mx-auto h-24 w-24 text-red-500" />
        </motion.div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}