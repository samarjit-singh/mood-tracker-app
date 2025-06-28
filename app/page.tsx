"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Plus, BarChart3, TrendingUp, Calendar, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MoodTracker</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How Are You Feeling Today?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your emotions, discover patterns, and gain insights into
              your mental wellbeing with our comprehensive mood tracking
              platform.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">5 entries</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Mood</p>
                  <p className="text-2xl font-bold text-gray-900">Good</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/log-mood">
              <Card className="bg-white border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 cursor-pointer group">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center transition-colors">
                      <Plus className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Log Your Mood
                      </h3>
                      <p className="text-gray-600">
                        Record how you&apos;re feeling right now
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Quick and easy mood logging with detailed emotion tracking
                    and impact factors.
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        View Analytics
                      </h3>
                      <p className="text-gray-600">
                        Analyze your mood patterns
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Comprehensive insights with charts, trends, and personalized
                    recommendations.
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
