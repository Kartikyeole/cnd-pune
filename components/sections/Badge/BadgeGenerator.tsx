"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { toPng } from "html-to-image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Upload, Download, RefreshCw } from "lucide-react";
import { ImageCropper } from "./ImageCropper";

export function BadgeGenerator() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [rawImageUrl, setRawImageUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRawImageUrl(url);
      setIsCropping(true);
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedUrl: string) => {
    setPhotoUrl(croppedUrl);
    setIsCropping(false);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
  };

  const handleDownload = useCallback(async () => {
    if (!badgeRef.current) return;

    try {
      setIsGenerating(true);
      // Get current width of the preview container
      const currentWidth = badgeRef.current.offsetWidth;
      // Calculate pixel ratio to upscale to exactly 1080px
      const scale = 1080 / currentWidth;

      const dataUrl = await toPng(badgeRef.current, {
        quality: 1,
        pixelRatio: scale, // ensures the output image is 1080x1080
        fontEmbedCSS: '', // Bypasses the CSSStyleSheet cssRules CORS error
      });

      const link = document.createElement("a");
      link.download = `CND-Pune-2026-Badge-${name.replace(/\s+/g, '-').toLowerCase() || 'attendee'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate badge", err);
    } finally {
      setIsGenerating(false);
    }
  }, [name]);

  return (
    <section id="badge" className="max-w-7xl mx-auto px-4 py-24 relative z-10">
      <SectionHeader
        subtitle="Share Your Excitement"
        title="Get Your Attendee Badge"
        lineColor="bg-cnd-light dark:bg-cnd-indigo/50"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="space-y-8 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Customize Your Badge</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Upload your photo and add your details to generate a personalized social media badge for CND Pune 2026.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Rahul Gaikwad"
                maxLength={30}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cnd-sky transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Job Title / Company
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Solutions Architect, HashiCorp"
                maxLength={60}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cnd-sky transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-cnd-sky transition-all cursor-pointer relative overflow-hidden group">
                  {photoUrl ? (
                    <div className="absolute inset-0">
                      <Image src={photoUrl} alt="Uploaded photo" fill unoptimized className="object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-6 h-6 text-slate-900 dark:text-white mb-2" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Upload Image</span>
                      <span className="text-xs text-slate-400 mt-1">Square image recommended</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full py-4 rounded-xl bg-cnd-blue hover:bg-cnd-light text-white hover:text-cnd-blue text-sm font-bold border border-cnd-blue shadow-lg shadow-cnd-blue/10 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isGenerating ? "Generating Badge..." : "Download Your Badge"}
          </button>
        </div>

        {/* Right Column: Preview */}
        <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Live Preview</p>

          <div className="relative w-full max-w-[500px] aspect-square rounded-xl shadow-2xl overflow-hidden bg-white">
            <div
              ref={badgeRef}
              className="absolute inset-0 bg-white"
            >
              {/* Background Blank Template */}
              <Image
                src="/attending-event-blank.png"
                alt="Badge Template"
                fill
                className="object-cover z-0"
                priority
              />

              {/* White Box Content Area overlay - specific absolute coordinates based on the template */}
              {/* Note: Coordinates approximated based on visual structure of the template. Adjust as needed. */}
              <div
                className="absolute z-10 flex items-center bg-transparent"
                style={{
                  top: '48.21%',    // Adjusted top
                  left: '21.72%',   // Adjusted left
                  width: '55.6%',  // Adjusted width
                  height: '19.4%', // Adjusted height
                }}
              >
                {/* Photo Area */}
                <div className="h-full aspect-square relative bg-slate-100 flex-shrink-0 overflow-hidden">
                  {photoUrl && (
                    <Image
                      src={photoUrl}
                      alt="Profile"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Text Area */}
                <div className="flex-1 px-[5%] flex flex-col justify-center h-full @container">
                  <h2 className="font-bold text-[#1a365d] leading-tight line-clamp-1" style={{ fontSize: 'clamp(14px, 12cqw, 42px)', fontFamily: 'sans-serif' }}>
                    {name || "Your Name"}
                  </h2>
                  <p className="text-[#4a5568] mt-1 leading-snug line-clamp-2" style={{ fontSize: 'clamp(10px, 6cqw, 24px)', fontFamily: 'sans-serif' }}>
                    {role || "Your Role / Company"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cropper Modal */}
      {isCropping && rawImageUrl && (
        <ImageCropper
          image={rawImageUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </section>
  );
}
