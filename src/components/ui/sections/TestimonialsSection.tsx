// components/sections/TestimonialsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Section } from "@/components/ui/Section";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  backgroundColor?: string;
  textColor?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  backgroundColor = "bg-slate-800",
  textColor = "text-white",
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`${backgroundColor} border border-slate-700 rounded-xl p-8`}
        >
          <div className="flex mb-4">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
            ))}
          </div>
          <p className="text-slate-300 text-lg mb-6 italic leading-relaxed">
            "{testimonial.quote}"
          </p>
          <div>
            <div className="font-bold text-white text-lg">
              {testimonial.name}
            </div>
            <div className="text-amber-400">{testimonial.role}</div>
            <div className="text-slate-400 text-sm">{testimonial.company}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
