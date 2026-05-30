"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Cloud Native Day Pune 2026?",
      a: "Cloud Native Day Pune is a community-driven developer conference focused on Kubernetes, platform engineering, containers, and developer infrastructure. It brings together practitioners, cloud providers, and open-source contributors for a full day of sharing production-grade lessons."
    },
    {
      q: "Who is presenting the event?",
      a: "The event is presented in association with Vultr, the global cloud hosting platform, who is providing high-performance GPU nodes, cloud credits, and supporting the community in hosting this premium developer summit."
    },
    {
      q: "Is there a registration fee?",
      a: "We offer multiple tiers! General Admission is free but requires registration approval. Workshop and VIP tickets have a small nominal charge to cover exclusive merchandise (like the CND hoodie), dedicated seats in labs, and Vultr cloud credits."
    },
    {
      q: "How can I participate as a speaker (CFP)?",
      a: "Our CFP (Call for Papers) is open until June 10, 2026! We accept proposals for 30-minute talks and 60-minute hands-on workshops. Click the 'Submit CFP' button in the hero section to submit your proposal."
    },
    {
      q: "Will food and swag be provided?",
      a: "Yes! All registered attendees receive a high-quality CND Pune swag kit (t-shirts, stickers, notebook). A premium lunch buffet, morning tea/coffee, and evening snacks are fully covered for all ticket tiers."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 pb-24 relative z-10">

      <SectionHeader 
        subtitle="FAQ Directory" 
        title="Frequently Asked Questions" 
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-sm dark:shadow-none"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 transition-all duration-150 cursor-pointer"
              >
                <span className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-cnd-blue" : ""
                  }`} />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-700" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
              >
                <div className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50/50">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
