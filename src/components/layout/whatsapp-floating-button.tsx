"use client";

import { motion } from "framer-motion";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappHref } from "@/lib/site-config";

export function WhatsappFloatingButton() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Habla con nosotros por WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 md:h-16 md:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <WhatsappIcon className="relative h-7 w-7 md:h-8 md:w-8" />
    </motion.a>
  );
}
