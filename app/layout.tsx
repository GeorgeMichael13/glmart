"use client";

import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // hide Navbar & Footer only on auth routes
  const hideNavAndFooter =
    pathname === "/auth" || pathname === "/auth/forgetpassword";

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {!hideNavAndFooter && <Navbar />}
              <main className="flex-1">{children}</main>
              {!hideNavAndFooter && <Footer />}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
