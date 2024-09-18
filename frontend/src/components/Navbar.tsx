"use client"; // Ensure this is at the top of your file

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenu as NavigationMenuComponent,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Home, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import Appointmentform from "./Appointmentform";
// import Appointment from "@/app/(root)/Appointment/page";
import Link from "next/link";

function CustomNavigationMenu() {
  return (
    <div className="hidden md:flex">
      <div className="bg-rose-100 shadow-lg grid lg:grid-flow-col max-w-[1000px] min-h-[60px]   gap-x-2  hover:z-10 top-0 mx-auto rounded-full items-center  border-b bg-background px-4 ">
        <NavigationMenuComponent>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuContent></NavigationMenuContent>
              <a className="font-medium text-sm mr-2" href="/">
                HOME
              </a>
            </NavigationMenuItem>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent ">
                  ABOUT
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>
                    <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                      <ListItem
                        href="/about/aboutUs"
                        title="About Us"
                      ></ListItem>
                      <ListItem
                        href="/about/gallery"
                        title="Gallery"
                      ></ListItem>

                      <ListItem
                        href="/about/policy&values"
                        title="Values and Policy"
                      ></ListItem>
                    </ul>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuItem>
              <NavigationMenuContent></NavigationMenuContent>
              <a className="font-medium text-sm mr-4" href="/services">
                SERVICES{" "}
              </a>
            </NavigationMenuItem>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  SPECIALITY
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem
                      href="/speciality/ourSpeciality"
                      title="Our Speciality"
                    ></ListItem>
                    <ListItem
                      href="/speciality/keyPerformance"
                      title="Key Performance"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  DEPARTMENTS
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem href="/opd" title="OPD Schedule"></ListItem>

                    <ListItem
                      href="/departmentDetail"
                      title="Department Detail"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuItem>
              <NavigationMenuContent></NavigationMenuContent>
              <a className="font-medium text-sm mr-4" href="/">
                COURSES{" "}
              </a>
            </NavigationMenuItem>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  CAREER
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid   p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem
                      href="/career/currentOpenings"
                      title="Current Openings"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuItem>
              <NavigationMenuContent></NavigationMenuContent>
              <a
                className="font-medium text-sm mr-4"
                href="/blogDash/blog"
                target="_"
              >
                BLOG{" "}
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuContent></NavigationMenuContent>
              <a href="/contact" className="font-medium text-sm">
                CONTACT
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuComponent>

        <div>
          <Dialog>
            <DialogTrigger className="shadow-xl  rounded-full   min-w-8 min-h-8 hover:border-2 hover:border-rose-300   ">
              <Search className="m-2 size-8 text-slate-600" />
            </DialogTrigger>
            <DialogContent className="min-h-16 ">
              <div className="flex  items-center justify-between">
                <Input
                  type="input"
                  placeholder="search"
                  className=" w-full mx-6"
                />
                <Button className=" bg-destructive h-full ">
                  <Search />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="animate-bounce">
          <Link href="/appointment">
          <Button
            variant="hms"
            className="transition ease-in-out delay-100 hover:translate-4 hover:scale-110 duration-400 group block"
          >
            Appointment
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <div>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <h1 className="text-sm font-medium leading-none">{title}</h1>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </div>
  );
});

ListItem.displayName = "ListItem";

export default CustomNavigationMenu;
