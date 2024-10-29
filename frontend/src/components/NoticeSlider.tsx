// eslint-disable-next-line
// @ts-nocheck

'use client'

import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GraduationCap, Calendar, User, Link as LinkIcon, Paperclip, ChevronUp, ChevronDown, ChevronRight } from "lucide-react"
import Marquee from "react-fast-marquee"
import Title from "./Title"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import axiosInstance from "@/lib/axiosInstance"

interface Announcement {
  id: string
  title: string
  description: string
  type: "Notice" | "News" | "Event"
  priority: "Low" | "Medium" | "High"
  startDate: string
  status: "Draft" | "Published" | "Archived" | "Upcoming" | "Ongoing" | "Past"
  author: string
  ImpLink?: string
  thumbnailImage?: string
  attachment?: string
}

export function NoticeSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoPlayInterval = 5000
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const announcementListRef = useRef<HTMLDivElement>(null)

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/announcement")
      if (Array.isArray(response.data.announcements)) {
        setAnnouncements(response.data.announcements)
      } else {
        throw new Error("Invalid data format received from API")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching announcements")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnnouncements()
  }, [fetchAnnouncements])

  useEffect(() => {
    if (!isHovered && announcements.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
        )
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [announcements.length, isHovered])

  useEffect(() => {
    const listElement = announcementListRef.current
    if (listElement && !isHovered) {
      const scrollInterval = setInterval(() => {
        listElement.scrollTop += 1
        if (listElement.scrollTop >= listElement.scrollHeight - listElement.clientHeight) {
          listElement.scrollTop = 0
        }
      }, 50)

      return () => clearInterval(scrollInterval)
    }
  }, [isHovered])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const openAnnouncementDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
  }

  const closeAnnouncementDialog = () => {
    setSelectedAnnouncement(null)
  }

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: Announcement['status']) => {
    switch (status) {
      case 'Published': return 'bg-green-500'
      case 'Draft': return 'bg-gray-500'
      case 'Archived': return 'bg-red-500'
      case 'Upcoming': return 'bg-blue-500'
      case 'Ongoing': return 'bg-yellow-500'
      case 'Past': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Marquee className="bg-primary text-white font-mono font-semibold text-xl w-full h-12 rounded-t-xl mb-6">
        <GraduationCap className="mr-2" />
        {announcements.map((announcement, index) => (
          <span key={announcement.id} className="mr-8">
            {announcement.title}
            {index < announcements.length - 1 && " | "}
          </span>
        ))}
      </Marquee>

      <Title title="ANNOUNCEMENTS"  />

      <div className="grid justify-center mt-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl h-full">
          {/* Carousel Section */}
          <div className="relative flex items-center justify-center max-w-full">
            <Carousel
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-full"
            >
              <CarouselContent>
                {announcements.map((announcement, index) => (
                  <CarouselItem key={announcement.id}>
                    <Card className="shadow-xl overflow-hidden">
                      <CardContent className="p-0 relative">
                        {announcement.thumbnailImage ? (
                          <Image
                            src={announcement.thumbnailImage}
                            alt={announcement.title}
                            width={600}
                            height={400}
                            className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-[400px] bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-2xl font-semibold">No Image Available</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <h3 className="text-white text-xl font-bold mb-2">{announcement.title}</h3>
                          <p className="text-gray-200 text-sm">{announcement.description.substring(0, 100)}...</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Announcements List Section */}
          <div 
            className="relative overflow-hidden shadow-md rounded-lg border border-indigo-200 bg-white h-[400px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            <div 
              ref={announcementListRef}
              className="overflow-y-auto h-full p-4 space-y-2 scrollbar-hide"
            >
              {loading ? (
                <Skeleton count={3} height={80} className="mb-4" />
              ) : (
                announcements.map((announcement) => (
                  <Card key={announcement.id} className="shadow-sm bg-gradient-to-r from-teal-50 to-teal-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Calendar className="w-8 h-8 text-teal-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-semibold text-primary line-clamp-1">{announcement.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-2">{announcement.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500 flex items-center">
                              <User className="w-3 h-3 mr-1" /> {announcement.author}
                            </span>
                            <div className="flex space-x-1">
                              <Badge className={`${getPriorityColor(announcement.priority)} text-white hover:bg-primary text-xs px-2 py-0.5`}>
                                {announcement.priority}
                              </Badge>
                              <Badge className={`${getStatusColor(announcement.type)} text-white hover:bg-primary  text-xs px-2 py-0.5`}>
                                {announcement.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => openAnnouncementDialog(announcement)}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-page Dialog for Announcement Details */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={closeAnnouncementDialog}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-800">{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  <Calendar className="inline mr-1 w-4 h-4" />
                  {new Date(selectedAnnouncement?.startDate || '').toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  <User className="inline mr-1 w-4 h-4" />
                  {selectedAnnouncement?.author}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">{selectedAnnouncement?.description}</p>
            {selectedAnnouncement?.ImpLink && (
              <div className="mt-4">
                <h4 className="font-semibold flex items-center text-indigo-700">
                  <LinkIcon className="w-4 h-4 mr-2" /> Important Link:
                </h4>
                <a href={selectedAnnouncement.ImpLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {selectedAnnouncement.ImpLink}
                </a>
              </div>
            )}
            {selectedAnnouncement?.attachment && (
              <div className="mt-4">
                <h4 className="font-semibold flex items-center text-indigo-700">
                  <Paperclip className="w-4 h-4 mr-2" /> Attachment:
                </h4>
                <a href={selectedAnnouncement.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Attachment
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}