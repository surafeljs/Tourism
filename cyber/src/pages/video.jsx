import React, { useEffect, useState } from "react";
import "../styles/videos.css";

/**
 * Video component converted from static HTML to React JSX.
 *
 * Notes:
 * - Place images in the public folder (e.g. public/images/aksum.jpg) or update paths/imports to match your bundler.
 * - Video links open in a new tab with rel="noopener noreferrer" for security.
 *
 * Usage:
 *   import Video from "./Video";
 *   <Video />
 */

const videoItems = [
  {
    id: 1,
    href: "https://www.youtube.com/watch?v=iPd0GJOHRC4",
    thumbClass: "ethiopia-1",
    duration: "3:45",
    title: "Aksum Historical Sites of Ethiopia",
    description: "Explore ancient churches and archaeological wonders",
  },
  {
    id: 2,
    href: "https://www.youtube.com/watch?v=eaejk-auNDg",
    thumbClass: "ethiopia-2",
    duration: "13:23",
    title: "Simien Mountains Adventure",
    description: "Breathtaking landscapes and unique wildlife",
  },
  {
    id: 3,
    href: "https://www.youtube.com/watch?v=TKT5MloFYcQ",
    thumbClass: "ethiopia-3",
    duration: "01:12",
    title: "Ethiopian Coffee Culture",
    description: "The birthplace of coffee and its traditions",
  },
  {
    id: 4,
    href: "https://www.youtube.com/watch?v=hriqG86lgOM",
    thumbClass: "ethiopia-4",
    duration: "03:43",
    title: "Danakil Depression",
    description: "One of the hottest places on Earth",
  },
  {
    id: 5,
    href: "https://www.youtube.com/watch?v=excYNB26fhs",
    thumbClass: "ethiopia-5",
    duration: "13:34",
    title: "Lalibela Rock Churches",
    description: "Medieval architecture carved from stone",
  },
  {
    id: 6,
    href: "https://www.youtube.com/watch?v=cfSIa5FAR2Y",
    thumbClass: "ethiopia-6",
    duration: "29:43",
    title: "Omo Valley Tribes",
    description: "Rich cultural diversity and traditions",
  },
  {
    id: 7,
    href: "https://www.youtube.com/watch?v=c6nyhFeAgNM",
    thumbClass: "ethiopia-7",
    duration: "06:26",
    title: "Fasilides",
    description:
      "Fasilides was Emperor of Ethiopia from 1632 to his death on 18 October 1667.",
  },
  {
    id: 8,
    href: "https://www.youtube.com/watch?v=jlmgms9t1F4",
    thumbClass: "ethiopia-8",
    duration: "25:26",
    title: "Addis Ababa City Tour",
    description: "Modern capital with ancient heritage",
  },
  {
    id: 9,
    href: "https://www.youtube.com/watch?v=MHVs_FPv2M8",
    thumbClass: "ethiopia-9",
    duration: "14:16",
    title: "Harar",
    description: "Harar Jugol Wall",
  },
  {
    id: 10,
    href: "https://www.youtube.com/watch?v=NugDdg9X68s",
    thumbClass: "ethiopia-10",
    duration: "00:18",
    title: "Abay River",
    description: "Largest river in the world",
  },
  {
    id: 11,
    href: "https://www.youtube.com/watch?v=FDBs1u4NOfk",
    thumbClass: "ethiopia-11",
    duration: "15:43",
    title: "Bale Mountains",
    description: "Wildlife sanctuary and pristine wilderness",
  },
  {
    id: 12,
    href: "https://www.youtube.com/watch?v=U_DdCNWF_2Q",
    thumbClass: "ethiopia-12",
    duration: "01:31",
    title: "Ethiopian Festivals",
    description: "Celebrations and cultural events",
  },
];

export default function Videos() {
  const [navOpen, setNavOpen] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollBtn(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav when window resized above mobile breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="video-page">
      
        


      <h1 className="page-title">Discover Ethiopia Through Video</h1>

      <main className="video-container">
        <div className="video-grid">
          {videoItems.map((v) => (
            <a
              key={v.id}
              className="video-item"
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch video: ${v.title}`}
            >
              <div className={`video-thumbnail ${v.thumbClass}`}>
                <div className="play-button" aria-hidden="true" />
                <div className="video-duration">{v.duration}</div>
              </div>

              <div className="video-info">
                <h2 className="video-title">{v.title}</h2>
                <p className="video-description">{v.description}</p>
              </div>
            </a>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Tourism Ethiopia. All rights reserved.</p>
      </footer>

      <button
        id="scrollTopBtn"
        aria-label="Scroll back to top"
        style={{ display: showScrollBtn ? "block" : "none" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </div>
  );
}