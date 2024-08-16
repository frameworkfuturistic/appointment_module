"use client"; // Ensure this is at the top of your file

import * as React from "react";
import Link from "next/link";

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
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Appointmentform from "./Appointmentform";

function CustomNavigationMenu() {
  return (
    <>
      <div className="bg-slate-50 grid grid-flow-col   max-w-[1200px] min-h-[60px]  gap-x-4  hover:z-10 top-0 mx-auto rounded-full items-center  border-b bg-background px-6">
        <div className="">
          <img
            src="/hospital/hospitallogo.png"
            alt="hmslogo"
            className="size-16 z-20 "
          />
        </div>
        <NavigationMenuComponent>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <NavigationMenuTrigger>HOME</NavigationMenuTrigger>
              </NavigationMenuLink>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem href="/" title="Home Medical"></ListItem>
                    <ListItem
                      href="/medicalHome"
                      title="Home Clinic"
                    ></ListItem>
                  </ul>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger>ABOUT</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>
                    <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                      <ListItem href="/aboutUs" title="About Us"></ListItem>
                      <ListItem href="#Speciality " title="Service"></ListItem>
                      <ListItem href="/gallery" title="Gallery"></ListItem>

                      <ListItem href="/" title="Terms And Condition"></ListItem>
                    </ul>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger>DOCTORS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem href="/docs" title="Doctors"></ListItem>
                    <ListItem href="/docs" title="Doctor Detail"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger>DEPARTMENTS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem href="/opd" title="OPD Schedule"></ListItem>

                    <ListItem
                      href="/departmentDetail"
                      title="Department Detail"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger>BLOG</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem href="/docs" title="Our Blogs"></ListItem>
                    <ListItem href="/docs" title="Add Blog"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>
            <NavigationMenuComponent>
              <NavigationMenuItem>
                <NavigationMenuTrigger>CAREER</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1  p-2 md:w-[200px] lg:w-[200px] lg:grid-flow-row">
                    <ListItem href="/docs" title="Career"></ListItem>
                    <ListItem href="/docs" title="Courses"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuComponent>

            <NavigationMenuItem>
              <NavigationMenuContent></NavigationMenuContent>
              <ListItem href="/contact">CONTACT</ListItem>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuComponent>

        <div>
          <Dialog>
            <DialogTrigger className="shadow-xl  rounded-full  min-w-8 min-h-8 hover:border-2 hover:border-sky-600   ">
              <Search className="m-2 size-8 text-sky-700" />
            </DialogTrigger>
            <DialogContent className="min-h-16 w-">
              <div className="flex  items-center justify-between">
                <Input
                  type="input"
                  placeholder="search"
                  className=" w-full mx-6"
                />
                <Button className=" bg-sky-700 h-full ">
                  <Search />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-sky-700 ">Appointment</Button>
            </DialogTrigger>
            <DialogContent className=" bg-slate-100  ">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              {/* AppointmentForm */}
              <Appointmentform />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default CustomNavigationMenu;
