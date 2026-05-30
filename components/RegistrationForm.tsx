"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Calendar, MapPin, Award } from "lucide-react";

type TicketTier = "free" | "vip" | "workshop";

interface TicketDetails {
  name: string;
  price: string;
  benefits: string[];
  description: string;
}

const ticketTiers: Record<TicketTier, TicketDetails> = {
  free: {
    name: "General Admission",
    price: "Free",
    description: "Access to all keynotes, breakout talks, and the exhibition area.",
    benefits: [
      "Access to all sessions & panels",
      "Event swag kit (Stickers & Notebook)",
      "Buffet lunch & networking breaks",
      "Digital participation certificate",
    ],
  },
  workshop: {
    name: "Workshop Pass",
    price: "INR 499",
    description: "General Admission benefits PLUS guaranteed entry into the live hands-on labs.",
    benefits: [
      "Everything in General Admission",
      "Guaranteed seat in the Vultr Live Lab",
      "INR 1,000 Vultr Cloud Credits",
      "Special workshop badge & sticker pack",
      "Direct Q&A with workshop mentors",
    ],
  },
  vip: {
    name: "VIP All-Access Pass",
    price: "INR 1,299",
    description: "Exclusive access to speakers, VIP seating, and premium merchandise.",
    benefits: [
      "Everything in Workshop Pass",
      "Exclusive VIP Speaker Lounge access",
      "Limited edition CND Pune 2026 hoodie",
      "Reserved seating in front-row tracks",
      "Premium 1-on-1 career mentorship circle",
    ],
  },
};

export default function RegistrationForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTier, setSelectedTier] = useState<TicketTier>("free");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    company: "",
    github: "",
    diet: "none",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.title.trim()) newErrors.title = "Job title/student status is required";
    if (!formData.company.trim()) newErrors.company = "Company/institution is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateForm()) {
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const [ticketNumber, setTicketNumber] = useState<string>("");

  useEffect(() => {
    setTicketNumber("CND-2026-" + Math.floor(100000 + Math.random() * 900000));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-1 rounded-3xl bg-gradient-to-br from-cnd-blue/10 via-slate-50/50 to-cnd-indigo/10 shadow-xl backdrop-blur-xl border border-slate-200/80">
      <div className="p-6 md:p-10 rounded-[22px] bg-white">
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-10">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
              step >= 1 ? "bg-cnd-sky text-cnd-indigo shadow-md shadow-cnd-sky/50" : "bg-slate-150 text-slate-400"
            }`}>
              1
            </div>
            <span className="text-[11px] mt-2 font-semibold text-slate-500 font-mono uppercase tracking-wider">Ticket</span>
          </div>
          <div className={`flex-1 h-[2px] mx-2 ${step >= 2 ? "bg-cnd-sky" : "bg-slate-150"}`} />
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
              step >= 2 ? "bg-cnd-sky text-cnd-indigo shadow-md shadow-cnd-sky/50" : "bg-slate-150 text-slate-400"
            }`}>
              2
            </div>
            <span className="text-[11px] mt-2 font-semibold text-slate-500 font-mono uppercase tracking-wider">Details</span>
          </div>
          <div className={`flex-1 h-[2px] mx-2 ${step >= 3 ? "bg-cnd-sky" : "bg-slate-150"}`} />
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
              step >= 3 ? "bg-green-500 text-white shadow-[0_0_8px_rgba(34,197,94,0.3)]" : "bg-slate-150 text-slate-400"
            }`}>
              3
            </div>
            <span className="text-[11px] mt-2 font-semibold text-slate-500 font-mono uppercase tracking-wider">Pass</span>
          </div>
        </div>

        {/* Step 1: Select Ticket Tier */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Choose Your Access Pass</h3>
              <p className="text-sm text-slate-500 mt-2">All tiers include access to high-quality networking and delicious buffet food!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(ticketTiers) as TicketTier[]).map((tier) => {
                const isSelected = selectedTier === tier;
                const details = ticketTiers[tier];
                
                return (
                  <div
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`relative p-6 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                      isSelected
                        ? "bg-cnd-light/50 border-cnd-sky shadow-md shadow-cnd-sky/10"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cnd-sky text-cnd-indigo text-[10px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-full shadow-md shadow-cnd-sky/50">
                        Selected
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mt-1">{details.name}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 h-10">{details.description}</p>
                      
                      <div className="my-5 flex items-baseline">
                        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{details.price}</span>
                        {tier !== "free" && <span className="text-xs text-slate-450 ml-1">/ seat</span>}
                      </div>

                      <div className="h-px bg-slate-200/60 my-4" />
                      
                      <ul className="space-y-2.5">
                        {details.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cnd-sky mt-0.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all duration-200 uppercase cursor-pointer ${
                          isSelected
                            ? "bg-cnd-sky text-cnd-indigo"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Select Option
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-cnd-blue hover:bg-cnd-light text-white hover:text-cnd-blue text-sm font-semibold border border-cnd-blue shadow-md shadow-cnd-blue/10 cursor-pointer transition-colors"
              >
                Continue to Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Registrant Info */}
        {step === 2 && (
          <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Attendee Information</h3>
              <p className="text-sm text-slate-500 mt-2">
                Registering for <span className="text-cnd-sky font-semibold">{ticketTiers[selectedTier].name}</span>
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Kartik Yeole"
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-all duration-200 ${
                    errors.name ? "border-red-500" : "border-slate-200 focus:border-cnd-sky focus:ring-1 focus:ring-cnd-sky"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. name@company.com"
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-all duration-200 ${
                    errors.email ? "border-red-500" : "border-slate-200 focus:border-cnd-sky focus:ring-1 focus:ring-cnd-sky"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Job Title / Student</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. DevOps Engineer"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-all duration-200 ${
                      errors.title ? "border-red-500" : "border-slate-200 focus:border-cnd-sky"
                    }`}
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Company / College</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-all duration-200 ${
                      errors.company ? "border-red-500" : "border-slate-200 focus:border-cnd-sky"
                    }`}
                  />
                  {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">GitHub Username (Optional)</label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="e.g. githubusername"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-cnd-sky transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Dietary Preference</label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-cnd-sky transition-all duration-200"
                >
                  <option value="none">No preference</option>
                  <option value="veg">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="halal">Halal</option>
                  <option value="jain">Jain Food</option>
                </select>
              </div>
            </form>

            <div className="flex justify-between items-center pt-6">
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-xl text-slate-500 border border-slate-200 hover:text-slate-800 hover:bg-slate-50 cursor-pointer transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-cnd-blue hover:bg-cnd-light text-white hover:text-cnd-blue text-sm font-bold border border-cnd-blue shadow-lg shadow-cnd-blue/10 cursor-pointer transition-all duration-200"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success ticket */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-300 flex items-center justify-center mx-auto mb-4 text-green-600 shadow-[0_4px_12px_rgba(34,197,94,0.1)]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">You're Registered!</h3>
              <p className="text-sm text-slate-500 mt-2">
                We've sent your entry pass and session joining details to <span className="text-cnd-sky font-semibold">{formData.email}</span>.
              </p>
            </div>

            {/* Simulated Event Ticket */}
            <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-br from-white to-cnd-light/50 border border-slate-200 overflow-hidden shadow-xl relative">
              
              {/* Ticket Top accent */}
              <div className="bg-gradient-to-r from-cnd-blue via-cnd-sky to-cnd-indigo h-2 w-full" />
              
              <div className="p-6 md:p-8 space-y-6 text-left">
                {/* Logo & Ticket ID */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/CND_logo.png"
                      alt="CND Logo"
                      width={80}
                      height={22}
                      className="h-5 w-auto object-contain object-left shrink-0"
                    />
                    <div>
                      <h4 className="text-[10px] font-mono text-cnd-blue uppercase tracking-wider font-bold">Cloud Native Day</h4>
                      <p className="text-[8px] text-slate-500 font-semibold uppercase leading-none mt-0.5">PUNE 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded">
                    {ticketNumber}
                  </span>
                </div>

                {/* Event Name */}
                <div className="border-t border-slate-200/80 pt-4">
                  <h3 className="text-xl font-bold text-slate-900">{ticketTiers[selectedTier].name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Presented in association with Vultr</p>
                </div>

                {/* Attendee Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Attendee</span>
                    <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Company / College</span>
                    <p className="text-sm font-bold text-slate-700 truncate mt-0.5">{formData.company}</p>
                  </div>
                </div>

                {/* Event Venue and Date */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cnd-sky mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold block">Date</span>
                      <span className="text-xs text-slate-700 font-medium">May 30, 2026</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cnd-sky mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold block">Venue</span>
                      <span className="text-xs text-slate-700 font-medium">Hotel Westin, Pune</span>
                    </div>
                  </div>
                </div>

                {/* Ticket separation cutouts */}
                <div className="absolute left-0 top-[60%] -translate-y-1/2 w-4 h-8 bg-[#F8FAFC] rounded-r-full border-r border-slate-200 -ml-2" />
                <div className="absolute right-0 top-[60%] -translate-y-1/2 w-4 h-8 bg-[#F8FAFC] rounded-l-full border-l border-slate-200 -mr-2" />

                {/* QR code and Barcode simulator */}
                <div className="border-t border-dashed border-slate-200/80 pt-5 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    {/* Simulated barcode */}
                    <div className="h-10 bg-slate-50 border border-slate-200/80 flex items-center justify-around px-2 py-1 rounded">
                      {[2, 4, 1, 3, 2, 5, 2, 4, 2, 1, 3, 4, 2, 5, 1, 3, 2].map((w, idx) => (
                        <div key={idx} className="bg-slate-800 h-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded shrink-0 border border-slate-200 flex items-center justify-center">
                    {/* Simulated QR Code grid */}
                    <div className="grid grid-cols-4 gap-0.5 w-full h-full">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-full h-full ${
                            (idx * 7 + 11) % 3 === 0 || idx === 0 || idx === 3 || idx === 12 || idx === 15 || idx === 5 || idx === 10
                              ? "bg-black"
                              : "bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                Print Ticket
              </button>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-xl bg-cnd-light hover:bg-cnd-light/80 text-cnd-blue text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                Register Another Seat
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
