import React, { useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
    src: string;
    captions?: { file: string; kind: string; label: string; srclang: string }[];
}

const VideoPlayer2: React.FC<VideoPlayerProps> = ({ src, captions }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Ensure component is mounted before initializing Video.js
    }, []);

    useEffect(() => {
        if (!isMounted || !videoRef.current || !src) return;

        // Dispose existing player before creating a new one
        if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
        }

        try {
            const player = (window as any).videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                responsive: true,
                fluid: true,
            });

            playerRef.current = player;

            player.ready(() => {
                console.log("Video.js Player Ready");

                // Handle Quality Levels
                const qualityLevels = player.qualityLevels();
                if (qualityLevels) {
                    qualityLevels.on("addqualitylevel", (event: any) => {
                        event.qualityLevel.enabled = true;
                    });
                }
            });

            player.on("error", () => {
                console.error("Video.js Error");
                setError("Failed to load the video.");
            });
        } catch (err) {
            console.error("Error initializing Video.js:", err);
            setError("Failed to initialize video player.");
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [isMounted, src]);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!isMounted || !src) {
        return <p className="text-gray-500">Loading video...</p>;
    }

    return (
        <div className="video-container w-full h-full">
            <video
                ref={videoRef}
                className="video-js vjs-default-skin w-full h-full"
                width="100%"
                height="100%"
            >
                <source src={src} type="application/x-mpegURL" />
                {captions &&
                    captions.map((caption, index) => (
                        <track
                            key={index}
                            kind={caption.kind || "subtitles"}
                            src={caption.file}
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
