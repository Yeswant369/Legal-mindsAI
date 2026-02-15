import { useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText, Plus } from "lucide-react";

interface PdfUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const PdfUpload = ({ files, onFilesChange }: PdfUploadProps) => {

  const mergeFiles = (newFiles: File[]) => {
    const combined = [...files, ...newFiles];

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

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  return (
    <div className="space-y-4">

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, i) => (
            <motion.div
              key={`${file.name}-${i}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2A5F]/10">
                  <FileText className="h-4 w-4 text-[#0F2A5F]" />
                </div>

                <p className="text-sm font-medium text-slate-900">
                  {file.name}
                </p>
              </div>

              <button
                onClick={() => removeFile(i)}
                className="rounded-full p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
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
        className="relative flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-300 bg-white py-10 px-6 transition-all duration-200 hover:border-[#0F2A5F] hover:shadow-[0_10px_35px_rgba(15,42,95,0.12)]"
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F2A5F]/10">
          {files.length > 0 ? (
            <Plus className="h-5 w-5 text-[#0F2A5F]" />
          ) : (
            <Upload className="h-5 w-5 text-[#0F2A5F]" />
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">
            {files.length > 0
              ? "Add more PDF documents"
              : "Drop your PDF files here or click to upload"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            PDF only • Unlimited uploads supported
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfUpload;
