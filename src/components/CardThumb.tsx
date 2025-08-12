import React, { useRef, useState, useEffect } from "react";

interface Props {
  thumbClass: string;
  videoSrc: string;
  imgWeb: string;
  imgMo: string;
}

const CardThumb: React.FC<Props> = ({
  thumbClass,
  videoSrc,
  imgWeb,
  imgMo,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1080px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.style.display = "block";
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.style.display = "none";
      }
    }
  }, [isHovered]);

  return (
    <div
      className={`card_thumb ${thumbClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        className="video_thumb_canvas"
        style={{ display: "none" }}
      ></canvas>

      <div className="only_mo">
        <img
          className="video_thumb_img"
          src={imgMo}
          alt=""
          style={{ display: isMobile && !isHovered ? "block" : "none" }}
        />
      </div>
      <div className="only_web">
        <img
          className="video_thumb_img"
          src={imgWeb}
          alt=""
          style={{ display: !isMobile && !isHovered ? "block" : "none" }}
        />
      </div>

      <video
        className="thumb_video"
        crossOrigin="anonymous"
        muted
        loop
        preload="auto"
        ref={videoRef}
        style={{ display: "none" }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default CardThumb;
