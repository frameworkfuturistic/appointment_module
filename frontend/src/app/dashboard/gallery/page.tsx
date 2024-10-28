'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axiosInstance from "@/lib/axiosInstance"
import { useDropzone } from 'react-dropzone'
import { log } from "console"

interface Image {
  _id: string
  title: string
  description: string
  imageUrl: string
  createdBy: string
  createdAt: string
  updatedAt: string
  slug: string
}

export default function GalleryDashboard() {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Image; direction: 'asc' | 'desc' } | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Image>()

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/gallery');
      
      // Transform the image URLs to the desired format
      const formattedImages = response.data.images.map((image) => ({
        ...image,
        imageUrl: `http://localhost:5555/gallery/${image.imageUrl.replace(/uploads\\/g, '').replace(/\\/g, '/')}` // Remove 'uploads\\' and replace backslashes
      }));
  
      setImages(formattedImages);
      console.log("Formatted Images:", formattedImages);
    } catch (err) {
      setError('Failed to fetch images');
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };
  

  

  const onSubmit = async (data: Image) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('createdBy', data.createdBy)
    if (imageFile) {
      formData.append('image', imageFile) // Append the image file
    }
    setLoading(true)
    try {
      if (editingImage) {
        await axiosInstance.put(`/gallery/${editingImage._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setSuccessMessage('Image updated successfully')
      } else {
        await axiosInstance.post('/gallery', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setSuccessMessage('Image added successfully')
      }
      fetchImages()
      setIsDialogOpen(false)
      reset()
      setImageFile(null) // Reset image file
    } catch (err) {
      setError('Failed to save image')
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setLoading(true)
      try {
        await axiosInstance.delete(`/gallery/${id}`)
        setSuccessMessage('Image deleted successfully')
        fetchImages()
      } catch (err) {
        setError('Failed to delete image')
      } finally {
        setLoading(false)
      }
    }
  }

  const openDialog = (image?: Image) => {
    if (image) {
      setEditingImage(image)
      reset(image)
    } else {
      setEditingImage(null)
      reset()
    }
    setIsDialogOpen(true)
  }

  const handleSort = (key: keyof Image) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const filteredImages = images
    .filter(image => 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0
      const { key, direction } = sortConfig
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })

  const onDrop = (acceptedFiles: File[]) => {
    // Only allow one file
    setImageFile(acceptedFiles[0])
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <div className="bg-background rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => openDialog()}
                size="sm"
                className="ml-auto"
              >
                <Plus className="mr-2 h-4 w-4" /> New Image
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert
                variant="default"
                className="mb-4 bg-green-50 text-green-800 border-green-300"
              >
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <AnimatePresence>
                  {filteredImages.map((image) => (
                    <motion.div
                      key={image._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                          />
                          <p>{image.imageUrl}</p>
                          <h3 className="text-lg font-semibold text-primary mb-2">{image.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{image.description}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground">
                              Added by: {image.createdBy}
                            </p>
                            <div className="flex space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openDialog(image)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit image</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deleteImage(image._id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete image</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? "Edit Image" : "Add New Image"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <Input
                    id="title"
                    className="col-span-3"
                    {...register("title", { required: "Title is required" })}
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500  text-sm ml-[8.5rem]">
                    {errors.title.message}
                  </p>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    {...register("description", { required: "Description is required" })}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm ml-[8.5rem]">
                    {errors.description.message}
                  </p>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-right">
                    Image
                  </label>
                  <div className="col-span-3">
                    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 rounded-md">
                      <input {...getInputProps()} />
                      <p className="text-center text-gray-500">
                        {imageFile ? imageFile.name : "Drag 'n' drop some files here, or click to select files"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="createdBy" className="text-right">
                    Created By
                  </label>
                  <Input
                    id="createdBy"
                    className="col-span-3"
                    {...register("createdBy", { required: "Creator name is required" })}
                  />
                </div>
                {errors.createdBy && (
                  <p className="text-red-500 text-sm ml-[8.5rem]">
                    {errors.createdBy.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
