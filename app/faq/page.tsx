"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/faq-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            We’ve compiled answers to common questions. Can’t find yours? Reach
            out through our contact page.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">What makes your products different?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              We source responsibly and ensure that every product meets our high
              quality standards. Unlike mass-produced goods, our items are crafted
              with care and built to last.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Do you offer returns?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              Yes, we have a hassle-free return policy. If you are not satisfied
              with your order, you can return it within 14 days for a full refund
              or exchange.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">How long is delivery?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              Standard delivery usually takes 3–5 business days. Express options
              are available depending on your location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl">Do you ship internationally?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              Absolutely! We deliver worldwide. Shipping times and costs vary by
              country, but we ensure safe and reliable delivery everywhere.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl">Are your products eco-friendly?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              Yes, sustainability is a core value for us. Many of our products are
              made using eco-conscious materials and ethical practices.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-xl">How can I track my order?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              Once your order ships, you will receive a confirmation email with a
              tracking number. You can use this to monitor your shipment in real
              time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-xl">Do you offer gift wrapping?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              Yes! We provide premium gift-wrapping options at checkout to make
              your purchase extra special for your loved ones.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-xl">How can I contact customer support?</AccordionTrigger>
            <AccordionContent className="text-xl text-gray-700">
              You can reach us through our contact form, email, or phone. Our
              support team is available Monday to Friday, 9 AM – 6 PM (local time).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
