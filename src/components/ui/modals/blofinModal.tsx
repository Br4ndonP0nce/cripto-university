"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";

interface BlofinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlofinModal: React.FC<BlofinModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-black border border-white/20 rounded-2xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dark Dotted Grid Background */}
              <div
                className="absolute inset-0 z-0 rounded-2xl"
                style={{
                  background: "#000000",
                  backgroundImage: `
                    radial-gradient(circle, rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)
                  `,
                  backgroundSize: "25px 25px",
                }}
              />

              {/* Content */}
              <div className="relative z-20 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">
                    ¿Qué es Blofin?
                  </h2>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong className="text-white">Blofin</strong> es una
                    plataforma de trading regulada y segura. La necesitamos para
                    verificar tu compromiso con el aprendizaje.
                  </p>

                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold text-sm">
                        Completamente transparente:
                      </span>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• No nos pagas nada directamente</li>
                      <li>• Solo activas tu cuenta personal</li>
                      <li>
                        • Inversión mínima:{" "}
                        <strong className="text-blue-400">S/.100 / $30</strong>
                      </li>
                      <li>• Tus fondos quedan en tu cuenta</li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 pt-2">
                    <Link href="/join" className="flex-1">
                      <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-sm rounded-xl"
                      >
                        Crear cuenta →
                      </motion.button>
                    </Link>

                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-3 bg-white/10 border border-white/20 text-white text-sm rounded-xl"
                    >
                      Entendido
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlofinModal;
