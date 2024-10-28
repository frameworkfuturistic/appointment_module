"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";


// Define the Image type
interface Image {
  src: string;
  alt: string;
  title: string;
  description: string;
}

// Define your images array with type annotation
const images: Image[] = [
  {
    src: "/gallery/vandanamam.png",
    alt: "img",
    title: "Vandana Mam",
    description: "",
  },
  { src: "/gallery/um1.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um2.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um3.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um4.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um5.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um6.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um7.png", alt: "img", title: "", description: "" },
  { src: "/gallery/um8.png", alt: "img", title: "", description: "" },
  { src: "/gallery/paper.png", alt: "img", title: "", description: "" },
  { src: "/gallery/paper1.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i1.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i2.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i3.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i4.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i5.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i6.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i7.png", alt: "img", title: "", description: "" },
  { src: "/gallery/i8.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery1.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery2.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery4.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery5.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery7.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery10.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery11.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery12.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery13.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery14.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery15.png", alt: "img", title: "", description: "" },
  { src: "/gallery/gallery16.png", alt: "img", title: "", description: "" },
  { src: "/gallery/camp1.png", alt: "img", title: "", description: "" },
  { src: "/gallery/camp2.png", alt: "img", title: "", description: "" },
  { src: "/gallery/camp3.png", alt: "img", title: "", description: "" },
  { src: "/gallery/camp4.png", alt: "img", title: "", description: "" },
  { src: "/gallery/camp8.png", alt: "img", title: "", description: "" },
  { src: "/gallery/awareness.png", alt: "img", title: "", description: "" },
  { src: "/gallery/26.png", alt: "img", title: "", description: "" },
  { src: "/gallery/27.png", alt: "img", title: "", description: "" },

  // ... add other images here
];

const ImageGrid: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(images.length / itemsPerPage);

  // Get the images for the current page
  const paginatedImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-pattern4-bg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="bg-rose-200 text-4xl font-bold text-center mb-8 p-8 ">Media & Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {paginatedImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              onClick={() => openModal(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}   // set an appropriate width
                height={192}  // set an appropriate height to match "h-48"
                className="w-full h-48 object-cover" // This can still work for additional styling
                layout="responsive"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-xl font-bold text-white">
                    {image.title}
                  </h4>
                  {image.description && (
                    <p className="text-white">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationPrevious
              // disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </PaginationPrevious>

            <PaginationContent>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem
                  key={index}
                  // active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationItem>
              ))}
            </PaginationContent>

            <PaginationNext
              // disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </PaginationNext>
          </Pagination>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg relative max-w-3xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
  src={selectedImage.src} // Assuming selectedImage.src is a valid path
  alt={selectedImage.alt}  // Set alt text from selectedImage.alt
  width={500}              // Set an appropriate width based on your layout
  height={300}             // Set height to maintain the aspect ratio
  className="w-full h-auto object-cover rounded-lg" // Use Tailwind CSS classes
/>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="mt-2">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;

// Explanation:
// Pagination State:
// currentPage tracks the current page number.
// itemsPerPage defines how many items are displayed per page.

// Pagination Logic:
// totalPages calculates the total number of pages based on the number of images and items per page.
// paginatedImages slices the images array to display only the images for the current page.

// Pagination Controls:
// PaginationPrevious and PaginationNext components handle navigation between pages.
// PaginationItem components represent each page number and allow navigation to that page.
// Disabled state for previous/next buttons is managed to prevent invalid page changes.

// Pagination Component Integration:
// Make sure you have the pagination components (Pagination, PaginationContent, PaginationItem, etc.) available in your project, or implement your own pagination controls if necessary.
