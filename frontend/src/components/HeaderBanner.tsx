"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeaderBannerProps {
  title: string
  subtitle: string
  bgImage?: string
  ctaLink?: string
  badge?: string
}

const HeaderBanner = ({
  title,
  subtitle,
  bgImage,
  ctaLink = "#",
  badge,
}: HeaderBannerProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset
      setParallaxOffset(offset * 0.5)
      setIsVisible(offset < 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  useEffect(() => {
    if (bgImage) {
      const img = new Image()
      img.src = bgImage
      img.onload = handleImageLoad
    }
  }, [bgImage, handleImageLoad])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative w-full h-[30vh] sm:h-[40vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {bgImage && imageLoaded ? (
            <motion.div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${bgImage})`,
                y: parallaxOffset,
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-x" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex flex-col items-center justify-center text-center p-4">
            {badge && (
              <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary-foreground">
                {badge}
              </Badge>
            )}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-center mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
            
          </div>
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8 text-white opacity-70" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HeaderBanner