"use client";
import React, { useState } from "react";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";



const page = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleUrlSubmit = (event) => {
    event.preventDefault();
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setImageUrl(""); // Optionally clear the input field after submission
    }
  };
  return (
    <>
      <div className=" relative flex-col items-start gap-8 md:flex">
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Title</legend>
            <div className="grid lg:grid-cols-2 gap-3">
              <Input
                type="name"
                placeholder="Enter Title"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
              <Input
                type="name"
                placeholder="Enter Subtitle"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />

              {/* <Select>
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Rabbit className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Genesis
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="explorer">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Bird className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Explorer
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="quantum">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Turtle className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Quantum
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" type="number" placeholder="0.4" />
            </div> */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </div> */}
          </fieldset>

          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Post</legend>
            <div className="grid lg:grid-cols-2 gap-3">
              <Input
                type="name"
                placeholder="Enter Auther Name"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
              <div className="">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">Health</SelectItem>
                    <SelectItem value="user">Fitness</SelectItem>
                    <SelectItem value="assistant">Diet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" type="number" placeholder="0.4" />
            </div> */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </div> */}
          </fieldset>

          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Descrition
            </legend>

            <div className="grid gap-3">
              <Textarea
                id="content"
                placeholder="Write something intresting..."
                className="min-h-[9.5rem]"
              />
            </div>

            <div></div>
          </fieldset>

          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Featured Image
            </legend>

            <div className="grid grid-cols-2 gap-3">
              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              <div>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full max-h-[200px] object-cover rounded-md border border-[#e0e0e0]"
                  />
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center text-[#6B7280] border border-dashed border-[#e0e0e0] rounded-md">
                    No image selected
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="Enter Image URL"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
              <button
                onClick={handleUrlSubmit}
                className="bg-blue-500 text-white rounded-sm m-4 h-10 px-4"
              >
                Load Image
              </button>
            </div>
          </fieldset>

          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Links</legend>
            <div className="grid lg:grid-cols-2 gap-3">
              {/* Facebook */}
              <Input
                type="name"
                placeholder="Facebook Url"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
              {/* Twitter */}
              <Input
                type="name"
                placeholder="Twitter"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
              {/* Instagram */}
              <Input
                type="name"
                placeholder="Instagram"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
              {/* Youtube */}
              <Input
                type="name"
                placeholder="Youtube"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Tags</legend>
            <div className="grid lg:grid-cols-2 gap-3">
              {/* Tags */}
              <Input
                type="name"
                placeholder="#tags"
                className="bg-white border-2 rounded-sm m-4 h-10 w-[550px] text-sm px-3"
              />
            </div>
          </fieldset>
          <div>
        <Button type="submit" className="m-8">
          Post
        </Button>
        </div>
        </form>
       
      </div>
    </>
  );
};

export default page;
