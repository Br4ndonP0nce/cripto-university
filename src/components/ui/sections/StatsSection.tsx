// components/sections/StatsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";

interface Stat {
  stat: string;
  label: string;
  icon: LucideIcon;
}

interface StatsSectionProps {
  title: string;
  subtitle: string;
  stats: Stat[];
  backgroundColor?: string;
  textColor?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  title,
  subtitle,
  stats,
  backgroundColor = "bg-slate-900",
  textColor = "text-white",
}) => {
  return (
    <Section className={`py-24 ${backgroundColor} ${textColor}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-slate-300">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-amber-400 mb-4 flex justify-center">
                <metric.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold mb-3">
                {metric.stat}
              </div>
              <div className="text-slate-300 text-lg">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
