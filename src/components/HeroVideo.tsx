import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLS_URL =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface Props {
  className?: string;
  overlayClass?: string;
  flipY?: boolean;
}

export default function HeroVideo({ className = "", overlayClass = "bg-black/20", flipY = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ startLevel: -1 });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        style={flipY ? { transform: "translateX(-50%) translateY(-50%) scaleY(-1)" } : undefined}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
