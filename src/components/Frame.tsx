"use client";

import { useEffect, useState } from "react";
import { useFrameSDK } from "~/hooks/useFrameSDK";
import { SOCIAL_LINKS } from "~/lib/constants";

function LinkCard({ url, title, icon, description, onClick }: { 
  url: string; 
  title: string; 
  icon?: string;
  description?: string;
  onClick?: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left mb-4 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 transform hover:scale-105 transition-transform"
      style={{
        fontFamily: "'Arial Black', sans-serif",
        textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
        border: "3px solid #000"
      }}
    >
      <h3 className="text-xl font-bold text-white mb-2">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      <p className="text-sm text-white/80 truncate">{description || url}</p>
    </button>
  );
}

export default function Frame() {
  const { isSDKLoaded, sdk } = useFrameSDK();
  const [recentLinks, setRecentLinks] = useState<{url: string; title: string}[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (sdk) {
      // Replace this with actual SDK call to get recent cast links
      const dummyRecentLinks = [
        { url: "https://example.com/1", title: "My Latest Blog Post" },
        { url: "https://example.com/2", title: "Cool Project" },
      ];
      setRecentLinks(dummyRecentLinks);
    }
  }, [sdk]);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleLinkClick = (url: string) => {
    if (sdk) {
      sdk.redirect(url);
    } else {
      window.open(url, '_blank');
    }
  };

  if (!isSDKLoaded) {
    return <div className="text-center p-4 text-white">Loading the funk...</div>;
  }

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(45deg, #2C3E50, #3498db)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <div className="max-w-md mx-auto">
        <h1 
          className="text-4xl font-bold text-center mb-8 text-white"
          style={{
            fontFamily: "'Arial Black', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
          }}
        >
          Groovy Social Links
        </h1>
        <div className="space-y-8">
          {currentPage === 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 text-center" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>
                Connect with Me
              </h2>
              {SOCIAL_LINKS.map((link, index) => (
                <LinkCard 
                  key={`social-${index}`} 
                  url={link.url} 
                  title={link.title} 
                  icon={link.icon}
                  description={link.description}
                  onClick={() => handleLinkClick(link.url)}
                />
              ))}
              <button 
                onClick={handleNext}
                className="w-full py-2 bg-white/20 rounded-lg text-white font-bold hover:bg-white/30 transition-colors"
              >
                View Recent Shares →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 text-center" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>
                Recent Shares
              </h2>
              {recentLinks.map((link, index) => (
                <LinkCard 
                  key={`recent-${index}`} 
                  url={link.url} 
                  title={link.title}
                  onClick={() => handleLinkClick(link.url)}
                />
              ))}
              <button 
                onClick={handlePrev}
                className="w-full py-2 bg-white/20 rounded-lg text-white font-bold hover:bg-white/30 transition-colors"
              >
                ← Back to Social Links
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
