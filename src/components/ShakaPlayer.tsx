import React, { useEffect, useRef, useState } from "react";

// Inline type declarations (move to src/jwplayer.d.ts if preferred)
interface JWPlayer {
  (id: string | HTMLElement): JWPlayerInstance;
  key: string;
}

interface JWPlayerInstance {
  setup(options: any): JWPlayerInstance;
  on(event: string, callback: (e?: any) => void): JWPlayerInstance;
  remove(): void;
  play(): void;
  pause(): void;
  getState(): string;
}

declare global {
  interface Window {
    jwplayer: JWPlayer;
  }
}

interface VideoPlayerProps {
  src: string;
  captions?: { file: string; kind: string; label: string; srclang: string }[];
  proxyHeaders?: Record<string, string>;
}

const VideoPlayer2: React.FC<VideoPlayerProps> = ({ src, captions, proxyHeaders }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const jwPlayerInstance = useRef<JWPlayerInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [proxiedSrc, setProxiedSrc] = useState<string>("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Set your proxy endpoint here
  const M3U8_PROXY = `https://m3u8-streaming-proxy-production-8142.up.railway.app/api/v1/streamingProxy?url=${encodeURIComponent(src)}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!src) return;
    setProxiedSrc(M3U8_PROXY);
  }, [src, proxyHeaders]);

  // Load JW Player script
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.jwplayer === "function") {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://ssl.p.jwpcdn.com/player/v/8.30.1/jwplayer.js";
    script.async = true;
    script.onload = () => {
      window.jwplayer.key = "64HPbvSQorQcd52B8XFuhMtEoitbvY/EXJmMBfKcXZQU2Rnn";
      setScriptLoaded(true);
      console.log("JW Player script loaded");
    };
    script.onerror = () => {
      setError("Failed to load JW Player library.");
      console.error("JW Player script load failed");
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize player
  useEffect(() => {
    if (!isMounted || !playerRef.current || !proxiedSrc || !scriptLoaded) return;

    if (jwPlayerInstance.current) {
      jwPlayerInstance.current.remove();
      jwPlayerInstance.current = null;
    }

    try {
      const player = window.jwplayer(playerRef.current).setup({
        playlist: [{
          file: proxiedSrc,
          type: "hls",
          tracks: captions?.map((caption) => ({
            file: caption.file,
            kind: caption.kind || "captions",
            label: caption.label,
            default: caption.label === "English",
          })),
        }],
        width: "100%",
        aspectratio: "16:9",
        autostart: false,
        controls: true,
        primary: "html5",
        playbackRates: [0.5, 1, 1.5, 2],
      });

      jwPlayerInstance.current = player;

      player.on("ready", () => {
        console.log("JW Player Ready");
      });

      player.on("error", (e) => {
        console.error("JW Player Error:", e);
        setError(`Failed to load the video. Error: ${e.message || "Unknown error"}`);
      });

      player.on("setupError", (e) => {
        console.error("JW Player Setup Error:", e);
        setError(`Player setup failed: ${e.message}`);
      });
    } catch (err) {
      console.error("Error initializing JW Player:", err);
      setError("Failed to initialize video player.");
    }

    return () => {
      if (jwPlayerInstance.current) {
        jwPlayerInstance.current.remove();
        jwPlayerInstance.current = null;
      }
    };
  }, [isMounted, proxiedSrc, captions, scriptLoaded]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!isMounted || !proxiedSrc || !scriptLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="video-container w-full h-auto">
      <div ref={playerRef} id="jw-player">
        Loading the player...
      </div>
    </div>
  );
};

export default VideoPlayer2;
