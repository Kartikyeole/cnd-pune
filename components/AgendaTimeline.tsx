"use client";

import React, { useState } from "react";

interface Session {
  time: string;
  title: string;
  speaker: string;
  role: string;
  track: "all" | "track-a" | "track-b";
  description: string;
  tags: string[];
}

const agendaData: Session[] = [
  {
    time: "09:00 AM - 09:30 AM",
    title: "Registration & Welcome Refreshments",
    speaker: "CND Organizers",
    role: "Registration Desk",
    track: "all",
    description: "Pick up your CND Pune badge, grab your exclusive attendee swag kit, and network with early arrivals.",
    tags: ["Networking", "Welcome"],
  },
  {
    time: "09:30 AM - 10:15 AM",
    title: "Keynote: The Sovereign Cloud Era & Next-Gen Cloud Orchestration",
    speaker: "Dr. Ananya Sen",
    role: "VP of Developer Ecosystem at Vultr",
    track: "all",
    description: "An overview of container infrastructure evolution, AI workloads at the edge, and how sovereign clouds are reshaping deployment paradigms globally in 2026.",
    tags: ["Keynote", "Future Trends", "AI/ML"],
  },
  {
    time: "10:15 AM - 11:00 AM",
    title: "Orchestrating High-Performance GPU Workloads on Kubernetes",
    speaker: "Rohan Deshmukh",
    role: "Principal Infrastructure Architect",
    track: "track-a",
    description: "Deep-dive into scheduling, sharing, and optimizing GPU resources on bare-metal Kubernetes nodes to power large language models (LLMs).",
    tags: ["Kubernetes", "GPU", "Scale"],
  },
  {
    time: "10:15 AM - 11:00 AM",
    title: "Next-Gen GitOps: Declarative Deployments Beyond Yaml",
    speaker: "Sneha Nair",
    role: "Lead Platform Engineer at TechLabs",
    track: "track-b",
    description: "Moving from static manifest repos to dynamic GitOps controllers. Using Pulumi, Crossplane, and ArgoCD to manage multi-cloud infrastructure.",
    tags: ["GitOps", "ArgoCD", "Crossplane"],
  },
  {
    time: "11:00 AM - 11:30 AM",
    title: "Networking Break & Tech Demos",
    speaker: "Vultr Team",
    role: "Exhibition Hall",
    track: "all",
    description: "Grab a cup of hot Pune chai and head to the sponsor booths. View live demos of high-performance Vultr instances and cloud native toolkits.",
    tags: ["Break", "Demos"],
  },
  {
    time: "11:30 AM - 12:15 PM",
    title: "Securing the Supply Chain: From Code Commit to Container Runtime",
    speaker: "Vikram Malhotra",
    role: "DevSecOps Specialist",
    track: "track-a",
    description: "Learn how to establish trust bounds using Cosign, sign container images, scan dependencies, and enforce runtime security policies in Kubernetes.",
    tags: ["Security", "Supply Chain", "eBPF"],
  },
  {
    time: "11:30 AM - 12:15 PM",
    title: "Serverless at Edge: Deploying Ultra-Low-Latency APIs",
    speaker: "Priya Sharma",
    role: "Senior Cloud Engineer",
    track: "track-b",
    description: "How edge functions and serverless databases can cooperate to achieve sub-10ms response times for modern API servers globally.",
    tags: ["Serverless", "Edge Computing", "APIs"],
  },
  {
    time: "12:15 PM - 01:00 PM",
    title: "Deep Observability: Tracking Microservices using OpenTelemetry",
    speaker: "Amit Verma",
    role: "Observability Engineer at LogScale",
    track: "track-a",
    description: "Leveraging eBPF and OpenTelemetry auto-instrumentation to gather metrics, traces, and logs without code changes. Visualizing bottleneck paths.",
    tags: ["OpenTelemetry", "Observability", "eBPF"],
  },
  {
    time: "12:15 PM - 01:00 PM",
    title: "FinOps Practices: Cutting Cloud Spend by 40% with Intelligent Autoscale",
    speaker: "Nikhil Joshi",
    role: "Director of Infrastructure Operations",
    track: "track-b",
    description: "A case study of dynamically rightsizing Kubernetes clusters based on historical request footprints, spot instances, and smart auto-scaling.",
    tags: ["FinOps", "Cost Control", "Scaling"],
  },
  {
    time: "01:00 PM - 02:00 PM",
    title: "Networking Lunch Sponsored by Vultr",
    speaker: "Catering Lounge",
    role: "Food Court",
    track: "all",
    description: "Indulge in a premium buffet lunch featuring local Maharashtrian delicacies and global cuisines. Connect with speakers and peers.",
    tags: ["Lunch", "Networking"],
  },
  {
    time: "02:00 PM - 02:45 PM",
    title: "Panel: What Lies Beyond Kubernetes? The Future of Cloud Native",
    speaker: "Mod: Dr. Sen, Vikram Malhotra, Sneha Nair, Nikhil Joshi",
    role: "Panelists",
    track: "all",
    description: "A lively debate on the future of platform abstraction layers, WebAssembly (Wasm) in serverless environments, and the implications of edge AI computing.",
    tags: ["Panel Discussion", "Wasm", "Future Tech"],
  },
  {
    time: "02:45 PM - 03:30 PM",
    title: "Running Stateful Databases in Containers: Myth vs. Reality",
    speaker: "Ramesh Kulkarni",
    role: "Database Reliability Architect",
    track: "track-a",
    description: "Best practices for deploying Postgres, MySQL, and vector search indices inside Kubernetes using operators, persistent volumes, and backups.",
    tags: ["Databases", "Operators", "Storage"],
  },
  {
    time: "02:45 PM - 03:30 PM",
    title: "Sustainable Software: Reducing the Carbon Footprint of Your Microservices",
    speaker: "Meera Deshpande",
    role: "Green-Tech Advocate",
    track: "track-b",
    description: "Measuring carbon equivalents of compute workloads. Strategies to optimize code paths, database querying, and region selection to support Green IT initiatives.",
    tags: ["Green Computing", "Sustainability", "Metrics"],
  },
  {
    time: "03:30 PM - 04:00 PM",
    title: "Evening High-Tea & Swag Bazaar",
    speaker: "CND Organizers",
    role: "Exhibition Space",
    track: "all",
    description: "Grab a snack, finalize your sticker collection, visit vendor booths, and prep for the final high-energy hands-on lab.",
    tags: ["Chai & Snacks", "Swag"],
  },
  {
    time: "04:00 PM - 05:00 PM",
    title: "Hands-on Workshop: Scaling Multi-Cloud Apps in Minutes using Vultr Kubernetes",
    speaker: "Vultr Technical Architects",
    role: "Interactive Lab",
    track: "all",
    description: "A live, interactive session. Bring your laptops! Spin up a Vultr Kubernetes Engine (VKE) cluster, deploy an app with global load balancers, and set up automatic SSL.",
    tags: ["Hands-on Lab", "Vultr Engine", "Live Workshop"],
  },
  {
    time: "05:00 PM - 05:30 PM",
    title: "Closing Keynote, Feedback & Grand Prize Raffles",
    speaker: "CND Pune Crew",
    role: "Main Stage",
    track: "all",
    description: "Closing remarks, thanking our hosts and sponsors, collection of feedback surveys, and announcing winners for VR headsets, tech devices, and cloud credits.",
    tags: ["Closing", "Raffle", "Prizes"],
  },
];

export default function AgendaTimeline() {
  const [activeTrack, setActiveTrack] = useState<"all" | "track-a" | "track-b">("all");

  const filteredSessions = agendaData.filter(
    (s) => activeTrack === "all" || s.track === "all" || s.track === activeTrack
  );

  return (
    <div className="w-full">
      {/* Track Selectors */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        <button
          onClick={() => setActiveTrack("all")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer ${
            activeTrack === "all"
              ? "bg-slate-800 text-white border-slate-700 shadow-lg dark:bg-slate-100 dark:text-slate-900 dark:border-slate-300"
              : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-100"
          }`}
        >
          All Sessions
        </button>
        <button
          onClick={() => setActiveTrack("track-a")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer ${
            activeTrack === "track-a"
              ? "bg-cnd-sky text-cnd-indigo border-cnd-sky shadow-lg shadow-cnd-sky/10 dark:bg-cnd-sky dark:border-cnd-sky"
              : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-100"
          }`}
        >
          Track A: Containers & Orchestration
        </button>
        <button
          onClick={() => setActiveTrack("track-b")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer ${
            activeTrack === "track-b"
              ? "bg-cnd-blue text-white border-cnd-blue shadow-lg shadow-cnd-blue/10 dark:bg-cnd-blue dark:border-cnd-blue"
              : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-100"
          }`}
        >
          Track B: Platform & Serverless
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-slate-200 dark:border-slate-700 max-w-4xl mx-auto pl-6 md:pl-10 space-y-12">
        {/* Glow Line effect */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-slate-400 via-cnd-sky to-cnd-blue opacity-60 pointer-events-none" />

        {filteredSessions.map((session, index) => {
          let trackBadge = null;
          let nodeGlowColor = "bg-slate-400 ring-slate-400/20";
          
          if (session.track === "track-a") {
            trackBadge = (
              <span className="text-[10px] tracking-wider uppercase bg-cnd-light text-cnd-sky border border-cnd-sky/20 px-2 py-0.5 rounded font-mono font-bold dark:bg-cnd-indigo dark:text-cnd-sky dark:border-cnd-sky/50">
                Track A
              </span>
            );
            nodeGlowColor = "bg-cnd-sky ring-cnd-sky/20";
          } else if (session.track === "track-b") {
            trackBadge = (
              <span className="text-[10px] tracking-wider uppercase bg-cnd-light text-cnd-blue border border-cnd-blue/20 px-2 py-0.5 rounded font-mono font-bold dark:bg-cnd-indigo dark:text-cnd-blue dark:border-cnd-blue/50">
                Track B
              </span>
            );
            nodeGlowColor = "bg-cnd-blue ring-cnd-blue/20";
          } else {
            trackBadge = (
              <span className="text-[10px] tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-mono font-semibold dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600">
                General
              </span>
            );
            nodeGlowColor = "bg-slate-400 ring-slate-400/20";
          }

          return (
            <div
              key={index}
              className="relative group transition-all duration-300"
            >
              {/* Timeline circle node */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-4 border-[#F8FAFC] dark:border-slate-900 ${nodeGlowColor} ring-4 transition-all duration-300 group-hover:scale-125`}
              />

              {/* Box Content */}
              <div className="p-6 md:p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cnd-sky/60 hover:bg-white dark:bg-slate-800/80 dark:border-slate-700/80 dark:hover:bg-slate-800 dark:hover:border-cnd-sky/60 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-sm font-mono text-cnd-sky dark:text-cnd-sky font-semibold tracking-wide">
                    {session.time}
                  </span>
                  <div className="flex items-center gap-2">{trackBadge}</div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-cnd-sky dark:text-slate-100 dark:group-hover:text-cnd-sky transition-colors duration-200">
                  {session.title}
                </h3>

                {session.speaker && (
                  <div className="mt-2 text-sm text-slate-700 dark:text-slate-300 flex flex-wrap items-center gap-x-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{session.speaker}</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{session.role}</span>
                  </div>
                )}

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {session.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {session.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-200/65 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600/50 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
