'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, BarChart3, BookOpen, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-display font-bold gradient-text">MindfulAI</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4"
            >
              <Link 
                href="/chat"
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Your <span className="gradient-text">24/7 Mental Health</span> Companion
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
                AI-powered emotional support, mood tracking, and personalized coping strategies. 
                Always here, always listening, never judging.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/chat"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start Chatting
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Link>
                
                <Link
                  href="/mood"
                  className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white rounded-full font-semibold text-lg transition-all hover:scale-105 backdrop-blur-sm border border-slate-700"
                >
                  Track Your Mood
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Everything You Need to Feel Better
          </h2>
          <p className="text-xl text-slate-400">
            Comprehensive mental health support in one place
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-8 hover:bg-slate-800/50 transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands finding peace and support with MindfulAI. 
            Your mental health matters, and we're here to help.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full font-semibold text-lg transition-all hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Start Free Now
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-slate-800">
        <div className="text-center text-slate-400">
          <p className="mb-4">
            <strong className="text-white">Crisis Support:</strong> If you're in crisis, please call 
            <a href="tel:1-800-273-8255" className="text-purple-400 hover:text-purple-300 ml-1">
              1-800-273-8255
            </a> or text HOME to 741741
          </p>
          <p className="text-sm">
            Built with ❤️ for Hackathon 2024 | MindfulAI is not a replacement for professional therapy
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    title: "AI Chat Support",
    description: "Empathetic conversations powered by GPT-4. Available 24/7, always ready to listen."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    title: "Mood Tracking",
    description: "Identify patterns and triggers with beautiful visualizations of your emotional journey."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-white" />,
    title: "Private Journal",
    description: "Secure space for your thoughts with AI-powered sentiment analysis and insights."
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Crisis Detection",
    description: "Real-time support when you need it most, with immediate access to helplines."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    title: "Coping Strategies",
    description: "Personalized techniques including breathing exercises and meditation guides."
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: "Smart Insights",
    description: "AI-powered analysis helps you understand your mental health patterns better."
  }
];
