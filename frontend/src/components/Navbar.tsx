"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  FileText,
  Phone,
  Menu,
  User,
  FileSpreadsheet,
  Briefcase,
  FlaskConical,
  Heart,
  Mail,
  Home,
  Stethoscope,
  Building2,
  GraduationCap,
  PhoneCall,
  ChevronDown,
  CalendarRange,
  LayoutDashboard,
} from "lucide-react";

const topNavItems = [
  { icon: User, label: "Find a Doctor", href: "/find-doctor" },
  { icon: FileText, label: "Blogs", href: "/blog" },
  { icon: FileSpreadsheet, label: "My Appointment", href: "/appointment" },
  { icon: Briefcase, label: "Career", href: "/career/currentOpenings" },
  { icon: CalendarRange, label: "Schedules", href: "/opd" },
  { icon: Heart, label: "Academics", href: "/comingsoon" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
];

const navigationLinks = [
  { icon: Home, title: "Home", href: "/" },

  {
    icon: Stethoscope,
    title: "About Us",
    href: "/about/aboutUs",
    children: [
      {
        title: "About",
        href: "/about/aboutUs",
        description: "Learn about our commitment to healthcare excellence",
      },
      {
        title: "Gallery",
        href: "/about/gallery",
        description: "Explore our  all excellent events or news",
      },
      {
        title: "Our Policy",
        href: "/about/policy&values",
        description: "Our initiatives to improve community health Policy",
      },
    ],
  },

  {
    icon: Stethoscope,
    title: "Treatments",
    href: "/departments",
    children: [
      {
        title: "Cardiology",
        href: "inDepartment/cardiology",
        description: "Heart and cardiovascular care",
      },
      {
        title: "Orthopaedics",
        href: "/inDepartment/orthopaedics",
        description:
          " Treatment the musculoskeletal system, includes the bones, joints, ligaments, tendons, and muscles.",
      },

      {
        title: "Medicine",
        href: "/inDepartment/generalMedicine",
        description: "All infections related specialists",
      },
      {
        title: "General Surgery",
        href: "/inDepartment/generalSurgery",
        description: "All infections related specialists",
      },

      {
        title: "Neuro Surgery",
        href: "/departments/oncology",
        description: "Treatment of diseases related with nurves",
      },

      {
        title: "More..",
        href: "/departmentDetail",
        description: "View all Departments",
      },
    ],
  },
  {
    icon: Stethoscope,
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Emergency Care",
        href: "/services",
        description:
          "24/7 emergency care for critical conditions and injuries.",
      },
      {
        title: "Diagnostics",
        href: "/services",
        description:
          "Our diagnostic services utilize cutting-edge technology, aiding in precise diagnosis and treatment planning.",
      },

      {
        title: "More..",
        href: "/services",
        description: "View all Services",
      },
    ],
  },
  {
    icon: Stethoscope,
    title: "Specialty",
    href: "/speciality/ourSpeciality",
    children: [
      { title: "General Specialty", href: "/speciality/ourSpeciality", description: "24/7 emergency medical services", },
      { title: "Super Specialty", href: "/speciality/ourSpeciality", description: "24/7 emergency medical services", },
      { title: "Key Performance", href: "/speciality/keyPerformance",description: "Key Performance", },
    ],
  },
  { icon: PhoneCall, title: "Contact Us", href: "/contact" },
];

const searchOptions = [
  { value: "cardiology", label: "Cardiology Department" },
  { value: "neurology", label: "Neurology Department" },
  { value: "orthopedics", label: "Orthopedics Department" },
  { value: "emergency", label: "Emergency Services" },
  { value: "appointments", label: "Book an Appointment" },
  { value: "doctors", label: "Find a Doctor" },
];

export default function Component() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const router = useRouter();

  const handleSearch = (value: string) => {
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white ">
      <div className="">
        <div className="flex flex-col ">
          {/* Main Navigation */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center pl-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/hospital/hospitallogo.png?height=50&width=50"
                  alt="Shree Jagannath Hospital Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-md md:text-4xl font-extrabold text-primary">
                    Shree Jagannath Hospital
                  </span>
                  <span className=" text-xs  md:text-md text-gray-600 ">
                    Multi Speciality and Trauma center
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex flex-col items-end ">
              <div className="arrow-container">
                <div className="arrow-bg"></div>
                <div className="arrow-content flex justify-between items-center py-0 px-16 text-sm text-gray-100">
                  <div className="flex items-center space-x-4">
                    {topNavItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4 mr-1" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 py-3 px-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    {navigationLinks.map((link) => (
                      <NavigationMenuItem key={link.title}>
                        {link.children ? (
                          <>
                            <NavigationMenuTrigger className="bg-transparent text-md font-semibold text-primary   hover:text-gray-700">
                              {link.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {link.children.map((child) => (
                                  <ListItem
                                    key={child.title}
                                    title={child.title}
                                    href={child.href}
                                  >
                                    {child.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <Link href={link.href} legacyBehavior passHref>
                            <NavigationMenuLink className="{navigationMenuTriggerStyle()} text-md font-semibold text-primary">
                              {link.title}
                            </NavigationMenuLink>
                          </Link>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-700 hover:text-primary hover:bg-gray-100"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                          {searchOptions.map((option) => (
                            <CommandItem
                              key={option.value}
                              onSelect={() => handleSearch(option.value)}
                            >
                              {option.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* Book Appointment Button */}
                <Link href="/appointment">
                  <Button
                    variant="gooeyLeft"
                    className="bg-primary text-white hover:bg-primary-100 transition-colors font-semibold"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Shree Jagannath Hospital Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">
                          Shree Jagannath Hospital
                        </span>
                        <span className="text-xs text-gray-600">
                          Multi Speciality and Trauma Center
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <nav className="flex flex-col p-4">
                      {navigationLinks.map((link) => (
                        <div key={link.title} className="py-2">
                          {link.children ? (
                            <details className="group">
                              <summary className="flex items-center justify-between cursor-pointer list-none">
                                <span className="flex items-center">
                                  <link.icon className="mr-2 h-4 w-4" />
                                  {link.title}
                                </span>
                                <span className="transition group-open:rotate-180">
                                  <ChevronDown className="h-4 w-4" />
                                </span>
                              </summary>
                              <ul className="mt-2 ml-6 space-y-1">
                                {link.children.map((child) => (
                                  <li key={child.title}>
                                    <Link
                                      href={child.href}
                                      className="block py-1 text-sm hover:text-primary"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <Link
                              href={link.href}
                              className="flex items-center py-1 hover:text-primary"
                              onClick={() => setIsOpen(false)}
                            >
                              <link.icon className="mr-2 h-4 w-4" />
                              {link.title}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                  <div className="p-4 border-t">
                    <Button
                      className="w-full mb-2"
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/appointment");
                      }}
                    >
                      Book Appointment
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      {topNavItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
