import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Download, RotateCcw, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useQuota } from "@/hooks/use-quota";
import { useRecentCutouts } from "@/hooks/use-recent-cutouts";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

const Workspace = () => {
  const { used, limit, incrementQuota, isOverQuota } = useQuota();
  const { addCutout } = useRecentCutouts();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!ACCEPT.includes(f.type)) {
      toast.error("Unsupported format", { description: "Please upload JPG, PNG, or WEBP." });
      return;
    }
    if (f.size > MAX_SIZE) {
      toast.error("File too large", { description: "Max size is 10MB." });
      return;
    }
    setFile(f);
    setResultUrl(null);
    setPreviewUrl(URL.createObjectURL(f));
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const process = async () => {
    if (!file) return;
    if (isOverQuota) {
      toast.error("Quota exceeded", { description: "You've used your 5 free daily images. Upgrade for unlimited access!" });
      return;
    }
    setProcessing(true);
    setProgress(10);
    
    const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;
    if (!apiKey) {
      toast.error("API Key missing", { description: "Please add VITE_REMOVE_BG_API_KEY to your .env file." });
      setProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image_file", file);
      formData.append("size", "auto");

      setProgress(30);

      console.log("Starting background removal request...");
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      });

      console.log("Response status:", response.status);
      setProgress(70);

      if (!response.ok) {
        let errorMessage = "Failed to remove background";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.errors?.[0]?.title || errorMessage;
          console.error("API Error Data:", errorData);
        } catch (e) {
          const errorText = await response.text();
          console.error("Raw Error Text:", errorText);
          errorMessage = `Server Error (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Save to recent cutouts
      const reader = new FileReader();
      reader.onloadend = () => {
        addCutout({
          name: file.name,
          url: reader.result as string,
        });
      };
      reader.readAsDataURL(blob);

      setResultUrl(url);
      setProgress(100);
      incrementQuota();
      toast.success("Background removed!", { description: "Your cutout is ready to download." });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred while removing the background.";
      toast.error("Processing failed", { description: message });
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Upload <span className="gradient-text">Workspace</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Drop an image to remove its background instantly.
            </p>
          </div>

          {!previewUrl ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-12 lg:p-20 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? "border-primary bg-primary/5 shadow-glow"
                  : "border-border hover:border-primary/60 hover:bg-secondary/30"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT.join(",")}
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow animate-pulse-glow mb-6">
                <Upload className="h-7 w-7 sm:h-9 sm:w-9 text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold">Drop your image here</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                or <span className="text-primary font-medium">click to browse</span>
              </p>
              <p className="mt-6 text-[10px] sm:text-xs text-muted-foreground">
                JPG, PNG, WEBP · Up to 10MB · Max 5000×5000
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original</p>
                    <span className="text-[10px] text-muted-foreground">{file && (file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary/30">
                    <img src={previewUrl} alt="Original" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Result</p>
                    {resultUrl && <span className="text-[10px] text-success font-medium">✓ Ready</span>}
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden checkered relative">
                    {processing ? (
                      <div className="absolute inset-0 grid place-items-center bg-background/80 backdrop-blur">
                        <div className="text-center w-3/4">
                          <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-spin mx-auto mb-4" />
                          <p className="text-xs sm:text-sm font-medium">AI working its magic…</p>
                          <div className="mt-4 h-1.5 sm:h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-gradient-primary transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="mt-2 text-[10px] sm:text-xs text-muted-foreground">{Math.round(progress)}%</p>
                        </div>
                      </div>
                    ) : resultUrl ? (
                      <img src={resultUrl} alt="Result" className="w-full h-full object-contain" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-muted-foreground p-4">
                        <div className="text-center">
                          <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 opacity-50" />
                          <p className="text-xs sm:text-sm">Click "Remove Background" to start</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!resultUrl ? (
                  <Button variant="hero" size="lg" onClick={process} disabled={processing} className="w-full sm:w-auto">
                    {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    {processing ? "Processing…" : "Remove Background"}
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                    <a href={resultUrl} download="snapcut-result.png">
                      <Download className="h-5 w-5" /> Download PNG
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="lg" onClick={reset} className="w-full sm:w-auto">
                  <RotateCcw className="h-4 w-4" /> New Image
                </Button>
              </div>
            </div>
          )}

          {/* Quota strip */}
          <div className="mt-12 glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Daily quota</p>
              <p className="font-display text-xl sm:text-2xl font-bold mt-1">
                {used} / {limit} 
                <span className="ml-2 text-xs sm:text-sm font-normal text-muted-foreground">images used today</span>
              </p>
            </div>
            <Button variant="glow" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/pricing">Upgrade for unlimited</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Workspace;
