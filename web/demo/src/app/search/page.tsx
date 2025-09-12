"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import Header from "@/components/header";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await fetch("/api/semantic-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input.trim() }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResults(data.results || []);
    } catch (err: any) {
      setError(err?.message || "Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to highlight headings and important info in the AI response
  function formatAIResponse(text: string) {
    // Bold headings (lines starting with # or ending with :)
    text = text.replace(
      /^([^\n]+:)/gm,
      '<h3 class="font-bold text-xl mb-3 mt-6 text-orange-700 dark:text-orange-400">$1</h3>'
    );
    text = text.replace(
      /^# (.+)$/gm,
      '<h2 class="font-bold text-2xl mb-4 mt-8 text-pink-700 dark:text-pink-400">$1</h2>'
    );
    // Bold numbered list items with better styling
    text = text.replace(
      /^(\d+\.\s)/gm,
      '<span class="font-bold inline-block w-8 text-orange-600 dark:text-orange-300">$1</span>'
    );
    // Italics for sentences between *
    text = text.replace(
      /\*(.*?)\*/g,
      '<em class="italic font-medium text-pink-700 dark:text-pink-300">$1</em>'
    );
    // Underline for sentences between _
    text = text.replace(
      /_(.*?)_/g,
      '<span class="underline decoration-pink-700 decoration-2 dark:decoration-pink-500">$1</span>'
    );
    // Highlight "Important" or "Note"
    text = text.replace(
      /(Important|Note|Key|Highlight)/gi,
      '<span class="font-bold bg-yellow-700/10 px-2 py-1 rounded text-yellow-700 dark:text-yellow-400 dark:bg-yellow-400/10">$1</span>'
    );
    // Better list formatting
    text = text.replace(
      /^- (.+)$/gm,
      '<li class="ml-4 mb-2 text-gray-800 dark:text-gray-200">• $1</li>'
    );
    return text;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0">
          <img
            src="/images/monastery-pattern-bg.svg"
            alt="Monastery pattern"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container-custom pt-32 pb-2 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Removed Back to Home button */}
            <h1
              className="font-heading text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white leading-tight"
              style={{ lineHeight: "1.1" }} // Fix for descenders being cut off
            >
              Monastery AI Search
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Ask about Sikkim's monasteries, sacred places, or cultural experiences. Get instant answers powered by AI.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container-custom py-8">
        {/* AI-powered Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3"
          >
            <motion.input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question about Sikkim monasteries..."
              className="flex-1 px-6 py-4 rounded-xl bg-transparent text-lg text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              autoFocus
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 dark:from-primary dark:to-secondary text-white font-bold shadow-lg flex items-center justify-center transition-all disabled:opacity-50 min-w-[4rem]"
              aria-label="Send"
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <FiSend className="w-6 h-6" />
              )}
            </motion.button>
          </form>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="text-center text-red-500 font-semibold mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              {error}
            </div>
          )}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 dark:from-primary dark:to-secondary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">AI</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">AI Response</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Powered by advanced AI models</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-pink-500 dark:from-primary dark:to-secondary rounded-full"></div>
                      <div
                        className="pl-8 text-lg leading-relaxed prose prose-lg max-w-none text-gray-800 dark:text-gray-200"
                        style={{ lineHeight: '1.8' }}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: formatAIResponse(result.text) }}
                      />
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Generated with AI • Accurate & Real-time
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Powered by</span>
                        <span className="text-xs font-semibold text-orange-500 dark:text-primary">Monastery360°</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}