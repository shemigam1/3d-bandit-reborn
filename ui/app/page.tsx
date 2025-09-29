"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [visibleWords, setVisibleWords] = useState([false, false, false]);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleWords([true, false, false]), 200),
      setTimeout(() => setVisibleWords([true, true, false]), 500),
      setTimeout(() => setVisibleWords([true, true, true]), 800),
      setTimeout(() => setShowButtons(true), 1500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-12">
        {/* Welcome Text Animation */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            <span
              className={`inline-block transition-all duration-600 ease-out ${
                visibleWords[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Welcome
            </span>{" "}
            <span
              className={`inline-block transition-all duration-600 ease-out ${
                visibleWords[1]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              to
            </span>{" "}
            <span
              className={`inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-600 ease-out ${
                visibleWords[2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              3D Bandit
            </span>
          </h1>
        </div>

        {/* Buttons */}
        <div
          className={`flex flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out ${
            showButtons
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/auth/login"
            // size="lg"
            className="px-8 py-6 text-lg bg-white text-slate-900 hover:bg-gray-200 hover:text-slate-900 hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            // size="lg"
            // variant="outline"
            className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-gray-200 hover:text-slate-900 hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
        <p className="text-center text-white text-3xl">
          The Google Drive killer
        </p>
      </div>
    </div>
  );
}
