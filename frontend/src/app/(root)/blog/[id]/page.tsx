'use client'

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Toast, ToastProvider } from "@/components/ui/toast"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Calendar, Clock, User, Share2, Bookmark, ThumbsUp, ThumbsDown, ArrowRight, ZoomIn } from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"

interface BlogPost {
  _id: string
  title: string
  content: string
  author: string
  category: string
  tags: string[]
  image: string | null
  readTime: number
  publishDate: string
  likes: number
  dislikes: number
  slug: string
}

const formatImageUrl = (imageUrl: string | null): string => {
  if (!imageUrl) return "/images/default-blog-image.jpg"
  return `http://localhost:5555/blogs/${imageUrl
    .toString()
    .replace(/^uploads[\\/]/, "")
    .replace(/\\/g, "/")}`
}

const fetchBlogPost = async (id: string): Promise<BlogPost> => {
  const response = await axiosInstance.get(`/blogs/${id}`)
  return {
    ...response.data,
    image: formatImageUrl(response.data.image)
  }
}

const fetchRelatedPosts = async (category: string, currentId: string): Promise<BlogPost[]> => {
  const response = await axiosInstance.get("/blogs", {
    params: { category, limit: 9 },
  })
  return response.data.blogs
    .filter((blog: BlogPost) => blog._id !== currentId)
    .map((blog: BlogPost) => ({
      ...blog,
      image: formatImageUrl(blog.image)
    }))
}

const queryClient = new QueryClient()

export default function EnhancedBlogDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BlogContent />
      </ToastProvider>
    </QueryClientProvider>
  )
}

function BlogContent() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [toastMessage, setToastMessage] = useState("")
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const { data: blog, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogPost(id),
  })

  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: ["relatedPosts", blog?.category, id],
    queryFn: () => fetchRelatedPosts(blog?.category || "", id),
    enabled: !!blog,
  })

  const likeMutation = useMutation({
    mutationFn: (blogId: string) => axiosInstance.post(`/blogs/${blogId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id])
      setToastMessage("Blog post liked!")
    },
  })

  const dislikeMutation = useMutation({
    mutationFn: (blogId: string) => axiosInstance.post(`/blogs/${blogId}/dislike`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id])
      setToastMessage("Blog post disliked!")
    },
  })

  const handleLike = () => likeMutation.mutate(id)
  const handleDislike = () => dislikeMutation.mutate(id)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setToastMessage("Link copied to clipboard!")
  }

  if (isLoading) return <BlogSkeleton />
  if (isError) return <div className="text-center py-12">Error loading blog post</div>
  if (!blog) return <div className="text-center py-12">Blog post not found</div>

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <TracingBeam className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full antialiased relative"
        >
          <div className="mb-12 lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold font-serif mb-4 text-gray-800">{blog.title}</h1>
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
                  <User className="mr-2 h-4 w-4" />
                  <span className="mr-4">{blog.author}</span>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="mr-4">{format(new Date(blog.publishDate), "MMM d, yyyy")}</span>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{blog.readTime} min read</span>
                </div>

                <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={800}
                        height={500}
                        className="rounded-lg mb-8 object-cover w-full "
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="text-white h-12 w-12" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>

                <div className="text-gray-700 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />

                <div className="flex flex-wrap items-center space-x-4 mb-8">
                  <Button variant="outline" className="flex items-center" onClick={handleLike}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> {blog.likes} Likes
                  </Button>
                  <Button variant="outline" className="flex items-center" onClick={handleDislike}>
                    <ThumbsDown className="mr-2 h-4 w-4" /> {blog.dislikes} Dislikes
                  </Button>
                  <Button variant="outline" className="flex items-center" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Category</h2>
                <Badge className="mb-6">{blog.category}</Badge>

                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
                <form className="mb-6" onSubmit={(e) => { e.preventDefault(); setToastMessage("Subscribed to newsletter!"); }}>
                  <Input type="email" placeholder="Your email" className="mb-2" required />
                  <Button className="w-full" type="submit">Subscribe</Button>
                </form>

                <h2 className="text-xl font-semibold mb-4">Share</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setToastMessage("Shared on Facebook!")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setToastMessage("Shared on Twitter!")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setToastMessage("Shared on LinkedIn!")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </TracingBeam>

      {relatedPosts && relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.slice(0, 6).map((post) => (
              <RelatedBlogCard key={post._id} blog={post} />
            ))}
          </div>
          {relatedPosts.length > 6 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="text-blue-600 hover:text-blue-800" onClick={() => router.push(`/category/${blog.category}`)}>
                View More Related Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      <Toast
        variant="default"
        title={toastMessage}
        className={`fixed bottom-4 right-4 z-50 ${toastMessage ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </section>
  )
}

function RelatedBlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Image
          src={blog.image}
          alt={blog.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
          {blog.category}
        </Badge>
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{format(new Date(blog.publishDate), "MMM d, yyyy")}</span>
          <Button variant="link" asChild>
            <Link href={`/blog/${blog.slug}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BlogSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6  lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-3">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <Card className="p-6">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-6" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </Card>
        </div>
      </div>
    </div>
  )
}