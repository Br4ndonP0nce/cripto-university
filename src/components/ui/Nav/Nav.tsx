// src/components/sections/navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#" },
  { name: "Join", href: "#" },
];

interface NavbarProps {
  logo?: string;
  logoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo = "CA",
  logoUrl = "/",
  ctaText = "Unete Ahora",
  ctaHref = "/join",
  onCtaClick,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          // Always use floating nav styles
          "fixed top-0 left-0 right-0 z-50 mt-4 mx-4 md:mx-8",
          "floating-nav px-6 py-4",
          "bg-black/80 backdrop-blur-xl border border-white/10",
          "rounded-2xl shadow-2xl shadow-black/20",
          className
        )}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href={logoUrl} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Image
                src="/image/Logos/navLogo.png"
                alt="Crypto University"
                width={40}
                height={40}
                className="h-auto"
                priority
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-aleo transition-all duration-200",
                    "text-gray-300 hover:text-white",
                    "rounded-lg hover:bg-white/5",
                    "group"
                  )}
                >
                  {item.name}
                  {/* Hover underline effect */}
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-orange-400 to-orange-600"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="ml-4"
            >
              <Button
                onClick={onCtaClick}
                asChild={!onCtaClick}
                className={cn(
                  "bg-gradient-to-r from-orange-500 to-orange-600 font-aleo",
                  "hover:from-orange-600 hover:to-orange-700",
                  "text-white font-semibold px-6 py-2",
                  "rounded-lg shadow-lg shadow-orange-500/25",
                  "transition-all duration-200",
                  "hover:scale-105 hover:shadow-orange-500/40"
                )}
              >
                {onCtaClick ? (
                  <span>{ctaText}</span>
                ) : (
                  <Link href={ctaHref}>{ctaText}</Link>
                )}
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 border-t border-white/10 mt-4">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 text-base font-medium",
                          "text-gray-300 hover:text-white hover:bg-white/5",
                          "rounded-lg transition-all duration-200"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="pt-4"
                  >
                    <Button
                      onClick={handleCtaClick}
                      asChild={!onCtaClick}
                      className={cn(
                        "w-full bg-gradient-to-r from-orange-500 to-orange-600",
                        "hover:from-orange-600 hover:to-orange-700",
                        "text-white font-semibold py-3",
                        "rounded-lg shadow-lg shadow-orange-500/25",
                        "transition-all duration-200"
                      )}
                    >
                      {onCtaClick ? (
                        <span>{ctaText}</span>
                      ) : (
                        <Link href={ctaHref}>{ctaText}</Link>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
