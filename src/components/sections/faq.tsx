"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { faqItems } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Preguntas Frecuentes"
          title="Resolvemos tus dudas"
          description="Todo lo que necesitas saber antes de contratar tu página web."
        />

        <Reveal effect="slide-up" delay={0.1} className="mt-16">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqItems.map((faq, idx) => (
              <AccordionItem key={faq.question} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
