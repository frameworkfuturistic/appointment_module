'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import axiosInstance from '@/lib/axiosInstance'
import HeaderBanner from '@/components/HeaderBanner'

interface Image {
  id: string
  imageUrl: string
  title: string
  description: string
}

interface PaginationData {
  images: Image[]
  total: number
  page: number
  pages: number
}



const HospitalGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchImages = useCallback(async (page: number) => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/gallery', {
        params: { page, limit: 12 },
      })
      const data = response.data

      // Transform the image URLs to the desired format
      const formattedImages = data.images.map((image: Image) => ({
        ...image,
        imageUrl: `https://test.sjhrc.in/hospital-api/gallery/${image.imageUrl.replace(/^uploads[\\/]/, '').replace(/\\/g, '/')}`
      }))

      setImages(formattedImages)
      setPaginationData({
        images: formattedImages,
        total: data.total,
        page: data.page,
        pages: data.pages,
      })
    } catch (err) {
      setError('Failed to fetch images')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages(currentPage)
  }, [currentPage, fetchImages])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (image: Image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const ImageCard: React.FC<{ image: Image }> = ({ image }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: '200px 0px',
    })

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
        onClick={() => openModal(image)}
      >
        {inView && (
          <Image
            src={image.imageUrl}
            alt={image.title}
            width={500}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-xl font-bold text-white">{image.title}</h4>
            {image.description && (
              <p className="text-white text-sm">{image.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const memoizedImages = useMemo(() => images, [images])

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1])
    } else if (direction === 'next' && currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white ">
         <HeaderBanner
        title="Gallery"
        subtitle=""
        bgImage="/images/hospital-banner.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {memoizedImages.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {paginationData && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(paginationData.pages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === paginationData.pages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <Dialog open={!!selectedImage} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
              <DialogDescription>{selectedImage?.description}</DialogDescription>
            </DialogHeader>
            {selectedImage && (
              <div className="mt-4 relative">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button onClick={closeModal} className="mt-4">Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default HospitalGallery