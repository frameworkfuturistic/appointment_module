import React from "react";
import SignUp from "@/components/SignUp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, CircleUserRound } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <CircleUserRound color="#0f57a3" />
        </DialogTrigger>
        <DialogContent className="  justify-center items-center sm:max-w-[425px] ">
          <div>
            <SignUp />
            <Link href="/dashboard">
              <ArrowRight color="#0f57a3" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
