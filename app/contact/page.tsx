"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/contact-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Have questions, feedback, or ideas? We’d love to hear from you. Reach out today!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Fill out the form below and our team will get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <Input type="text" placeholder="Your Name" className="text-xl py-6" />
            <Input type="email" placeholder="Your Email" className="text-xl py-6" />
            <Textarea placeholder="Your Message" className="text-xl h-40 py-4" />
            <Button className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-300 text-white rounded-xl shadow-md hover:opacity-90 transition">
              Send Message
            </Button>
          </form>
        </div>

        {/* Map */}
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509879!2d144.95373631550446!3d-37.8162797420211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3f9d07f%3A0x5045675218ceed30!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1614841787913!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
