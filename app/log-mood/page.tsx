"use client";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogMoodPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/log-mood/feeling-slider");
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
            <h1 className="text-lg font-semibold text-gray-900">Log Mood</h1>
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
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Log an Emotion or Mood
            </h1>
            <p className="text-gray-600">
              Tell us how you&apos;re feeling to start tracking your emotional
              wellbeing
            </p>
          </div>

          {/* Form Cards */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Current Emotion
                    </h3>
                    <p className="text-sm text-gray-500">
                      How you feel right now
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-blue-600 text-sm font-medium">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full py-3 bg-transparent">
                Cancel
              </Button>
            </Link>
            <Button
              onClick={handleNext}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
            >
              Continue
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              This information helps us provide better insights into your
              emotional patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
