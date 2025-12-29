'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Home, Smile, Frown, Meh, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import { moodAPI } from '@/lib/api';

const moods = [
  { name: 'happy', emoji: '😊', icon: Smile, color: 'from-green-500 to-emerald-500' },
  { name: 'sad', emoji: '😢', icon: Frown, color: 'from-blue-500 to-cyan-500' },
  { name: 'anxious', emoji: '😰', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { name: 'angry', emoji: '😠', icon: Heart, color: 'from-red-500 to-pink-500' },
  { name: 'neutral', emoji: '😐', icon: Meh, color: 'from-gray-500 to-slate-500' },
  { name: 'excited', emoji: '🤩', icon: Zap, color: 'from-purple-500 to-pink-500' },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);
    try {
      await moodAPI.logMood(selectedMood, intensity, [], notes);
      setShowSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setSelectedMood('');
        setIntensity(5);
        setNotes('');
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to log mood:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-display font-bold gradient-text">MindfulAI</h1>
                <p className="text-sm text-slate-400">Mood Tracker</p>
              </div>
            </div>
            
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-all"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              How are you feeling today?
            </h2>
            <p className="text-xl text-slate-400">
              Track your emotions to understand patterns and triggers
            </p>
          </motion.div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-6 mb-8 text-center border-2 border-green-500"
            >
              <p className="text-green-400 text-lg font-semibold">✓ Mood logged successfully!</p>
            </motion.div>
          )}

          {/* Mood Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Select Your Mood</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {moods.map((mood) => (
                <motion.button
                  key={mood.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood.name)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedMood === mood.name
                      ? `border-purple-500 bg-gradient-to-br ${mood.color} bg-opacity-20`
                      : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                  }`}
                >
                  <div className="text-5xl mb-2">{mood.emoji}</div>
                  <p className="text-lg font-semibold capitalize">{mood.name}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Intensity Slider */}
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 mb-8"
            >
              <h3 className="text-2xl font-display font-semibold mb-6">
                Intensity: {intensity}/10
              </h3>
              
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              
              <div className="flex justify-between text-sm text-slate-400 mt-2">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </motion.div>
          )}

          {/* Notes */}
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 mb-8"
            >
              <h3 className="text-2xl font-display font-semibold mb-6">
                Notes (Optional)
              </h3>
              
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What triggered this feeling? Any thoughts you'd like to capture..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
                rows={4}
              />
            </motion.div>
          )}

          {/* Submit Button */}
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-full font-semibold text-lg transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging...' : 'Log Mood'}
              </button>
            </motion.div>
          )}

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Want to talk about it? <span className="underline">Chat with MindfulAI</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
