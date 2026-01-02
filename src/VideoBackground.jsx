// VideoBackground.jsx

import { useRef } from "react";

export default function VideoBackground({ onEarlyEnd, onEnded, IntroVideo }) {
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);


  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    const advance = 0.1; // ~5 frame
    const triggerTime = Math.max(video.duration - advance, 0) * 1000;

    timeoutRef.current = setTimeout(() => {
      if (onEarlyEnd) onEarlyEnd();
    }, triggerTime);
  };
  const closeVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    v.pause();
    v.src = "";
    v.load();
    if (onEnded) onEnded(); 
  };

  const SkipIntro = () => {
    closeVideo();
    if (onEarlyEnd) onEarlyEnd();
  };

  return (
    <div>
    <div
      onClick={SkipIntro}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",

        backgroundColor: "transparent",

        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
      <video
        ref={videoRef}
        src={`${IntroVideo}`}
        autoPlay
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
          
        }}
        onLoadedMetadata={handleLoadedMetadata} // chắc chắn duration đã sẵn sàng
        onEnded={onEnded}                       // video kết thúc thật
      />
    </div>
  );
}
