// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { twMerge } from "tailwind-merge";
// import { TracingBeam } from "@/components/ui/tracing-beam";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Link from "next/link";
// import { Heart, MessageCircle } from "lucide-react";
// import { Toggle } from "@radix-ui/react-toggle";
// import blogData from "@/json/BlogData"; // Assuming this is a JSON file with blog data
// import { useParams } from "next/navigation";
// import Marquee from "react-fast-marquee";
// import { Button } from "@/components/ui/button";

// type BlogPost = {
//   id: number;
//   title: string;
//   subtitle: string;
//   featureImage: string;
//   author: string;
//   date: string;
//   likes: number;
//   comments: number;
//   category: string;
//   tags: string[];
//   description: JSX.Element;
//   note: string;
// };

// const BlogContent: React.FC = () => {
//   const params = useParams();
//   const [blog, setBlog] = useState<BlogPost | null>(null);

//   useEffect(() => {
//     const id = params.id as string;
//     if (id) {
//       const foundBlog = blogData.find(
//         (post: BlogPost) => post.id === parseInt(id, 10)
//       );
//       setBlog(foundBlog || null);
//     }
//   }, [params]);

//   if (!blog) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="mt-8">
//       <TracingBeam className="px-2">
//         <div className="w-full antialiased pt-4 relative">
//           <div className="mb-12 lg:grid lg:grid-cols-4 lg:gap-8">
//             <div className="lg:col-span-3">
//               <div className="prose prose-sm dark:prose-invert">
//                 <h2 className={twMerge("text-3xl font-semibold mb-4")}>
//                   {blog.title}
//                 </h2>
//                 <h4
//                   className={twMerge("text-md font-medium text-slate-400 mb-4")}
//                 >
//                   🧑‍⚕️ {blog.author} , ❤️ {blog.likes}, 🗨️{blog.comments}, 📅{" "}
//                   {blog.date}
//                 </h4>

//                 {blog.featureImage && (
//                   <Image
//                     src={blog.featureImage}
//                     alt="blog thumbnail"
//                     height={1000}
//                     width={1000}
//                     className="rounded-lg mb-10 object-cover"
//                   />
//                 )}
//                 <span className="text-slate-800 text-wrap">
//                   {blog.description}
//                 </span>
//                 <Marquee className="bg-slate-200  font-serif h-10 my-6">
//                   Note: {blog.note}
//                 </Marquee>
//               </div>
//               <strong>{}</strong>
//             </div>
//             <div className="lg:col-span-1 mt-8 lg:mt-0">
//               <div className="grid grid-flow-row">
//                 <ul className="items-center gap-y-8 gap-6">
//                   <strong className="py-2">Category:</strong>
//                   <li className="flex w-full justify-between gap-1">
//                     {blog.category}
//                   </li>
//                 </ul>
//               </div>
//               <div className="mt-4">
//                 <h2 className="text-xl font-semibold mb-4">TAG</h2>
//                 <ul className="grid grid-cols-2 gap-1">
//                   {blog.tags.map((tag, index) => (
//                     <li key={index}>
//                       <Badge className="min-h-8 min-w-20 text-balance">{tag}</Badge>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </TracingBeam>

//               {/* Related Blogs */}
//       <div className="w-full max-w-6xl mx-auto   mt-4">
//         <h2 className="text-2xl font-semibold">Related Posts</h2>
//         <Carousel opts={{ align: "start" }} className="flex w-full mt-4 h-full">
//           <CarouselContent className="flex">
//             {blogData.map((blog) => (
//               <CarouselItem key={blog.id} className="md:basis-1/3 lg:basis-1/3">
//                 <Card className="bg-white sm:min-h-96 sm:max-w-xs grid grid-flow-row justify-center transition duration-500 transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-8 hover:opacity-80 hover:border-b-sky-700">
//                   <img
//                     src={blog.featureImage}
//                     alt={blog.title}
//                     className="rounded-t-lg"
//                   />
//                   <Toggle className="bg-sky-600 max-w-32 text-white place-self-end -mt-10 rounded-b-none rounded-r-none">
//                     {blog.date}
//                   </Toggle>
//                   <div className="grid grid-flow-row p-6 gap-y-4">
//                     <h1 className="text-lg font-semibold">{blog.title}</h1>
//                     <p className="text-xs font-extralight pb-4 border-b-2">
//                       {blog.minidescription}
//                     </p>
//                     <div className="grid grid-flow-col justify-between">
//                       <div className="flex gap-2">
//                         <Link href="">
//                           <Heart size={16} color="#1a1a1a" strokeWidth={1} />
//                         </Link>
//                         <Link href="">
//                           <MessageCircle
//                             size={16}
//                             color="#141414"
//                             strokeWidth={1}
//                           />
//                         </Link>
//                       </div>
//                       <Link href={`/blog/${blog.id}`}>
//                         <Button>Read More</Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default BlogContent;
