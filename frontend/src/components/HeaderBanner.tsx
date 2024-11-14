"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Lock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface HeaderBannerProps {
  title: string
  subtitle: string
  bgImage?: string
  ctaLink?: string
  badge?: string
}

export default function HeaderBanner({
  title,
  subtitle,
  bgImage,
  ctaLink = "#",
  badge,
}: HeaderBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const y = useTransform(scrollY, [0, 200], [0, 100])

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

  const handleScrollDown = () => {
    if (bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight
      window.scrollTo({
        top: bannerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div
      ref={bannerRef}
      className="relative w-full h-[30vh] sm:h-[40vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh] overflow-hidden"
      style={{ opacity }}
    >
      {bgImage && imageLoaded ? (
        <motion.div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
            y,
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
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 mb-4"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className={cn(
            "text-lg sm:text-xl md:text-2xl text-center mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>       
      </div>
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={handleScrollDown}
      >
        <ChevronDown className="h-8 w-8 text-white opacity-70" />
      </motion.div>
    </motion.div>
  )
}