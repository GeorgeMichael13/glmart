"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebaseclient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc"; // ✅ Google icon

export default function Authpage() {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError(null);
  };

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen mt-7">
      <div className="w-full max-w-3xl mx-auto flex  justify-center flex-col lg:flex-row p-5">
        <div>
          {/* Back button */}
          <div
            className="mb-8 lg:mb-12 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="text-gray-500 w-9 h-6 sm:h-8 w-8 border-2 rounded-full p-1" />
          </div>

          {/* Form header */}
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 
              bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 
              bg-clip-text text-transparent pb-3"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8">
              {isSignup
                ? "Join Glowmart today and enjoy exclusive deals on your favorite products"
                : "Welcome back to Glowmart! Login to continue your shopping experience"}
            </p>
          </div>

          {/* Email + Password + Name fields */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isSignup && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* ✅ Forgot Password (only show on Sign In) */}
          {!isSignup && (
            <p
              onClick={() => router.push("/auth/forgetpassword")}
              className="text-sm text-gray-500 cursor-pointer mb-4 hover:underline"
            >
              Forgot Password?
            </p>
          )}

          {/* Error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit button */}
          <Button
            className="w-full mb-6"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
          </Button>

          {/* ✅ Google button */}
          <Button
            className="w-full flex items-center justify-center gap-2 border"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle size={22} /> Continue with Google
          </Button>

          {/* Toggle form */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center">
            <p className="text-base sm:text-lg lg:text-xl">
              {isSignup ? "Already a member?" : "Don't have an account?"}
            </p>
            <Button
              variant="link"
              className="text-lg sm:text-xl lg:text-2xl text-gray-500 cursor-pointer"
              onClick={toggleForm}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
