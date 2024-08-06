import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Input } from "@/components/ui/Input";
import React from "react";
import { Button } from "@/components/ui/Button";
import { HiOutlineMail } from "react-icons/hi";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-[600px] h-[640px] bg-[#987070]">
          <CardHeader>
            <CardTitle className="text-white font-bold">
              Welcome Back!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 relative">
                  <Input
                    id="email"
                    placeholder="Email Address"
                    className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black"
                  />
                  <img
                    src="gmail.png"
                    alt=""
                    width={45}
                    className="absolute top-0 left-7"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black"
                  />
                  <img
                    src="lock.png"
                    alt=""
                    width={45}
                    className="absolute top-0 left-7"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="">
            <Button className="mx-auto">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
