"use client";

import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Mail,
  MessageSquare,
  Shield,
  ExternalLink,
  Heart,
  Users,
  BookOpen,
  TrendingUp,
  Youtube,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Cursos Gratuitos", href: "#" },
      { name: "Comunidad", href: "#" },
      { name: "Señales Trading", href: "#" },
      { name: "Únete Ahora", href: "/join" },
    ],
    resources: [
      { name: "Blog Cripto", href: "https://www.criptonoticias.com/" },
      {
        name: "Tutoriales",
        href: "https://www.criptonoticias.com/categorias/tutoriales-guias/",
      },
      { name: "FAQ", href: "#FAQ" },
    ],
    legal: [{ name: "Términos y Condiciones", href: "/disclaimer" }],
  };

  const socialLinks = [
    {
      name: "Discord",
      icon: MessageSquare,
      href: "https://discord.gg/criptouniversity",
      color: "text-indigo-400",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@criptouniversity",
      color: "text-red-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/criptouniversity",
      color: "text-pink-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/criptouniversity",
      color: "text-blue-400",
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 z-0 bg-black" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Image
                  src="/image/Logos/logoWhite2.png"
                  alt="Cripto University Logo"
                  width={180}
                  height={60}
                  className="w-auto h-8 object-contain"
                />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                La primera universidad cripto 100% gratuita. Aprende, invierte y
                crece con los mejores.
              </p>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Powered by
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-blue-400 font-semibold">Blofin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-2 lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Platform Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Plataforma</span>
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Recursos</span>
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Legal</span>
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Comunidad</span>
              </h3>

              <div className="space-y-3">
                <Link
                  href="mailto:hola@criptouniversity.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">hola@criptouniversity.com</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Síguenos
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center ${social.color} hover:bg-white/20 transition-all duration-200`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>
                © {currentYear} Cripto University. Todos los derechos
                reservados.
              </span>
              <Heart className="w-4 h-4 text-red-400" />
            </div>

            {/* Legal Disclaimer Link */}
            <div className="flex items-center space-x-4">
              <Link
                href="/disclaimer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 flex items-center space-x-1"
              >
                <Shield className="w-3 h-3" />
                <span>Legal / Disclaimer</span>
              </Link>
            </div>
          </div>

          {/* Quick Disclaimer */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
