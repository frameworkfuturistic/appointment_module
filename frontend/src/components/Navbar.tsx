"use client";

import * as React from "react";
import Link from "next/link";
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
  Calendar,
  ChevronDown,
  Heart,
  Menu,
  Phone,
  Search,
  User,
  Clock,
  MapPin,
} from "lucide-react";

const navigationLinks = [
  { title: "HOME", href: "/" },
  {
    title: "ABOUT US",
    href: "/about/aboutUs",
    children: [
      {
        title: "About Us",
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
    title: "SERVICES",
    href: "/services",

  },
  {
    title: "SPECIALITY",
    href: "/speciality/ourSpeciality",
    children: [
      {
        title: "Our Speciality",
        href: "/speciality/ourSpeciality",
        description: "24/7 emergency medical services",
      },
     
      {
        title: "Key Performance",
        href: "/speciality/keyPerformance",
        description: "Key Performance",
      },
    ],
  },
  {
    title: "DEPARTMENTS",
    href: "/departments",
    children: [
      {
        title: "OPD Schedule",
        href: "/opd",
        description: "Shift & Schedule of OPD Department Srvices",
      },
      {
        title: "Cardiology",
        href: "inDepartment/cardiology",
        description: "Heart and cardiovascular care",
      },
      {
        title: "General Medicine",
        href: "/inDepartment/generalMedicine",
        description: "All infections related specialists",
      },
      {
        title: "Neurosurgery",
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
  { title: "COURSES", href: "/" },
  { title: "CAREER", href: "/career/currentOpenings" },
  { title: "BLOG", href: "/blog" },

  { title: "CONTACT", href: "/contact" },
];

const quickSearch = [
  { name: "Cardiology", href: "/departments/cardiology" },
  { name: "Neurology", href: "/departments/neurology" },
  { name: "Oncology", href: "/departments/oncology" },
  { name: "Pediatrics", href: "/departments/pediatrics" },
  { name: "Orthopedics", href: "/departments/orthopedics" },
  { name: "Emergency Care", href: "/services/emergency" },
  { name: "Laboratory Services", href: "/services/laboratory" },
  { name: "Radiology", href: "/services/radiology" },
  { name: "Rehabilitation", href: "/services/rehabilitation" },
  { name: "Mental Health", href: "/services/mental-health" },
]



export default function AdvancedHospitalNavbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-rose-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-4">
          <div className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {renderNavigationMenuItems(navigationLinks)}
              </NavigationMenuList>
            </NavigationMenu>

            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-rose-600  hover:text-rose-800"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="end">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Quick Search">
                      {quickSearch.map((dept) => (
                        <CommandItem key={dept.name} onSelect={() => {
                          setIsSearchOpen(false)
                          // Navigate to department page
                        }}>
                          {dept.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="animate">
              <Link href="/appointment">
                <Button
                  variant="hms"
                  className=" w-full transition ease-in-out delay-100 hover:translate-4 hover:scale-110 duration-400 group block"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
}

function renderNavigationMenuItems(links: typeof navigationLinks) {
  return links.map((link) => (
    <NavigationMenuItem key={link.title}>
      {link.children ? (
        <>
          <NavigationMenuTrigger className="bg-transparent hover:text-rose-800 text-black">
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
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {link.title}
          </NavigationMenuLink>
        </Link>
      )}
    </NavigationMenuItem>
  ));
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-rose-200 hover:text-rose-900 focus:bg-rose-100 focus:text-rose-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
