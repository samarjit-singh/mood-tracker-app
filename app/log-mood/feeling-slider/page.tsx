"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const feelingStates = [
  {
    value: 0,
    label: "Very Unpleasant",
    shortLabel: "Very Bad",
    color: "#dc2626",
    bgGradient: "from-red-500 to-red-600",
    description: "Feeling terrible, overwhelmed, or in distress",
  },
  {
    value: 1,
    label: "Unpleasant",
    shortLabel: "Bad",
    color: "#ea580c",
    bgGradient: "from-orange-500 to-red-500",
    description: "Feeling down, frustrated, or uncomfortable",
  },
  {
    value: 2,
    label: "Slightly Unpleasant",
    shortLabel: "Meh",
    color: "#d97706",
    bgGradient: "from-yellow-500 to-orange-500",
    description: "Feeling a bit off or mildly bothered",
  },
  {
    value: 3,
    label: "Neutral",
    shortLabel: "Okay",
    color: "#6b7280",
    bgGradient: "from-gray-400 to-gray-500",
    description: "Feeling balanced, neither good nor bad",
  },
  {
    value: 4,
    label: "Slightly Pleasant",
    shortLabel: "Good",
    color: "#16a34a",
    bgGradient: "from-green-400 to-green-500",
    description: "Feeling pretty good, content, or satisfied",
  },
  {
    value: 5,
    label: "Pleasant",
    shortLabel: "Great",
    color: "#15803d",
    bgGradient: "from-green-500 to-green-600",
    description: "Feeling happy, positive, or energized",
  },
  {
    value: 6,
    label: "Very Pleasant",
    shortLabel: "Amazing",
    color: "#166534",
    bgGradient: "from-green-600 to-emerald-600",
    description: "Feeling fantastic, joyful, or euphoric",
  },
];

export default function FeelingSliderPage() {
  const [sliderValue, setSliderValue] = useState(3);
  const router = useRouter();

  const currentFeeling = feelingStates[sliderValue];

  const handleNext = () => {
    sessionStorage.setItem("feelingState", JSON.stringify(currentFeeling));
    router.push("/log-mood/emotion-selection");
  };

  const handlePrevious = () => {
    if (sliderValue > 0) {
      setSliderValue(sliderValue - 1);
    }
  };

  const handleNextSlide = () => {
    if (sliderValue < 6) {
      setSliderValue(sliderValue + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/log-mood">
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
              Rate Your Feeling
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
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              How you feel right now?
            </h1>
            <p className="text-gray-600">
              Use the controls below to select your current mood level
            </p>
          </div>

          {/* Main Card */}
          <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            {/* Preview Header */}
            <div className="bg-green-50 px-6 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Mood Scale</h3>
            </div>

            {/* Carousel-like Interface */}
            <div className="relative bg-white p-8">
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #000 1px, transparent 1px),
                    linear-gradient(to bottom, #000 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Main Feeling Display */}
              <div className="relative flex items-center justify-center min-h-[300px]">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 z-10 w-10 h-10 rounded-full border-2 hover:bg-gray-50 bg-white shadow-sm"
                  onClick={handlePrevious}
                  disabled={sliderValue === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {/* Central Feeling Card */}
                <div className="text-center">
                  <div
                    className={`w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${currentFeeling.bgGradient} shadow-lg flex items-center justify-center border-4 border-gray-900`}
                  >
                    <div className="text-white text-center">
                      <div className="text-6xl font-bold mb-2">
                        {sliderValue + 1}
                      </div>
                      <div className="text-lg font-medium">
                        {currentFeeling.label}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {currentFeeling.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    {sliderValue + 1} of 7
                  </div>
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 z-10 w-10 h-10 rounded-full border-2 hover:bg-gray-50 bg-white shadow-sm"
                  onClick={handleNextSlide}
                  disabled={sliderValue === 6}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Slider */}
              <div className="mt-8">
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={sliderValue}
                  onChange={(e) =>
                    setSliderValue(Number.parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, 
                      #dc2626 0%, #dc2626 14.28%, 
                      #ea580c 14.28%, #ea580c 28.56%, 
                      #d97706 28.56%, #d97706 42.84%, 
                      #6b7280 42.84%, #6b7280 57.12%, 
                      #16a34a 57.12%, #16a34a 71.4%, 
                      #15803d 71.4%, #15803d 85.68%, 
                      #166534 85.68%, #166534 100%)`,
                  }}
                />

                {/* Slider Labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Very Bad</span>
                  <span>Neutral</span>
                  <span>Amazing</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Selection */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 text-center mb-4">
              Quick selection:
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {feelingStates.map((feeling) => (
                <Button
                  key={feeling.value}
                  variant={
                    sliderValue === feeling.value ? "default" : "outline"
                  }
                  size="sm"
                  className={`text-xs ${
                    sliderValue === feeling.value
                      ? "bg-green-600 text-white"
                      : ""
                  }`}
                  onClick={() => setSliderValue(feeling.value)}
                >
                  {feeling.shortLabel}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 py-3 bg-transparent"
              onClick={() => router.push("/log-mood")}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
