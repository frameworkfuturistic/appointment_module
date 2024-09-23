"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/Title";

const ManageEvents = ({ userImages = [], onUpdateImages }) => {
  const [images, setImages] = useState(
    userImages.length > 0
      ? userImages
      : [
        { url: "/noticeBoard/AdmissionNotice.png" },
        { url: "/noticeBoard/Ayushman.png" },
        { url: "/noticeBoard/CourseDetail.png" },
        { url: "/noticeBoard/notice.png" },
        ]
  );

  const [newImageUrl, setNewImageUrl] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddImage = () => {
    if (newImageUrl.trim() !== "") {
      if (editIndex !== null) {
        const updatedImages = [...images];
        updatedImages[editIndex] = { url: newImageUrl };
        setImages(updatedImages);
        setEditIndex(null);
      } else {
        setImages([...images, { url: newImageUrl }]);
      }
      setNewImageUrl("");
    }
  };

  const handleEditImage = (index) => {
    setNewImageUrl(images[index].url);
    setEditIndex(index);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSaveChanges = () => {
    onUpdateImages(images);
  };

  return (
    <div>
        <Title title={"Events images"}/>
      <div className="mb-4 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleAddImage} className="bg-destructive">
          {editIndex !== null ? "Edit Image" : "Add Image"}
        </Button>
      </div>

      <div className="image-list">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item flex items-center space-x-2 mb-2"
          >
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-20 h-20 object-cover"
            />

            <Button
              onClick={() => handleDeleteImage(index)}
              className="bg-destructive"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleSaveChanges} className="bg-primary mt-4">
        Save Changes
      </Button>
    </div>
  );
};

export default ManageEvents;
