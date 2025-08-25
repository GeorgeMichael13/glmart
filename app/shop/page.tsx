"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/your-hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300 mb-4">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-lg mx-auto">
            Discover the perfect blend of fashion and comfort. Every collection crafted to inspire, just for you.
          </p>
          <Button className="px-6 py-3 text-lg bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 text-white rounded-full">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Intro & Highlights */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-xl text-gray-700 leading-relaxed mb-10">
          Welcome to our shop! Every product is hand-picked to blend quality, durability, and elegance. We want shopping to feel like more than just buying—it’s an uplifting experience.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Premium Collection</CardTitle>
            </CardHeader>
            <CardContent className="text-xl text-gray-600">
              Explore timeless elegance crafted with attention to detail and designed to last.
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Affordable Finds</CardTitle>
            </CardHeader>
            <CardContent className="text-xl text-gray-600">
              Style doesn’t break the bank. Discover budget-friendly pieces perfect for every day.
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Seasonal Specials</CardTitle>
            </CardHeader>
            <CardContent className="text-xl text-gray-600">
              Stay trendy with our curated seasonal picks—always fresh, always on point.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
