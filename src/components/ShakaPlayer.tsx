import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  src: string; // Video URL (HLS, MP4, YouTube, Vimeo, etc.)
  // poster?: string; // Poster image URL
  captions?: { src: string; kind: string; label: string; srclang: string }[]; // Subtitles
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, captions }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <ReactPlayer
        url={src}
        playing={true} // Autoplay disabled initially
        controls={true} // Enable playback controls
        width="100%"
        height="auto"
        // light={poster} // Show poster before playing
        pip={true} // Enable Picture-in-Picture
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
            tracks: captions
              ? captions.map((caption) => ({
                  kind: caption.kind || "subtitles",
                  src: caption.src,
                  srcLang: caption.srclang,
                  label: caption.label,
                  default: caption.label === "English",
                }))
              : [],
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
