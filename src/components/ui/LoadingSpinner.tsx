import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  console.log('🎨 Rendering LoadingSpinner');
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-6 shadow-xl">
        <Loader2 className="h-12 w-12 animate-spin text-sunny-orange" />
      </div>
    </div>
  );
};

export default LoadingSpinner;