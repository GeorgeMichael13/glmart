"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseclient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Check your inbox.");
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
            className="mb-8 cursor-pointer"
            onClick={() => router.push("/auth")}
          >
            <ChevronLeft className="text-gray-500 w-9 h-6 sm:h-8 w-8 border-2 rounded-full p-1" />
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 
              bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 
              bg-clip-text text-transparent pb-3"
          >
            Forgot Password
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8">
            Enter your email and we’ll send you a reset link.
          </p>

          <Input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}

          <Button
            className="w-full mb-6 mt-6"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </div>
    </div>
  );
}
