import { useState, useCallback } from 'react';
import { Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { processImage } from '../utils/imageProcessor';
import { useGameStore } from '../store/gameStore';

export function ImageUploader() {
  const { image, setImage, clearImage } = useGameStore();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle the actual file processing
  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setIsProcessing(true);
    try {
      const result = await processImage(file);
      setImage(result.dataUrl);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsProcessing(false);
    }
  }, [setImage]);

  // Drag and Drop Event Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
  clearImage();
  setError(null);
};

  // UI: Image Preview State
  if (image) {
    return (
      <div className="relative group w-full aspect-video bg-cosmic-950 rounded-sm overflow-hidden border-4 border-magic-900 dark:border-cosmic-800">
        <img src={image} alt="Puzzle Preview" className="w-full h-full object-contain" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <label className="pixel-btn text-sm py-2 px-4 cursor-pointer">
            Change Image
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileInput} />
          </label>
          <button onClick={handleRemove} className="pixel-btn text-sm py-2 px-4 bg-red-500 border-red-900">
            Remove
          </button>
        </div>
      </div>
    );
  }

  // UI: Upload / Drag-and-Drop State
  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full aspect-video border-4 border-dashed rounded-sm 
          flex flex-col items-center justify-center gap-4 p-6 text-center
          transition-all duration-200 cursor-pointer
          ${isDragging 
            ? 'border-accent bg-magic-100 dark:bg-cosmic-900 scale-[1.02]' 
            : 'border-magic-400 dark:border-cosmic-800 bg-magic-50 dark:bg-cosmic-950 hover:border-accent'}
        `}
      >
        <input 
          type="file" 
          accept="image/jpeg,image/png,image/webp" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
        
        {isProcessing ? (
          <div className="font-pixel text-accent animate-pulse">PROCESSING MAGIC...</div>
        ) : (
          <>
            <div className="p-4 bg-magic-200 dark:bg-cosmic-800 rounded-full">
              <ImageIcon className="w-8 h-8 text-magic-600 dark:text-accent" />
            </div>
            <div>
              <p className="font-pixel text-lg text-magic-900 dark:text-magic-100">
                Drag & Drop or Click to Upload
              </p>
              <p className="font-body text-sm text-magic-600 dark:text-magic-400 mt-1">
                JPG, PNG, or WEBP (Max 10 MB)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center gap-3 p-3 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 rounded-sm">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="font-body text-sm text-red-700 dark:text-red-300">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      )}
    </div>
  );
}