import React from "react";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";

export function SponsorSection() {
  return (
    <section id="vultr-cloud" className="border-t border-b border-slate-200 bg-slate-50 dark:bg-slate-800/50 py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text details */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-cnd-light dark:bg-cnd-indigo/50 border border-cnd-blue/20 text-xs font-mono text-cnd-blue font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Title Partner</span>
              </div>
              <div className="bg-cnd-blue dark:bg-cnd-indigo py-1.5 px-3 rounded-lg flex items-center shadow-md border border-cnd-blue">
                <Image
                  src="/vultr-logo-rec-white.png"
                  alt="Vultr Sponsor"
                  width={80}
                  height={22}
                  className="h-5 w-auto object-contain dark:hidden"
                />
                <Image
                  src="/vultr-logo-rec-dark.png"
                  alt="Vultr Sponsor"
                  width={80}
                  height={22}
                  className="h-5 w-auto object-contain hidden dark:block"
                />
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              High-Performance Compute Engine by Vultr
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
              Vultr is the world's largest independent cloud provider, delivering optimized container compute nodes, bare-metal GPU clusters, and managed databases across 32 globally-dispersed data centers.
            </p>

            {/* Vultr features */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cnd-light flex items-center justify-center text-cnd-blue text-xs mt-0.5 font-bold font-mono">1</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Vultr Kubernetes Engine (VKE)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">CNC-certified, fully managed cluster setup with integrated storage volumes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cnd-light flex items-center justify-center text-cnd-blue text-xs mt-0.5 font-bold font-mono">2</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">NVIDIA Tensor Core GPU Hosting</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Instantly provision H100, A100, and L4 GPUs for low-latency machine learning pipelines.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cnd-light flex items-center justify-center text-cnd-blue text-xs mt-0.5 font-bold font-mono">3</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Low-Latency Indian Edges</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Highly optimized fiber routing with server locations in Mumbai, Bangalore, and Delhi NCR.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://www.vultr.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cnd-blue hover:bg-cnd-light dark:bg-cnd-indigo/50 hover:text-cnd-blue text-white text-sm font-semibold border border-cnd-blue transition-colors cursor-pointer"
              >
                <span>Discover Vultr Cloud</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Simulated UI / Console Showcase */}
          <div className="rounded-3xl p-1 bg-gradient-to-br from-slate-200 to-slate-300 border border-slate-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />
            <div className="bg-[#0e1726] rounded-[20px] p-6 space-y-6">

              {/* Console header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">vke-provisioner.sh</span>
                </div>
                <span className="text-[10px] font-mono bg-cnd-indigo text-cnd-cyan px-2 py-0.5 rounded border border-cnd-cyan/20">VKE-API v2.4</span>
              </div>

              {/* Console contents */}
              <div className="font-mono text-xs space-y-3.5 text-slate-300">
                <p className="text-slate-500"># Initializing cluster deployment on Vultr...</p>
                <p className="flex items-center gap-2">
                  <span className="text-cnd-cyan">$&gt;</span>
                  <span>vultr-cli container clusters create --name cnd-pune-vke --region bom --version v1.30.0</span>
                </p>
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-900 text-[11px] space-y-1.5">
                  <p className="text-green-400">✔ Connecting to Vultr Control Plane... [OK]</p>
                  <p className="text-green-400">✔ Allocating 3x compute instances (VC2 4C-8GB) ... [OK]</p>
                  <p className="text-green-400">✔ Binding high-speed block volumes ... [OK]</p>
                  <p className="text-yellow-400">⚠ Injecting custom CNI policies (Cilium)... [PENDING]</p>
                </div>
                <p className="flex items-center gap-2">
                  <span className="text-cnd-cyan">$&gt;</span>
                  <span>kubectl get nodes -o wide</span>
                </p>
                <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-900 text-[10px] space-y-1 leading-normal overflow-x-auto text-slate-400">
                  <p className="font-bold text-slate-300">NAME             STATUS   ROLES    AGE   VERSION   EXTERNAL-IP</p>
                  <p>vke-node-101     Ready    worker   2m    v1.30.0   139.180.128.44</p>
                  <p>vke-node-102     Ready    worker   2m    v1.30.0   139.180.128.45</p>
                  <p>vke-node-103     Ready    worker   2m    v1.30.0   139.180.128.46</p>
                </div>
              </div>

              {/* Vultr Replica sponsor card */}
              <div className="p-4 rounded-xl bg-white/10 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/vultr-logo-rec-white.png"
                    alt="Vultr Logo"
                    width={90}
                    height={25}
                    className="h-6 w-auto object-contain"
                  />
                  <div>
                    <p className="text-[10px] text-slate-400">Event Title Sponsor</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-cnd-cyan block font-semibold">BOM-MUMBAI</span>
                  <span className="text-[9px] text-slate-500 font-mono block">Node active</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
