import React, { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
    src: string; // HLS Video URL
    //   poster?: string; // Poster Image URL
    captions?: { file: string; kind: string; label: string; srclang: string }[]; // Subtitle Tracks
}

const VideoPlayer2: React.FC<VideoPlayerProps> = ({ src, captions }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Ensure component is fully mounted before initializing
    }, []);

    useEffect(() => {
        if (!mounted || !videoRef.current || playerRef.current || !src) return; // Prevent multiple initializations

        try {
            // Initialize Video.js
            const player = (window as any).videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                responsive: true,
                fluid: false, // Prevent automatic resizing issues
            });

            playerRef.current = player;

            player.ready(() => {
                if (player.qualityLevels) {
                    const qualityLevels = player.qualityLevels();
                    qualityLevels.on("addqualitylevel", (event: any) => {
                        const qualityLevel = event.qualityLevel;
                        console.log("Quality Added:", qualityLevel);
                        qualityLevel.enabled = true;
                    });
                }
            });
        } catch (err) {
            console.error("Error initializing Video.js:", err);
            setError("Failed to load video player.");
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [mounted, src]);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>; // Show error message
    }

    if (!mounted || !src) {
        return <p className="text-gray-500">Loading video...</p>; // Show loading message until component is ready
    }

    return (
        <div className="video-container w-full h-full">
            <video
                ref={videoRef}
                className="video-js vjs-default-skin w-full h-full"
                width={"100%"}
                height={"100%"}
            // poster={poster}
            >
                <source src={src} type="application/x-mpegURL" />

                {/* Dynamically Render Subtitle Tracks */}
                {captions &&
                    captions.map((caption, index) => (
                        <track
                            key={index}
                            kind={caption.kind || "subtitles"}
                            src={caption.file} // Ensure using correct key (src, not file)
                            srcLang={caption.srclang}
                            label={caption.label}
                            default={caption.label === "English"}
                        />
                    ))}

            </video>
        </div>
    );
};

export default VideoPlayer2;
