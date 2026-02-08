import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText } from "lucide-react";

interface PdfUploadProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const PdfUpload = ({ label, file, onFileChange }: PdfUploadProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped && dropped.type === "application/pdf") onFileChange(dropped);
    },
    [onFileChange]
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") onFileChange(selected);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">{label}</label>
      {!file ? (
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          animate={{ borderColor: dragOver ? "hsl(200 90% 45%)" : undefined }}
          className={`relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors ${
            dragOver ? "border-accent bg-accent/5" : "border-border hover:border-primary/40 hover:bg-muted/50"
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleSelect}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Drop your PDF here or click to upload</p>
            <p className="mt-1 text-xs text-muted-foreground">PDF only, max 10MB</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={() => onFileChange(null)}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PdfUpload;
