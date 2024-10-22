"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bell,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  CircleUser,
  Clock,
  FileText,
  Home,
  LineChart,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Package2,
  Search,
  Settings,
  Sun,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, logout, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMasterSubmenuOpen, setIsMasterSubmenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false)


  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: CalendarIcon, label: "Appointments", href: "/dashboard/appointments" },
    { icon: MessageSquare, label: "Blog", href: "/dashboard/blogs" },
    { icon: FileText, label: "Academics", href: "/dashboard/academics" },
    { icon: FileText, label: "Notice Board", href: "/dashboard/noticeBoard" },
    { icon: FileText, label: "Job Applications", href: "/dashboard/JobApplications" },
    { icon: FileText, label: "Schedule", href: "/dashboard/masters/schedule" },
    { icon: LineChart, label: "Gallery", href: "/dashboard/gallery" },
    { icon: FileText, label: "Contact Us", href: "/dashboard/masters/contactus" },
    // { icon: Settings, label: "Master", href: "#" },
  ];
  const masterSubmenuItems = [
    { label: "Departments", href: "#" },
  ];

  return (
    <div
      className={`flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col space-y-5 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-r-3xl">
        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
          <Package2 className="h-8 w-8" />
          <span className="text-2xl font-bold">Dashboard</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
           <div key={item.href}>
           {item.label === "Master" ? (
             <>
               <button
                 onClick={() => setIsMasterSubmenuOpen(!isMasterSubmenuOpen)}
                 className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors w-full"
               >
                 <item.icon className="h-5 w-5" />
                 <span>{item.label}</span>
                 {isMasterSubmenuOpen ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />}
               </button>
               {isMasterSubmenuOpen && (
                 <div className="ml-8 space-y-2">
                   {masterSubmenuItems.map((submenuItem) => (
                     <Link key={submenuItem.href} href={submenuItem.href}  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors"
                     >
                       {submenuItem.label}
                     </Link>
                   ))}
                 </div>
               )}
             </>
           ) : (
             <Link href={item.href} className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors">
               <item.icon className="h-5 w-5" />
               <span>{item.label}</span>
             </Link>
           )}
         </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 bg-white dark:bg-gray-800">
          <SheetHeader>
            <SheetTitle className="text-indigo-600 dark:text-indigo-400">
              MediDash
            </SheetTitle>
            <SheetDescription>Quick access to all features</SheetDescription>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            {menuItems.map((item) => (
               <div key={item.href}>
               {item.label === "Master" ? (
                 <>
                   <button
                     onClick={() => setIsMasterSubmenuOpen(!isMasterSubmenuOpen)}
                     className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors w-full"
                   >
                     <item.icon className="h-5 w-5" />
                     <span>{item.label}</span>
                     {isMasterSubmenuOpen ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />}
                   </button>
                   {isMasterSubmenuOpen && (
                     <div className="ml-8 space-y-2">
                       {masterSubmenuItems.map((submenuItem) => (
                         <Link
                           key={submenuItem.href}
                           href={submenuItem.href}
                           className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors"
               
                           onClick={() => setIsMobileMenuOpen(false)}
                         >
                           {submenuItem.label}
                         </Link>
                       ))}
                     </div>
                   )}
                 </>
               ) : (
                 <Link
                   href={item.href}
                   className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   <item.icon className="h-5 w-5" />
                   <span>{item.label}</span>
                 </Link>
               )}
             </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-b-3xl">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative">
              {/* Original search button - hidden on mobile */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
           
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600" />
              )}
            </Button>
           
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative bg-gray-100 dark:bg-gray-700 rounded-full">
                  <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    {showNotifications && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full  bg-red-500 transform translate-x-1 -translate-y-1"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
                      <span>New appointment request</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                      <span>Appointment rescheduled</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="@doctor"
                    />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                    {user?.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      ADMIN
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        {children}
      </main>
    </div>
  );
}
