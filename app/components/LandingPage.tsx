"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LandingPageProps {
  onEnterApp: () => void
}

const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const features = [
    {
      icon: "🎨",
      title: "Draw to Create",
      description: "Transform your strokes into musical notes in real-time"
    },
    {
      icon: "🎵",
      title: "6 Unique Instruments",
      description: "Each color represents a different musical instrument"
    },
    {
      icon: "🔄",
      title: "Live Looping",
      description: "Create 4-bar loops that play automatically"
    },
    {
      icon: "⚡",
      title: "Instant Playback",
      description: "Hear your music as you draw, no setup required"
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  const handleEnterApp = () => {
    setIsHovering(true)
    setTimeout(() => {
      onEnterApp()
    }, 500)
  }

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Music Notes */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10 text-2xl"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  rotate: 0
                }}
                animate={{
                  y: -100,
                  rotate: 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {["♪", "♫", "♬", "♩", "♭", "♯"][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}

            {/* Gradient Orbs */}
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -40, 0],
                y: [0, 50, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            {/* Logo and Title */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center mb-16"
            >
              <motion.h1
                className="text-8xl md:text-9xl font-bold mb-6"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #10b981, #f59e0b, #ef4444)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                VisuTune
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-2xl md:text-3xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
              >
                Where <span className="text-blue-400 font-semibold">drawing</span> meets{" "}
                <span className="text-purple-400 font-semibold">music</span>
              </motion.p>
            </motion.div>

            {/* Feature Showcase */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-16 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-2xl backdrop-blur-sm border ${
                      currentFeature === index
                        ? "bg-white/10 border-blue-400/50 shadow-lg shadow-blue-500/25"
                        : "bg-white/5 border-white/10"
                    } transition-all duration-500`}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="text-4xl"
                        animate={{
                          rotate: currentFeature === index ? [0, 10, -10, 0] : 0
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interactive Canvas Preview */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mb-16"
            >
              <div className="relative w-80 h-60 bg-black/30 rounded-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
                {/* Animated Strokes */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 30%, #3b82f6 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 70%, #ef4444 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 50%, #10b981 0%, transparent 50%)",
                      "radial-gradient(circle at 30% 80%, #f59e0b 0%, transparent 50%)",
                      "radial-gradient(circle at 70% 20%, #8b5cf6 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 60%, #ec4899 0%, transparent 50%)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{
                      x: Math.random() * 320,
                      y: Math.random() * 240,
                      opacity: 0
                    }}
                    animate={{
                      x: Math.random() * 320,
                      y: Math.random() * 240,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.button
                onClick={handleEnterApp}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-xl shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovering ? "0%" : "-100%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: isHovering ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    🎵
                  </motion.span>
                  Start Creating Music
                  <motion.span
                    animate={{ x: isHovering ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-16 text-center text-gray-400"
            >
              <p className="text-sm">
                Experience the magic of visual music creation
              </p>
              <div className="flex justify-center gap-6 mt-4 text-xs">
                <span>🎨 Draw</span>
                <span>🎵 Listen</span>
                <span>🔄 Loop</span>
                <span>✨ Create</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LandingPage 