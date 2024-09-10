import React from "react";
import Link from "next/link";
import {
  CircleUser,
  Home,
  HomeIcon,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavMobile = () => {
  return (
    // <>
    // <div className="flex flex-col md:hidden">
    // <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    //   <Sheet>
    //     <SheetTrigger asChild>
    //       <Button variant="outline" size="icon" className="shrink-0 md:hidden">
    //         <Menu className="h-5 w-5" />
    //         <span className="sr-only">Toggle navigation menu</span>
    //       </Button>
    //     </SheetTrigger>
    //     <SheetContent side="left" className="flex flex-col">
    //       <nav className="grid gap-2 text-lg font-medium">
    //         <Link
    //           href="#"
    //           className="flex items-center gap-2 text-lg font-semibold"
    //         >
    //           <Package2 className="h-6 w-6" />
    //           <span className="sr-only">Acme Inc</span>
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Home className="h-5 w-5" />
    //          HOME
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
    //         >
    //           <ShoppingCart className="h-5 w-5" />
    //          ABOUT
    //           <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
    //             6
    //           </Badge>
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Package className="h-5 w-5" />
    //           SERVICES
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Users className="h-5 w-5" />
    //           SPECIALITY
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <LineChart className="h-5 w-5" />
    //           DEPARTMENTS
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Users className="h-5 w-5" />
    //           COURSES
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Users className="h-5 w-5" />
    //           CAREER
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Users className="h-5 w-5" />
    //           BLOG
    //         </Link>
    //         <Link
    //           href="#"
    //           className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //         >
    //           <Users className="h-5 w-5" />
    //           CONTACT
    //         </Link>
    //       </nav>
    //       {/* <div className="mt-auto">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Upgrade to Pro</CardTitle>
    //             <CardDescription>
    //               Unlock all features and get unlimited access to our support
    //               team.
    //             </CardDescription>
    //           </CardHeader>
    //           <CardContent>
    //             <Button size="sm" className="w-full">
    //               Upgrade
    //             </Button>
    //           </CardContent>
    //         </Card>
    //       </div> */}
    //     </SheetContent>
    //   </Sheet>

    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="secondary" size="icon" className="rounded-full">
    //             <CircleUser className="h-5 w-5" />
    //             <span className="sr-only">Toggle user menu</span>
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>Settings</DropdownMenuItem>
    //           <DropdownMenuItem>Support</DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>Logout</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //   </header>

    //   </div>
    // </>
    <>
      {/* Mobile Navigation Container */}
      <div className="flex flex-col md:hidden">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Sheet for Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col w-1/2">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <HomeIcon />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                <Link
                  href="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  HOME
                </Link>

                <Link
                  href="/about"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  ABOUT
                </Link>

                <Link
                  href="/services"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  SERVICES
                </Link>

                <Link
                  href="/speciality"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  SPECIALITY
                </Link>

                <Link
                  href="/departments"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  DEPARTMENTS
                </Link>

                <Link
                  href="/courses"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  COURSES
                </Link>

                <Link
                  href="/career"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  CAREER
                </Link>

                <Link
                  href="/blog"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  BLOG
                </Link>

                <Link
                  href="/contact"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  CONTACT
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </>
  );
};

export default NavMobile;
