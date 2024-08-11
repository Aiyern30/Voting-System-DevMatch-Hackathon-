"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import { Input } from "@/components/ui/Input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import Footer from "@/components/ui/Components/Footer";

const Page: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setLoginSuccess("Login successful! Redirecting...");
        setIsLoggedIn(true); // Update the login state
        localStorage.setItem("isLoggedIn", "true"); // Store login state in local storage

        // Clear the input fields
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("Login/OwnerHomepage");
        }, 3000); // Delay the redirect
      } else {
        const data = await response.json();
        setLoginError(data.message);
        setTimeout(() => {
          setLoginError(null);
        }, 3000);
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      setTimeout(() => {
        setRegisterError(null);
      }, 3000);
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerEmail, registerPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setRegisterSuccess("Registration successful! You can now log in.");

        // Clear the input fields
        setRegisterEmail("");
        setRegisterPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setRegisterSuccess(null);
          router.push("/Login"); // Redirect to login page after registration
        }, 3000);
      } else {
        const data = await response.json();
        setRegisterError(data.message);
        setTimeout(() => {
          setRegisterError(null);
        }, 3000);
      }
    } catch (error) {
      setRegisterError("An error occurred. Please try again.");
      setTimeout(() => {
        setRegisterError(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center pt-10">
        <Tabs defaultValue="Login" className="">
          <TabsList>
            <TabsTrigger value="Login">Account</TabsTrigger>
            <TabsTrigger value="Register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="Login" className="flex justify-center">
            <Card className="w-[600px] bg-[#987070] rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white font-bold text-center">
                  Welcome Back!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pb-20">
                {loginError && (
                  <Alert className="mb-4 bg-red-200">
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                {loginSuccess && (
                  <Alert className="mb-4 bg-green-200">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{loginSuccess}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/gmail.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5"
                    >
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
                {registerError && (
                  <Alert className="mb-4 bg-red-200">
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>{registerError}</AlertDescription>
                  </Alert>
                )}
                {registerSuccess && (
                  <Alert className="mb-4 bg-green-200">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{registerSuccess}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleRegister}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="Email Address"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/gmail.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Password"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="pl-28 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
