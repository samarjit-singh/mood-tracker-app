"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Users, Brain } from "lucide-react";
import Link from "next/link";

interface MoodEntry {
  id: string;
  currentFeeling: string;
  selectedEmotion: string[];
  feelingState: any;
  impactFactors: string[];
  timestamp: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [timePeriod, setTimePeriod] = useState("6M");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const fetchMoodEntries = async () => {
    try {
      const response = await fetch("/api/mood-entries");
      if (response.ok) {
        const data = await response.json();
        setMoodEntries(data);
      }
    } catch (error) {
      console.error("Error fetching mood entries:", error);
    }
  };

  const generateMoodData = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        day: i,
        mood: Math.random() * 4 + 1,
        color:
          Math.random() > 0.7
            ? "bg-orange-400"
            : Math.random() > 0.4
            ? "bg-green-400"
            : "bg-blue-400",
      });
    }
    return data;
  };

  const generateExerciseData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      month,
      minutes: Math.floor(Math.random() * 80) + 20,
    }));
  };

  const moodData = generateMoodData();
  const exerciseData = generateExerciseData();

  console.log("exerciseData", exerciseData);

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
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Mood Insights
            </h1>
            <p className="text-gray-600">
              Discover patterns and trends in your emotional wellbeing
            </p>
          </div>

          {/* Time Period Selector */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Time Period
                </h3>
                <div className="flex space-x-2">
                  {["W", "M", "6M", "Y"].map((period) => (
                    <Button
                      key={period}
                      variant={timePeriod === period ? "default" : "outline"}
                      size="sm"
                      className={`${
                        timePeriod === period
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => setTimePeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {moodEntries.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.2</div>
                  <div className="text-sm text-gray-600">Avg Mood</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Positive Days</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">7</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            {["Overview", "Trends", "Factors", "Insights"].map((tab) => (
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

          {/* Content based on active tab */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Chart */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Mood Over Time
                  </h3>
                  <div className="relative h-48 bg-gray-50 rounded-lg p-4">
                    <div className="absolute right-4 top-4 text-xs text-gray-500">
                      <div>Very Pleasant</div>
                      <div className="mt-4">Neutral</div>
                      <div className="mt-4">Very Unpleasant</div>
                    </div>
                    <div className="flex items-end justify-between h-full px-4 pb-4">
                      {moodData.slice(0, 15).map((data, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className={`w-2 ${data.color} rounded-full`}
                            style={{ height: `${(data.mood / 5) * 120}px` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Entries */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Entries
                  </h3>
                  <div className="space-y-3">
                    {moodEntries.slice(0, 5).map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {entry.selectedEmotion || "Happy"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Life Factors Section */}
          <Card className="bg-white border border-gray-200 shadow-sm mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Life Factors Impact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Exercise</span>
                  </div>
                  <div className="text-sm text-orange-700">High Impact</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Social</span>
                  </div>
                  <div className="text-sm text-blue-700">Medium Impact</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Work</span>
                  </div>
                  <div className="text-sm text-green-700">Low Impact</div>
                </div>
              </div>
            </div>
          </Card>

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
