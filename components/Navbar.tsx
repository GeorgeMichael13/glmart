"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseclient";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useCart();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/auth"; // redirect after logout
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full h-24 bg-white shadow-md relative">
      <div className="w-full px-6 sm:px-10 lg:px-16 mt-2">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo + bouncing balls */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex-shrink-0 flex flex-col items-center">
              <img
                src="/glowmart.png"
                alt="Glowmart Logo"
                className="h-30 w-auto"
              />
            </Link>

            {/* Three bouncing balls */}
            <div className="flex space-x-2 ml-4">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bouncing-ball"></span>
              <span
                className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bouncing-ball"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bouncing-ball"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>

          {/* Middle: Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8 font-medium text-gray-700">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <Link href="/shop" className="hover:text-purple-600">Shop</Link>
            <Link href="/about" className="hover:text-purple-600">About</Link>
            <Link href="/contact" className="hover:text-purple-600">Contact</Link>
            <Link href="/faq" className="hover:text-purple-600">FAQ</Link>
          </div>

          {/* Right: Search, Cart, User */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <Link href="/searchpage">
              <Button variant="ghost" className="cursor-pointer">
                <Search className="h-6 w-6 text-gray-600 hover:text-purple-500" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                size="lg"
                className="relative bg-transparent hover:bg-transparent cursor-pointer"
                variant="ghost"
              >
                <ShoppingCart className="h-9 w-9 text-gray-600 hover:text-purple-500" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-full"
                  >
                    <Avatar className="h-12 w-12 cursor-pointer">
                      <AvatarFallback className="bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-lg font-semibold bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-purple-800" />
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex w-full">
                      <User className="mr-3 h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-purple-800" />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <X className="mr-3 h-5 w-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-6">
                <Link href="/auth?mode=login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 py-3 text-lg bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bg-clip-text text-transparent border-2 border-gray-300 cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button
                    size="lg"
                    className="px-6 py-3 text-lg bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 text-white cursor-pointer"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="h-8 w-8 text-gray-600" />
              ) : (
                <Menu className="h-8 w-8 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (when open) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-purple-600">Home</Link>
            <Link href="/shop" className="block text-gray-700 hover:text-purple-600">Shop</Link>
            <Link href="/about" className="block text-gray-700 hover:text-purple-600">About</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-purple-600">Contact</Link>
            <Link href="/faq" className="block text-gray-700 hover:text-purple-600">FAQ</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
