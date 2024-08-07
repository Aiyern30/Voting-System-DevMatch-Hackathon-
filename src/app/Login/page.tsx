import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import { Input } from "@/components/ui/Input";
import React from "react";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Tabs defaultValue="Login" className="">
          <TabsList>
            <TabsTrigger value="Login">Account</TabsTrigger>
            <TabsTrigger value="Register">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="Login" className="flex justify-center">
            <Card className="w-[600px] bg-[#987070] rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white font-bold text-center">
                  Welcome Back!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pb-20">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        placeholder="Email Address"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <img
                        src="gmail.png"
                        alt=""
                        width={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        placeholder="Password"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <img
                        src="lock.png"
                        alt=""
                        width={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <Button className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5">
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Register" className="flex justify-center">
            <Card className="w-[600px] bg-[#987070] rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white font-bold text-center">
                  New Account
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pb-20">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        placeholder="Email Address"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <img
                        src="gmail.png"
                        alt=""
                        width={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        placeholder="Password"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <img
                        src="lock.png"
                        alt=""
                        width={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        placeholder="Confirm Password"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <img
                        src="lock.png"
                        alt=""
                        width={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <Button className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5">
                      Sign Up
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
