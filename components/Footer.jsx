// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/glowmart.png" alt="GlowMart Logo" width={70} height={70} />
          <span className="text-xl font-semibold">GlowMart</span>
        </div>

        {/* Rights Reserved */}
        <p className="text-center text-sm">
          © {new Date().getFullYear()} GlowMart. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex flex-col md:flex-col text-center md:text-left">
          <Link href="/privacy-policy" className="hover:underline text-sm">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline text-sm mt-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
