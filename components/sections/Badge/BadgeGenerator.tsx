"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Upload, Download, RefreshCw } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

export function BadgeGenerator() {
  // State variables for badge fields
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");

  // State variables for profile photo and its adjustments
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(120);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  // System states
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // Element references
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom Toast notification helper
  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Drag-and-drop & file upload helpers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImageSrc(event.target.result as string);
        resetPhotoSliders();
        showToast("Profile photo uploaded!");
      }
    };
    reader.onerror = () => {
      showToast("Failed to read image.", "error");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const resetPhotoSliders = () => {
    setZoom(120);
    setPosX(50);
    setPosY(50);
  };

  // Dynamic layout scaling logic to fit badge preview within container
  const scaleBadgeToFit = useCallback(() => {
    if (!previewRef.current) return;
    const containerWidth = previewRef.current.clientWidth - 48; // subtract padding
    const calculatedScale = Math.min(containerWidth / 1080, 1);
    setScale(calculatedScale);
  }, []);

  useEffect(() => {
    setMounted(true);
    scaleBadgeToFit();
    if (typeof window !== "undefined") {
      if ("ResizeObserver" in window && previewRef.current) {
        const observer = new ResizeObserver(() => scaleBadgeToFit());
        observer.observe(previewRef.current);
        return () => observer.disconnect();
      } else {
        window.addEventListener("resize", scaleBadgeToFit);
        return () => window.removeEventListener("resize", scaleBadgeToFit);
      }
    }
  }, [scaleBadgeToFit]);

  // Server-side badge downloader requesting /api/badge
  const handleDownload = useCallback(async () => {
    try {
      setIsGenerating(true);

      const response = await fetch("/api/badge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "Your Name",
          designation: designation.trim() || "Your Designation",
          company: company.trim() || "Your Company Name",
          photo: uploadedImageSrc,
          zoom,
          posX,
          posY,
        }),
      });

      if (!response.ok) {
        throw new Error("Badge generation failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `CND-Pune-Gemma4-Badge-${name.trim().replace(/\s+/g, "-").toLowerCase() || "attendee"
        }.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      showToast("Badge downloaded successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to render badge.", "error");
    } finally {
      setIsGenerating(false);
    }
  }, [name, designation, company, uploadedImageSrc, zoom, posX, posY, showToast]);



  return (
    <section id="badge" className="max-w-7xl mx-auto px-4 py-24 relative z-10">
      <SectionHeader
        subtitle="Share Your Excitement"
        title="Get Your Attendee Badge"
        lineColor="bg-cnd-light dark:bg-cnd-indigo/50"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        {/* Controls Column (Left) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-slate-100">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white font-header">Customize Your Badge</h2>
            <p className="text-xs text-slate-400 mt-1">
              Fill in your information and position your profile picture to perfection.
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                placeholder="Your Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition duration-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Designation
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  maxLength={40}
                  placeholder="Your Designation"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  maxLength={40}
                  placeholder="Your Company Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition duration-200"
                />
              </div>
            </div>

            {/* File upload drag & drop */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Profile Photo
              </label>
              <div
                id="dropzone"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 transition duration-200 cursor-pointer text-center relative ${isDragActive
                  ? "border-sky-500 bg-slate-900"
                  : "border-slate-800 hover:border-sky-500/50 bg-slate-950/50 hover:bg-slate-950"
                  }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer hidden"
                />
                <div className="space-y-1 pointer-events-none">
                  <Upload className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="text-xs text-slate-300">
                    <span className="text-sky-400 font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] text-slate-500">Supports PNG, JPG, or WEBP</p>
                </div>
              </div>
            </div>

            {/* Customizer Photo Position Sliders */}
            {uploadedImageSrc && (
              <div id="photo-adjustments" className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Align Profile Picture
                  </span>
                  <button
                    type="button"
                    onClick={resetPhotoSliders}
                    className="text-[10px] text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    Reset Position
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Zoom Scale</span>
                    <span>{zoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="300"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-sky-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Move X</span>
                      <span>{posX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={posX}
                      onChange={(e) => setPosX(Number(e.target.value))}
                      className="w-full accent-sky-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Move Y</span>
                      <span>{posY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={posY}
                      onChange={(e) => setPosY(Number(e.target.value))}
                      className="w-full accent-sky-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              type="button"
              id="btn-download"
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition duration-300 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin h-5 w-5 text-white" />
                  Generating Badge Image...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Badge (PNG)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Column (Right) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-start space-y-4">

          {/* Responsive preview container with dynamic scaling */}
          <div
            ref={previewRef}
            className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex items-center justify-center overflow-hidden"
            style={{ height: scale > 0 ? `${Math.max(500, 1080 * scale + 48)}px` : "500px" }}
          >
            {/* The scaled wrapper that bounds layout size to avoid horizontal overflow */}
            {mounted && scale > 0 && (
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  width: `${1080 * scale}px`,
                  height: `${1080 * scale}px`,
                }}
              >
                {/* THE ACTUAL BADGE CARD */}
                <div
                  id="badge-card"
                  className="w-[1080px] h-[1080px] bg-white absolute top-1/2 left-1/2 select-none"
                  style={{
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Background Blank Template from GemmaMeetup */}
                  <Image
                    src="/GemmaMeetup.png"
                    alt="Badge Template"
                    fill
                    className="object-cover z-0"
                    priority
                    unoptimized
                  />

                  {/* White Box Content Area overlay - matching Satori coordinates on the 1080x1080 canvas */}
                  <div
                    className="absolute z-10 flex flex-col items-center bg-transparent"
                    style={{
                      top: "410px",
                      left: "560px",
                      width: "700px",
                      height: "500px",
                    }}
                  >
                    {/* Photo Area with premium gradient border */}
                    <div
                      className="w-[280px] h-[285px] rounded-[24px] p-[3px] shadow-md flex-shrink-0 flex items-center justify-center"
                      style={{
                        backgroundImage: "linear-gradient(to top right, #4285f4, #ea4335, #fbbc05, #34a853)",
                      }}
                    >
                      <div className="w-full h-full bg-slate-100 rounded-[21px] overflow-hidden relative flex">
                        {uploadedImageSrc ? (
                          <div
                            className="w-full h-full bg-no-repeat"
                            style={{
                              backgroundImage: `url(${uploadedImageSrc})`,
                              backgroundSize: `${zoom}%`,
                              backgroundPosition: `${posX}% ${posY}%`,
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-200">
                            <svg className="w-10 h-10 opacity-40 mb-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase font-header">
                              YOUR PHOTO
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="mt-5 flex flex-col items-center text-center w-full">
                      <h2
                        className="font-black text-slate-900 font-header leading-tight truncate max-w-[500px]"
                        style={{
                          fontSize: "36px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {name.trim() || "Your Name"}
                      </h2>
                      <p
                        className="font-bold text-[#1a73e8] font-header tracking-wide mt-1.5 truncate max-w-[500px]"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {designation.trim() || "Your Designation"}
                      </p>
                      <p
                        className="font-semibold text-slate-500 tracking-wide mt-1 truncate max-w-[500px]"
                        style={{
                          fontSize: "18px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {company.trim() || "Your Company Name"}
                      </p>

                      {/* Classic Google Color Strip Line */}
                      <div className="flex items-center justify-center gap-0 h-[4px] w-[140px] mx-auto mt-4 rounded-full overflow-hidden">
                        <span className="w-1/4 h-full bg-[#4285f4]"></span>
                        <span className="w-1/4 h-full bg-[#ea4335]"></span>
                        <span className="w-1/4 h-full bg-[#fbbc05]"></span>
                        <span className="w-1/4 h-full bg-[#34a853]"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Toasts container */}
      <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 bg-slate-900 text-slate-100 pointer-events-auto ${toast.type === "success" ? "border-slate-800" : "border-red-900/50"
              }`}
          >
            {toast.type === "success" ? (
              <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
