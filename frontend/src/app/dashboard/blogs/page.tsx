'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { AlertCircle, Calendar, Edit3, Eye, FileText, Plus, Tag, Trash2, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

// Placeholder data
const initialPosts = [
  { id: 1, title: "New Cancer Treatment Breakthrough", content: "Lorem ipsum dolor sit amet...", author: "Dr. Jane Smith", category: "Oncology", tags: ["cancer", "research"], publishDate: "2023-07-15", status: "published" },
  { id: 2, title: "COVID-19 Vaccination Update", content: "Consectetur adipiscing elit...", author: "Dr. John Doe", category: "Infectious Diseases", tags: ["covid-19", "vaccination"], publishDate: "2023-07-10", status: "draft" },
  { id: 3, title: "Mental Health in the Pandemic Era", content: "Sed do eiusmod tempor incididunt...", author: "Dr. Emily Brown", category: "Psychiatry", tags: ["mental health", "pandemic"], publishDate: "2023-07-05", status: "published" },
]

const categories = ["Oncology", "Infectious Diseases", "Psychiatry", "Cardiology", "Neurology", "Pediatrics"]

export default function BlogManagement() {
  const [posts, setPosts] = useState(initialPosts)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleCreatePost = (newPost) => {
    setPosts([...posts, { ...newPost, id: posts.length + 1 }])
    setIsCreateDialogOpen(false)
    toast({
      title: "Post Created",
      description: "Your new blog post has been created successfully.",
    })
  }

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post))
    setIsEditDialogOpen(false)
    toast({
      title: "Post Updated",
      description: "Your blog post has been updated successfully.",
    })
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
    toast({
      title: "Post Deleted",
      description: "Your blog post has been deleted successfully.",
      variant: "destructive",
    })
  }

  const PostDialog = ({ isOpen, onClose, post, mode }) => {
    const [formData, setFormData] = useState(post || {
      title: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      publishDate: format(new Date(), 'yyyy-MM-dd'),
      status: "draft"
    })

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if (mode === 'create') {
        handleCreatePost(formData)
      } else if (mode === 'edit') {
        handleUpdatePost(formData)
      }
      onClose()
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{mode === 'view' ? 'View Post' : mode === 'edit' ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            <DialogDescription>
              {mode === 'view' ? 'View the details of this blog post.' : mode === 'edit' ? 'Make changes to your blog post here.' : 'Fill in the details for your new blog post.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === 'view'}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === 'view'}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === 'view'}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === 'view'}
                  placeholder="Comma-separated tags"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishDate" className="text-right">Publish Date</Label>
                <Input
                  id="publishDate"
                  name="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === 'view'}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              {mode !== 'view' && (
                <Button type="submit">{mode === 'edit' ? 'Update Post' : 'Create Post'}</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return ( 
  <main className="flex-1 overflow-hidden flex flex-col">
    

    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
    <div className="container mx-auto p-6 " >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-2" >
                
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Post</p>
                      <p className="text-3xl font-bold mt-2">54</p>
                      <Progress value={75} className="mt-2" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Category</p>
                      <p className="text-3xl font-bold mt-2">
                        5
                      </p>
                      <Progress value={50} className="mt-2" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Top 10</p>
                      <p className="text-3xl font-bold mt-2">
                    4
                      </p>
                      <Progress value={25} className="mt-2" />
                    </div>
                  </div>
                  <Button onClick={() => setIsCreateDialogOpen(true)}
                   className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    Make a Post
                  </Button>
                </CardContent>
              </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage and edit your hospital blog posts</CardDescription>
          </CardHeader>
          <CardContent>
         
            <div className="space-y-2 ">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author}</span>
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {post.publishDate}</span>
                      <span className="flex items-center"><Tag className="w-4 h-4 mr-1" /> {post.category}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => { setSelectedPost(post); setIsViewDialogOpen(true); }}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setSelectedPost(post); setIsEditDialogOpen(true); }}>
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          
        </Card>
      </motion.div>

      <PostDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        post={selectedPost}
        mode="view"
      />

      <PostDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        post={selectedPost}
        mode="edit"
      />

      <PostDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        post={null}
        mode="create"
      />
      </div>
    </div>
    </main>
  )
}