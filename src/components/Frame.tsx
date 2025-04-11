"use client";

import { useEffect, useState } from "react";
import { useFrameSDK } from "~/hooks/useFrameSDK";

function LinkCard({ url, title }: { url: string; title: string }) {
  return (
    <a 
      href={url}
      className="block mb-4 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 transform hover:scale-105 transition-transform"
      style={{
        fontFamily: "'Arial Black', sans-serif",
        textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
        border: "3px solid #000"
      }}
    >
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/80 truncate">{url}</p>
    </a>
  );
}

export default function Frame() {
  const { isSDKLoaded, sdk } = useFrameSDK();
  const [links, setLinks] = useState<{url: string; title: string}[]>([]);

  useEffect(() => {
    if (sdk) {
      // Replace this with actual SDK call to get recent cast links
      const dummyLinks = [
        { url: "https://example.com/1", title: "Groovy Link #1" },
        { url: "https://example.com/2", title: "Far Out Content" },
        { url: "https://example.com/3", title: "Disco Tech News" },
      ];
      setLinks(dummyLinks);
    }
  }, [sdk]);

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
          Your Funky Links
        </h1>
        <div className="space-y-4">
          {links.map((link, index) => (
            <LinkCard key={index} url={link.url} title={link.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
