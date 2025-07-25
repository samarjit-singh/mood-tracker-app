"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Globe } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MoodHeatMap = dynamic(
  () => import("@/app/dashboard/components/MoodHeatMap"),
  {
    ssr: false,
  }
);

const Earth = dynamic(() => import("@/app/dashboard/components/Globe"), {
  ssr: false,
});

interface MoodEntry {
  id: string;
  selectedEmotions: string[];
  feelingStateValue: number;
  feelingStateLabel: string;
  impactFactors: string[];
  timestamp: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

interface LocationMoodData {
  location: string;
  averageMood: number;
  totalEntries: number;
  moodDistribution: {
    veryBad: number;
    bad: number;
    neutral: number;
    good: number;
    veryGood: number;
  };
  topEmotions: string[];
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [locationData, setLocationData] = useState<LocationMoodData[]>([]);

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const fetchMoodEntries = async () => {
    try {
      const response = await fetch("/api/mood-entries");
      if (response.ok) {
        const data = await response.json();
        setMoodEntries(data);
        processLocationData(data);
      }
    } catch (error) {
      console.error("Error fetching mood entries:", error);
    }
  };

  const processLocationData = (entries: MoodEntry[]) => {
    const locationMap = new Map<
      string,
      {
        moods: number[];
        emotions: string[];
        entries: number;
      }
    >();

    entries.forEach((entry) => {
      if (entry.city && entry.state && entry.country) {
        const locationKey = `${entry.city}, ${entry.state}, ${entry.country}`;

        if (!locationMap.has(locationKey)) {
          locationMap.set(locationKey, {
            moods: [],
            emotions: [],
            entries: 0,
          });
        }

        const locationData = locationMap.get(locationKey)!;
        locationData.moods.push(entry.feelingStateValue);
        locationData.emotions.push(...entry.selectedEmotions);
        locationData.entries++;
      }
    });

    const processedData: LocationMoodData[] = Array.from(locationMap.entries())
      .map(([location, data]) => {
        const averageMood =
          data.moods.reduce((sum, mood) => sum + mood, 0) / data.moods.length;

        const moodDistribution = {
          veryBad: data.moods.filter((m) => m === 0).length,
          bad: data.moods.filter((m) => m === 1).length,
          neutral: data.moods.filter((m) => m === 2 || m === 3).length,
          good: data.moods.filter((m) => m === 4 || m === 5).length,
          veryGood: data.moods.filter((m) => m === 6).length,
        };

        const emotionCounts = data.emotions.reduce((acc, emotion) => {
          acc[emotion] = (acc[emotion] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topEmotions = Object.entries(emotionCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([emotion]) => emotion);

        return {
          location,
          averageMood,
          totalEntries: data.entries,
          moodDistribution,
          topEmotions,
        };
      })
      .sort((a, b) => b.totalEntries - a.totalEntries);

    setLocationData(processedData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Global Mood Insights
            </h1>
            <p className="text-gray-600">
              Discover collective emotional patterns across different locations
            </p>
          </div>

          {/* Time Period Selector */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <div className="p-6">
              {/* Global Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {moodEntries.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {locationData.length}
                  </div>
                  <div className="text-sm text-gray-600">Locations</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {locationData.length > 0
                      ? (
                          locationData.reduce(
                            (sum, loc) => sum + loc.averageMood,
                            0
                          ) / locationData.length
                        ).toFixed(1)
                      : "0"}
                  </div>
                  <div className="text-sm text-gray-600">Global Avg Mood</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {locationData.filter((loc) => loc.averageMood >= 4).length}
                  </div>
                  <div className="text-sm text-gray-600">Happy Locations</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            {["Mood Heatmap", "Location Details", "Globe"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`flex-1 py-2 text-sm ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Mood Heatmap Tab */}
          {activeTab === "Mood Heatmap" && (
            <div className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Mood Heatmap
                    </h3>
                    <div className="text-sm text-gray-600">
                      Heat = Mood intensity by location
                    </div>
                  </div>
                  <MoodHeatMap moodEntries={moodEntries} />
                </div>
              </Card>
            </div>
          )}

          {/* Globe Tab */}
          {activeTab === "Globe" && (
            <div className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Globe
                    </h3>
                    <div className="text-sm text-gray-600">
                      Heat = Mood intensity by location
                    </div>
                  </div>
                  <Earth />
                </div>
              </Card>
            </div>
          )}

          {/* Location Details Tab */}
          {activeTab === "Location Details" && (
            <div className="space-y-4">
              {locationData.map((location) => (
                <Card
                  key={location.location}
                  className="bg-white border border-gray-200 shadow-sm"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {location.location}
                          </h3>
                          <div className="flex flex-col text-sm text-gray-600">
                            <p>• {location.totalEntries} entries </p>
                            <p>
                              • Avg mood: {location.averageMood.toFixed(1)}/6
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          Top Emotions
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {location.topEmotions.join(", ") || "No data"}
                        </div>
                      </div>
                    </div>

                    {/* Mood Distribution */}
                    <div className="grid grid-cols-5 gap-2">
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="text-lg font-bold text-red-600">
                          {location.moodDistribution.veryBad}
                        </div>
                        <div className="text-xs text-red-600">Very Bad</div>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <div className="text-lg font-bold text-orange-600">
                          {location.moodDistribution.bad}
                        </div>
                        <div className="text-xs text-orange-600">Bad</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="text-lg font-bold text-yellow-600">
                          {location.moodDistribution.neutral}
                        </div>
                        <div className="text-xs text-yellow-600">Neutral</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">
                          {location.moodDistribution.good}
                        </div>
                        <div className="text-xs text-green-600">Good</div>
                      </div>
                      <div className="text-center p-2 bg-green-100 rounded">
                        <div className="text-lg font-bold text-green-700">
                          {location.moodDistribution.veryGood}
                        </div>
                        <div className="text-xs text-green-700">Very Good</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {locationData.length === 0 && (
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <div className="p-8 text-center">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Location Data
                    </h3>
                    <p className="text-gray-600">
                      Location data will appear here once users start logging
                      moods with location information.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="text-center mt-8">
            <Link href="/log-mood">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Log New Mood Entry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
