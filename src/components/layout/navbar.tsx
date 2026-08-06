"use client";

import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (dark) {
      html.classList.remove("dark");
      setDark(false);
    } else {
      html.classList.add("dark");
      setDark(true);
    }
  };

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          SaveAllHD
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}