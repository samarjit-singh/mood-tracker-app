"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

interface MoodEntry {
  latitude?: number;
  longitude?: number;
  feelingStateValue: number;
}

const HeatLayer: React.FC<{ data: MoodEntry[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatData: [number, number, number][] = [];
    const markerLayer = L.layerGroup();

    data.forEach((entry) => {
      if (entry.latitude && entry.longitude) {
        const intensity = Math.max(0.1, entry.feelingStateValue / 6);
        heatData.push([entry.latitude, entry.longitude, intensity]);

        const marker = L.circleMarker([entry.latitude, entry.longitude], {
          radius: 6,
          color: "transparent",
          fillOpacity: 0,
        });

        marker.bindTooltip(`Avg Mood: ${entry.feelingStateValue}/6`, {
          permanent: false,
          direction: "top",
        });
        markerLayer.addLayer(marker);
      }
    });

    const heatLayer = (L as any).heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 6,
      gradient: {
        0.1: "#ff0000",
        0.3: "#ffa500",
        0.5: "#ffff00",
        0.7: "#90ee90",
        1.0: "#008000",
      },
    });

    heatLayer.addTo(map);
    markerLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
      map.removeLayer(markerLayer);
    };
  }, [data, map]);

  return null;
};

const MoodHeatMap: React.FC<{ moodEntries: MoodEntry[] }> = ({
  moodEntries,
}) => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <HeatLayer data={moodEntries} />
    </MapContainer>
  );
};

export default MoodHeatMap;
