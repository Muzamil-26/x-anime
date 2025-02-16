import { useState } from "react";
import { X } from "lucide-react"; // Or any close icon you prefer

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="top-0 left-0 w-full bg-gradient-to-r from-blue-900 to-purple-600 text-white p-3 z-50 flex items-center justify-between px-4 md:px-8">
      {/* Banner Content */}
      <div className="flex items-center justify-center w-full text-center">
        <span className="text-xs sm:text-sm md:text-base">
          🎌 <strong className="font-semibold">X-Anime</strong> - Developed by <strong className="font-semibold underline"><a
            href="https://buymeacoffee.com/muzamil___26"
            target="_blank"
            className="underline hover:no-underline font-medium"
          >
            Muzamil Khan
          </a></strong> | Enjoy Free HD Anime Streaming! 🚀
        </span>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="hover:bg-black/10 rounded-full p-1 transition-colors ml-4"
        aria-label="Close banner"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default TopBanner;