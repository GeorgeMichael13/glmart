"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { link } from "fs";

export default function Authpage() {
  const [isSignup, setIsSignup] = useState(true);
  const router = useRouter();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="flex min-h-screen mt-7">
      <div className="w-full max-w-3xl mx-auto flex flex-col lg:flex-row p-5">
        <div>
          <div
            className="mb-8 lg: mb-12 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="text-gray-500 w-9 h-6 sm: h-8 w-8 border-2 rounded-full p-1" />
          </div>
          {/* form header */}
          <div>
            <h2
              className=" text-3xl sm: text-4xl lg: text-5xl font-bold mb-4
           sm: mb-6 bg-gradient-to-r from-blue-800 via-purple-700
           to-purple-600 bg-clip-text text-transparent pb-3"
            >
              {isSignup ? "sign up" : "sign in"}
            </h2>
            <p className="text-base sm: text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8">
              {isSignup
                ? "Join Glowmart today and enjoy exclusive deals on your favorite products"
                : " welcome back to Glowmart! login to continue your shopping experience "}
            </p>
          </div>
          {/* Toogle form */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center">
            <p className=" text-base sm:text-lg lg:text-xl ">
              {isSignup ? "Already a member" : "Don't have an acount?"}
            </p>
            <Button
              variant="link"
              className="text-lg sm:text-xl lg:text-2xl text-gray-500 cursor-pointer"
              onClick={toggleForm}
            >
              {isSignup ? "sign up" : "sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
