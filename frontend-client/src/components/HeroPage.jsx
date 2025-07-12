import React, { useState } from "react";
import {
  FiArrowRight,
  FiPlay,
  FiAward,
  FiUsers,
  FiImage,
  FiX,
} from "react-icons/fi";

const stats = [
  { value: "10K+", label: "Premium Events", icon: <FiAward /> },
  { value: "50K+", label: "Happy Members", icon: <FiUsers /> },
  { value: "5M+", label: "Memories Created", icon: <FiImage /> },
];

const HeroPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoModal, setVideoModal] = useState(false);

  return (
    <div className="bg-[#F9FAFB] min-h-screen relative overflow-hidden">
      {/* bg effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#90ffffbe] opacity-40 blur-2xl"
            style={{
              width: `${120 + Math.random() * 180}px`,
              height: `${120 + Math.random() * 180}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animation: `float${i} 18s ease-in-out infinite alternate`,
              zIndex: 0,
            }}
          />
        ))}
        <style>
          {`
                        ${[...Array(10)]
                          .map(
                            (_, i) => `
                                @keyframes float${i} {
                                    0% { transform: translateY(0px);}
                                    100% { transform: translateY(${
                                      Math.random() * 60 + 40
                                    }px);}
                                }
                            `
                          )
                          .join("")}
                    `}
        </style>
      </div>

      {/* main */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#D7F5F5] border border-[#E5E7EB]">
              <span className="text-xs font-semibold tracking-wider text-[#0AB1B1]">
                PREMIUM EVENT GALLERY
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#111827]">
              <span className="text-[#0AB1B1]">Capture</span> Every Moment,{" "}
              <span className="text-[#0AB1B1]">Celebrate</span> Every Memory
            </h1>

            <p className="text-lg text-[#4B5563] max-w-lg">
              Our exclusive platform transforms your corporate events into
              timeless digital experiences. Curated galleries, intelligent
              organization, and seamless sharing for the modern enterprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="
                                    flex items-center justify-center gap-2 px-8 py-4 rounded-lg
                                    bg-[#0AB1B1] text-white font-medium
                                    shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-[#088989]
                                    transition-all
                                "
              >
                Get Started <FiArrowRight className="mt-0.5" />
              </button>

              <button
                onClick={() => setVideoModal(true)}
                className="
                                    flex items-center justify-center gap-2 px-8 py-4 rounded-lg
                                    bg-[#D7F5F5] border border-[#E5E7EB]
                                    font-medium hover:bg-[#F3F4F6]
                                    transition-all
                                "
              >
                <FiPlay className="text-[#0AB1B1]" /> Watch Showcase
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex flex-col items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl w-full max-w-[420px] mx-auto">
              {/* Hero Image */}
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Corporate event"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0AB1B1]/70 via-[#0AB1B1]/30 to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full px-2">
              <div className="flex justify-center gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`
                                                relative p-4 rounded-xl border
                                                transition-all duration-300 cursor-pointer
                                                bg-white border-[#E5E7EB]
                                                shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                                                ${
                                                  hoveredCard === index
                                                    ? "scale-105 border-[#0AB1B1] shadow-lg"
                                                    : ""
                                                }
                                            `}
                    style={{
                      transition:
                        "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                      minWidth: 100,
                      background: "#fff",
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-[#0AB1B1] mb-2 text-xl">
                        {stat.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827]">
                        {stat.value}
                      </h3>
                      <p className="text-xs mt-1 text-[#9CA3AF]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Spacer to prevent cut-off */}
            <div className="h-16" />
          </div>
        </div>
      </div>

      {/* video */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4"
          onClick={() => setVideoModal(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
            >
              <FiX className="text-white text-xl" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_your_video_id_?autoplay=1"
              title="Product Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroPage;
