import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bird, Rabbit, Turtle } from "lucide-react";
import React from "react";
import ExistAppointment from "./ExistAppointment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";


const page = () => {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="grid grid-flow-col md:grid-flow-col justify-center gap-x-8 border  items-center  p-2 md:p-4">
          <img
            src="hospital/hospitallogo.png"
            alt="Hospital Logo"
            className="w-32 h-32 md:mb-0"
          />
          <div className="grid text-center space-y-2 sm:text-left md:text-left">
            <h1 className="font-bold text-xl md:text-2xl">
              Shree Jagannath Hospital & Research Center
            </h1>
            <p>sjhrc.ranchi@gmail.com</p>
            <a href="https://sjhrc.in">https://sjhrc.in</a>
            <p>+91 8987999200</p>
          </div>
        </div>
        <div className="flex mx-auto justify-center items-center content-center ">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <Tabs defaultValue="newAppointment" className="w-full">
                <div className=" flex justify-between mr-4">
                  <TabsList>
                    <TabsTrigger value="newAppointment">
                      New Appointment
                    </TabsTrigger>
                    <TabsTrigger value="oldAppointment">
                      Existing Appointment
                    </TabsTrigger>
                  </TabsList>
                  <Link href="/">
                    <Button variant="outline">
                      <ArrowLeft /> Back
                    </Button>
                  </Link>
                </div>
                <div className="  mt-4">
                  <TabsContent value="newAppointment">
                    <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Appointment
                        </legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="model">Doctor</Label>
                            <Select>
                              <SelectTrigger
                                id="model"
                                className="items-start [&_[data-description]]:hidden mt-1"
                              >
                                <SelectValue placeholder="Select Doctor" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="genesis">
                                  A.K Sinha
                                </SelectItem>
                                <SelectItem value="explorer">
                                  P Chawala
                                </SelectItem>
                                <SelectItem value="quantum">MC Stan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="model">Department</Label>
                            <Select>
                              <SelectTrigger
                                id="model"
                                className="items-start [&_[data-description]]:hidden mt-1"
                              >
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="genesis">
                                  A.K Sinha
                                </SelectItem>
                                <SelectItem value="explorer">
                                  P Chawala
                                </SelectItem>
                                <SelectItem value="quantum">MC Stan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="content">Preferred Date</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              id="content"
                              placeholder="You are a..."
                            />
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="model">Available Slot</Label>
                            <Select>
                              <SelectTrigger
                                id="model"
                                className="items-start [&_[data-description]]:hidden mt-1"
                              >
                                <SelectValue placeholder="Select Slot" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="genesis">
                                  A.K Sinha
                                </SelectItem>
                                <SelectItem value="explorer">
                                  P Chawala
                                </SelectItem>
                                <SelectItem value="quantum">MC Stan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-3"></div>
                      </fieldset>

                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Patient Details
                        </legend>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="model">Full Name</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Full Name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="model">Gaurdian Name</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Gaurdian Name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="model">Gender</Label>
                            <Select>
                              <SelectTrigger
                                id="model"
                                className="items-start [&_[data-description]]:hidden mt-1"
                              >
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="genesis">Male</SelectItem>
                                <SelectItem value="explorer">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="content">DOB</Label>
                            <Input
                              type="date"
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="content">Phone</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Phone Number"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="content">Email</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Email"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="content">Address</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Address"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="content">City</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter City"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="content">District</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter District"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="content">State</Label>
                            <Input
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter State"
                            />
                          </div>
                        </div>

                        <div className="grid gap-3"></div>
                      </fieldset>
                      {/* Action Buttons */}
                      <div className=" bottom-0  py-4 mt-2 flex justify-end space-x-4">
                        <Button className="w-24">Save</Button>
                        <Button variant="outline" className="w-24">
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="oldAppointment">
                    <ExistAppointment />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default page;
