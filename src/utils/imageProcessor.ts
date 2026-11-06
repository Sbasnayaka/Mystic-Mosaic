export interface ImageProcessResult {
  dataUrl: string;
  width: number;
  height: number;
}

export async function processImage(file: File): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    // STRICT LIMIT: 10 MB maximum
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      reject(new Error("That image is a little too magical - pleaseeee choose one underrr 10 MB."));
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      reject(new Error("Pleaseeeeee choose a JPG, PNG, or WEBP image."));
      return;
    }

    // Load the image into memory
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      // Clean up the temporary URL to prevent memory leaks
      URL.revokeObjectURL(objectUrl);

      // Calculate new dimensions (Max 1200px on the longest side)
      // This ensures smooth performance even on mobile devices
      const MAX_DIMENSION = 1200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_DIMENSION) {
          height = Math.round(height * (MAX_DIMENSION / width));
          width = MAX_DIMENSION;
        }
      } else {
        if (height > MAX_DIMENSION) {
          width = Math.round(width * (MAX_DIMENSION / height));
          height = MAX_DIMENSION;
        }
      }

      // Draw to an offscreen canvas to resize and compress
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Browser does not support canvas processing."));
        return;
      }

      // Draw the image scaled down
      ctx.drawImage(img, 0, 0, width, height);

      // Export as compressed JPEG (80% quality) to save RAM
      // We use JPEG even for PNGs here to guarantee a predictable, smaller file size for the puzzle engine
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      resolve({ dataUrl: compressedDataUrl, width, height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to read the image file."));
    };

    img.src = objectUrl;
  });
}