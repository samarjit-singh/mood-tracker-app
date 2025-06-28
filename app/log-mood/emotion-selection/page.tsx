"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Info, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const emotions = [
  "Amazed",
  "Excited",
  "Surprised",
  "Passionate",
  "Happy",
  "Joyful",
  "Brave",
  "Proud",
  "Confident",
  "Hopeful",
  "Amused",
  "Satisfied",
  "Relieved",
  "Grateful",
  "Content",
  "Calm",
  "Peaceful",
];

const moreEmotions = [
  "Energetic",
  "Optimistic",
  "Inspired",
  "Motivated",
  "Relaxed",
  "Serene",
];

export default function EmotionSelectionPage() {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [feelingState, setFeelingState] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedFeelingState = sessionStorage.getItem("feelingState");
    if (storedFeelingState) {
      setFeelingState(JSON.parse(storedFeelingState));
    }
  }, []);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleNext = () => {
    if (selectedEmotions.length > 0) {
      sessionStorage.setItem(
        "selectedEmotions",
        JSON.stringify(selectedEmotions)
      );
      router.push("/log-mood/impact-factors");
    }
  };

  const allEmotions = showMore ? [...emotions, ...moreEmotions] : emotions;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/log-mood/feeling-slider">
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
              Select Emotion
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
          {/* Current Feeling Display */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${
                    feelingState
                      ? feelingState.bgGradient
                      : "from-green-400 to-green-600"
                  } shadow-lg flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">
                      {feelingState ? feelingState.value + 1 : 4}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {feelingState ? feelingState.label : "Slightly Pleasant"}
                </h2>
                <p className="text-gray-600">
                  {feelingState
                    ? feelingState.description
                    : "Feeling pretty good, content, or satisfied"}
                </p>
              </div>
            </div>
          </Card>

          {/* Question Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                What best describes this feeling?
              </h1>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Info className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-600">
              Choose one or more emotions that best match your current state
            </p>
          </div>

          {/* Emotion Selection */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {allEmotions.map((emotion) => (
                  <Button
                    key={emotion}
                    variant={
                      selectedEmotions.includes(emotion) ? "default" : "outline"
                    }
                    className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      selectedEmotions.includes(emotion)
                        ? "bg-green-600 text-white hover:bg-green-700 border-green-600"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => toggleEmotion(emotion)}
                  >
                    {emotion}
                    {selectedEmotions.includes(emotion) && (
                      <span className="ml-2 text-xs">✓</span>
                    )}
                  </Button>
                ))}
              </div>

              {/* Show More Button */}
              {!showMore && (
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-900 py-3"
                  onClick={() => setShowMore(true)}
                >
                  <span className="mr-2">Show More Options</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>

          {/* Selected Emotion Display */}
          {selectedEmotions.length > 0 && (
            <Card className="bg-green-50 border border-green-200 mt-6">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-sm text-green-800 font-medium">
                      Selected {selectedEmotions.length} emotion
                      {selectedEmotions.length !== 1 ? "s" : ""}:{" "}
                      {selectedEmotions.join(", ")}
                    </p>
                    <p className="text-xs text-green-600">
                      You can select multiple emotions that describe your
                      feeling
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
              onClick={() => router.push("/log-mood/feeling-slider")}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedEmotions.length === 0}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
