"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300 mb-4">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            More than just a store—we’re a community built on passion,
            creativity, and trust.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          We started this journey with one vision in mind: to create a platform
          that goes beyond just selling products. Our brand is built on trust,
          transparency, and passion for delivering value to our customers. Every
          product on our shelves has a story, and we are here to share it with
          you.
        </p>

        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          At the core, we believe in{" "}
          <span className="font-semibold">quality over quantity</span>. We take
          pride in sourcing responsibly, supporting local creators, and ensuring
          that every purchase you make with us is worth more than its price tag.
        </p>

        <p className="text-xl text-gray-700 leading-relaxed mb-12">
          Our mission is not just to sell, but to inspire. When you shop with
          us, you’re not just buying a product—you’re becoming part of a
          community that values excellence, creativity, and connection.
        </p>

        {/* Highlight Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-3">
              Trust
            </h3>
            <p className="text-gray-700 text-lg">
              Built on honesty and transparency, we put our customers first
              every time.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-3">
              Quality
            </h3>
            <p className="text-gray-700 text-lg">
              Every product we offer is carefully chosen to meet our high
              standards.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-3">
              Community
            </h3>
            <p className="text-gray-700 text-lg">
              More than shopping—it’s about belonging to something greater.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
