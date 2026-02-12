import { useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText, Plus } from "lucide-react";

interface PdfUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const PdfUpload = ({ files, onFilesChange }: PdfUploadProps) => {
  // Merge new files safely
  const mergeFiles = (newFiles: File[]) => {
    const combined = [...files, ...newFiles];

    // Remove duplicates (by name + size)
    const unique = combined.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (f) => f.name === file.name && f.size === file.size
        )
    );

    onFilesChange(unique);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const dropped = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === "application/pdf"
      );

      if (dropped.length) {
        mergeFiles(dropped);
      }
    },
    [files]
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).filter(
      (f) => f.type === "application/pdf"
    );

    if (selected.length) {
      mergeFiles(selected);
    }

    // Reset input so same file can be reselected
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="mb-2 block text-sm font-semibold text-foreground">
        Upload PDF Documents
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <motion.div
              key={`${file.name}-${i}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFile(i)}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-6 transition-colors hover:border-primary/40 hover:bg-muted/50"
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          {files.length > 0 ? (
            <Plus className="h-5 w-5 text-primary" />
          ) : (
            <Upload className="h-5 w-5 text-primary" />
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {files.length > 0
              ? "Add more PDFs"
              : "Drop your PDFs here or click to upload"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF only • Upload as many as you need
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfUpload;
