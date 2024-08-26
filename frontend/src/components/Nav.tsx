// "use client"; // Ensure this is at the top of your file

// import * as React from "react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuItem,
// } from "@/components/ui/navigation-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import Appointmentform from "./Appointmentform";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"


// function CustomNavigationMenu() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <>
//       <div className="bg-slate-50 max-w-[1000px] min-h-[60px] mx-auto rounded-full items-center border-b bg-background px-6">
//         {/* Desktop Menu */}
//         <div className="hidden md:flex justify-between items-center">
//           <NavigationMenu>
//             <NavigationMenuList className="flex flex-wrap justify-center items-center">
//               <NavigationMenuItem>
//                 <NavigationMenuContent></NavigationMenuContent>
//                 <a className="font-medium text-sm mr-2 hover:text-sky-600 transition-colors duration-300" href="/">HOME</a>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className="hover:text-sky-600 transition-colors duration-300">ABOUT</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid gap-1 p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
//                     <ListItem href="/about/aboutUs" title="About Us"></ListItem>
//                     <ListItem href="/about/gallery" title="Gallery"></ListItem>
//                     <ListItem href="/about/services" title="Services"></ListItem>
//                     <ListItem href="/about/policy&values" title="Values and Policy"></ListItem>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className="hover:text-sky-600 transition-colors duration-300">SPECIALITY</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid gap-1 p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
//                     <ListItem href="/speciality/ourSpeciality" title="Our Speciality"></ListItem>
//                     <ListItem href="/speciality/keyPerformance" title="Key Performance"></ListItem>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className="hover:text-sky-600 transition-colors duration-300">DEPARTMENTS</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid gap-1 p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
//                     <ListItem href="/opd" title="OPD Schedule"></ListItem>
//                     <ListItem href="/departmentDetail" title="Department Detail"></ListItem>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className="hover:text-sky-600 transition-colors duration-300">CAREER</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid gap-1 p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
//                     <ListItem href="/career/currentOpenings" title="Current Openings"></ListItem>
//                     <ListItem href="/docs" title="Courses"></ListItem>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuContent></NavigationMenuContent>
//                 <a className="font-medium text-sm mr-4 hover:text-sky-600 transition-colors duration-300" href="/dashboard">BLOG</a>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuContent></NavigationMenuContent>
//                 <a href="/contact" className="font-medium text-sm hover:text-sky-600 transition-colors duration-300">CONTACT</a>
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>

//           <div className="relative flex items-center">
//             <Dialog>
//               <DialogTrigger className="shadow-xl rounded-full min-w-8 min-h-8 hover:border-2 hover:border-sky-600">
//                 <Search className="m-2 size-8 text-sky-700" />
//               </DialogTrigger>
//               <DialogContent className="min-h-16 w-full max-w-xs">
//                 <div className="flex items-center justify-between">
//                   <Input type="input" placeholder="Search" className="w-full mx-6" />
//                   <Button className="bg-sky-700 h-full">
//                     <Search />
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>

//           <div className="animate-bounce">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-sky-700 rounded-full px-4 py-2">Appointment</Button>
//               </DialogTrigger>
//               <DialogContent className="bg-slate-100 p-6 rounded-lg shadow-lg">
//                 <DialogHeader>
//                   <DialogTitle>Book an Appointment</DialogTitle>
//                   <DialogDescription>Fill in the details below to book an appointment.</DialogDescription>
//                 </DialogHeader>
//                 <Appointmentform />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Mobile Menu */}
    

//         <div className="md:hidden flex items-center justify-between">
//           <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="bg-sky-700 rounded-full px-4 py-2">
//             Menu
//           </Button>
//           <DropdownMenu>
//   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
//   <DropdownMenuContent>
//     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>HOME</DropdownMenuItem>
//     <DropdownMenuItem>ABOUT</DropdownMenuItem>
//     <DropdownMenuItem>SPECIALITY</DropdownMenuItem>
//     <DropdownMenuItem>DEPARTMENTS</DropdownMenuItem>
//     <DropdownMenuItem>CAREER</DropdownMenuItem>
//     <DropdownMenuItem>BLOG</DropdownMenuItem>
//     <DropdownMenuItem>CONTACT</DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="md:hidden flex flex-col items-center mt-4">
//             <a className="font-medium text-sm mb-2 hover:text-sky-600 transition-colors duration-300" href="/">HOME</a>
//             <details className="mb-2">
//               <summary className="font-medium text-sm hover:text-sky-600 transition-colors duration-300">ABOUT</summary>
//               <ul className="ml-4">
//                 <li><ListItem href="/about/aboutUs" title="About Us" /></li>
//                 <li><ListItem href="/about/gallery" title="Gallery" /></li>
//                 <li><ListItem href="/about/services" title="Services" /></li>
//                 <li><ListItem href="/about/policy&values" title="Values and Policy" /></li>
//               </ul>
//             </details>
//             <details className="mb-2">
//               <summary className="font-medium text-sm hover:text-sky-600 transition-colors duration-300">SPECIALITY</summary>
//               <ul className="ml-4">
//                 <li><ListItem href="/speciality/ourSpeciality" title="Our Speciality" /></li>
//                 <li><ListItem href="/speciality/keyPerformance" title="Key Performance" /></li>
//               </ul>
//             </details>
//             <details className="mb-2">
//               <summary className="font-medium text-sm hover:text-sky-600 transition-colors duration-300">DEPARTMENTS</summary>
//               <ul className="ml-4">
//                 <li><ListItem href="/opd" title="OPD Schedule" /></li>
//                 <li><ListItem href="/departmentDetail" title="Department Detail" /></li>
//               </ul>
//             </details>
//             <details className="mb-2">
//               <summary className="font-medium text-sm hover:text-sky-600 transition-colors duration-300">CAREER</summary>
//               <ul className="ml-4">
//                 <li><ListItem href="/career/currentOpenings" title="Current Openings" /></li>
//                 <li><ListItem href="/docs" title="Courses" /></li>
//               </ul>
//             </details>
//             <a className="font-medium text-sm mb-2 hover:text-sky-600 transition-colors duration-300" href="/dashboard">BLOG</a>
//             <a className="font-medium text-sm mb-2 hover:text-sky-600 transition-colors duration-300" href="/contact">CONTACT</a>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <div>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <h1 className="text-sm font-medium leading-none">{title}</h1>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </div>
//   );
// });

// ListItem.displayName = "ListItem";

// export default CustomNavigationMenu;
