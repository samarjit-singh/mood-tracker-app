import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const MyGlobe = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "92vh" }}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          //   globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          width={dimensions.width}
          height={dimensions.height}
        />
      )}
    </div>
  );
};

export default MyGlobe;

// https://www.npmjs.com/package/react-globe.gl
// https://github.com/vasturiano/three-globe
