"use client";
import Image from "next/image";
import { Heart, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import blogData from "@/json/BlogData";
import Link from "next/link";

export default function Component() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>All Posts</CardTitle>
        <CardDescription>Manage your blogs and view.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="hidden md:table-cell ">Likes</TableHead>
              <TableHead className="hidden md:table-cell">Comments</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>

              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogData.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="img"
                  className="aspect-square rounded-md object-fill "
                  height="64"
                  src={blog.featureImage}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell className="hidden md:table-cell text-center">{blog.likes}</TableCell>
              <TableCell className="hidden md:table-cell text-center">{blog.comments}</TableCell>
              <TableCell className="hidden md:table-cell">{blog.category}</TableCell>
              <TableCell className="hidden md:table-cell">{blog.date}</TableCell>
              <TableCell className="hidden md:table-cell"></TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>10</strong> blogs
        </div>
      </CardFooter>
    </Card>
  );
}
