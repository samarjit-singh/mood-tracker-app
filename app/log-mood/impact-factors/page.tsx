"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Info, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const impactFactors = [
  { name: "Health", icon: "🏥", category: "Personal" },
  { name: "Fitness", icon: "💪", category: "Personal" },
  { name: "Self-Care", icon: "🧘", category: "Personal" },
  { name: "Hobbies", icon: "🎨", category: "Personal" },
  { name: "Identity", icon: "🪞", category: "Personal" },
  { name: "Spirituality", icon: "🙏", category: "Personal" },
  { name: "Community", icon: "🏘️", category: "Social" },
  { name: "Family", icon: "👨‍👩‍👧‍👦", category: "Social" },
  { name: "Friends", icon: "👥", category: "Social" },
  { name: "Partner", icon: "💕", category: "Social" },
  { name: "Dating", icon: "💘", category: "Social" },
  { name: "Tasks", icon: "✅", category: "Work" },
  { name: "Work", icon: "💼", category: "Work" },
  { name: "Education", icon: "📚", category: "Work" },
  { name: "Travel", icon: "✈️", category: "External" },
  { name: "Weather", icon: "🌤️", category: "External" },
  { name: "Current Events", icon: "📰", category: "External" },
  { name: "Money", icon: "💰", category: "External" },
];

const categories = ["Personal", "Social", "Work", "External"];

export default function ImpactFactorsPage() {
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [feelingState, setFeelingState] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const emotions = sessionStorage.getItem("selectedEmotions");
    const storedFeelingState = sessionStorage.getItem("feelingState");

    if (emotions) setSelectedEmotions(JSON.parse(emotions));
    if (storedFeelingState) setFeelingState(JSON.parse(storedFeelingState));
  }, []);

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factor)
        ? prev.filter((f) => f !== factor)
        : [...prev, factor]
    );
  };

  const handleDone = async () => {
    const moodData = {
      selectedEmotions: selectedEmotions,
      feelingState: feelingState,
      impactFactors: selectedFactors,
      additionalContext,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/mood-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moodData),
      });

      if (response.ok) {
        sessionStorage.removeItem("selectedEmotions");
        sessionStorage.removeItem("feelingState");

        router.push("/dashboard");
      }

      console.log("moodData", moodData);
    } catch (error) {
      console.error("Error saving mood entry:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/log-mood/emotion-selection">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">
              Impact Factors
            </h1>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Current Selection Summary */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                    feelingState
                      ? feelingState.bgGradient
                      : "from-green-400 to-green-600"
                  } shadow-lg flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="text-lg font-bold">
                      {feelingState ? feelingState.value + 1 : 4}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {feelingState ? feelingState.label : "Slightly Pleasant"}
                  </h2>
                  <p className="text-gray-600">
                    {selectedEmotions.length > 0
                      ? selectedEmotions.join(", ")
                      : "No emotions selected"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Question Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                What&apos;s having the biggest impact on you?
              </h1>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Info className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-600">
              Select the factors that are most influencing your current mood
            </p>
          </div>

          {/* Impact Factors by Category */}
          <div className="space-y-6">
            {categories.map((category) => (
              <Card
                key={category}
                className="bg-white border border-gray-200 shadow-sm"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {impactFactors
                      .filter((factor) => factor.category === category)
                      .map((factor) => (
                        <Button
                          key={factor.name}
                          variant={
                            selectedFactors.includes(factor.name)
                              ? "default"
                              : "outline"
                          }
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all justify-start ${
                            selectedFactors.includes(factor.name)
                              ? "bg-green-600 text-white hover:bg-green-700 border-green-600"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                          }`}
                          onClick={() => toggleFactor(factor.name)}
                        >
                          <span className="mr-2">{factor.icon}</span>
                          {factor.name}
                        </Button>
                      ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Context */}
          <Card className="bg-white border border-gray-200 shadow-sm mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Context
              </h3>
              <Textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Add any additional details about what's affecting your mood today... (optional)"
                className="w-full bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
              />
            </div>
          </Card>

          {/* Selected Factors Summary */}
          {selectedFactors.length > 0 && (
            <Card className="bg-green-50 border border-green-200 mt-6">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-800 font-medium mb-1">
                      Selected {selectedFactors.length} factor
                      {selectedFactors.length !== 1 ? "s" : ""}:
                    </p>
                    <p className="text-xs text-green-600">
                      {selectedFactors.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 py-3 bg-transparent"
              onClick={() => router.push("/log-mood/emotion-selection")}
            >
              Back
            </Button>
            <Button
              onClick={handleDone}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white"
            >
              Complete Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
