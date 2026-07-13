"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

type RevealEffect = "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom";

const effects: Record<RevealEffect, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export interface RevealProps {
  children: React.ReactNode;
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "span" | "li";
}

export function Reveal({
  children,
  effect = "slide-up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={effects[effect]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  effect = "slide-up",
}: {
  children: React.ReactNode;
  className?: string;
  effect?: RevealEffect;
}) {
  return (
    <motion.div
      className={className}
      variants={effects[effect]}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
