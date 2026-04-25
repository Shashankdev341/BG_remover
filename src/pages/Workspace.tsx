import { useState, useRef, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Download, RotateCcw, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

const Workspace = () => {
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

  const process = () => {
    if (!previewUrl) return;
    setProcessing(true);
    setProgress(0);
    // Simulated processing — wire to n8n webhook in production
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18;
        if (next >= 100) {
          clearInterval(t);
          setTimeout(() => {
            setResultUrl(previewUrl); // Demo: in prod this returns transparent PNG
            setProcessing(false);
            toast.success("Background removed!", { description: "Your cutout is ready to download." });
          }, 300);
          return 100;
        }
        return next;
      });
    }, 200);
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
      <main className="container py-10 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
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
              className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-20 text-center cursor-pointer transition-all duration-300 ${
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
              <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow animate-pulse-glow mb-6">
                <Upload className="h-9 w-9 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold">Drop your image here</h2>
              <p className="mt-2 text-muted-foreground">
                or <span className="text-primary font-medium">click to browse</span>
              </p>
              <p className="mt-6 text-xs text-muted-foreground">
                JPG, PNG, WEBP · Up to 10MB · Max 5000×5000
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Original</p>
                    <span className="text-xs text-muted-foreground">{file && (file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary/30">
                    <img src={previewUrl} alt="Original" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider">Result</p>
                    {resultUrl && <span className="text-xs text-success">✓ Ready</span>}
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden checkered relative">
                    {processing ? (
                      <div className="absolute inset-0 grid place-items-center bg-background/80 backdrop-blur">
                        <div className="text-center w-2/3">
                          <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
                          <p className="text-sm font-medium">AI working its magic…</p>
                          <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-gradient-primary transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{Math.round(progress)}%</p>
                        </div>
                      </div>
                    ) : resultUrl ? (
                      <img src={resultUrl} alt="Result" className="w-full h-full object-contain" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                        <div className="text-center">
                          <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Click "Remove Background" to start</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {!resultUrl ? (
                  <Button variant="hero" size="lg" onClick={process} disabled={processing}>
                    {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    {processing ? "Processing…" : "Remove Background"}
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" asChild>
                    <a href={resultUrl} download="snapcut-result.png">
                      <Download className="h-5 w-5" /> Download PNG
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="lg" onClick={reset}>
                  <RotateCcw className="h-4 w-4" /> New Image
                </Button>
              </div>
            </div>
          )}

          {/* Quota strip */}
          <div className="mt-12 glass-card rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily quota</p>
              <p className="font-display text-xl font-bold mt-1">3 / 5 <span className="text-sm font-normal text-muted-foreground">images used today</span></p>
            </div>
            <Button variant="glow" size="sm" asChild>
              <a href="/pricing">Upgrade for unlimited</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Workspace;
