"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CanvasDraw from "./components/CanvasDraw"
import Controls from "./components/Controls"
import Visualizer from "./components/Visualizer"
import LandingPage from "./components/LandingPage"
import { useTone } from "./hooks/useTone"

export default function Page() {
  const [strokes, setStrokes] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [tempo, setTempo] = useState(120)
  const [showLanding, setShowLanding] = useState(true)

  const { triggerNote, startLoop, stopLoop, clearLoop, setTempo: setAudioTempo, isInitialized } = useTone()

  const handleStrokeComplete = useCallback(
    (stroke) => {
      setStrokes((prev) => [...prev, stroke])
      if (isInitialized) {
        triggerNote(stroke)
      }
    },
    [triggerNote, isInitialized],
  )

  const handlePlay = useCallback(() => {
    if (!isInitialized) return

    if (isPlaying) {
      stopLoop()
      setIsPlaying(false)
    } else {
      startLoop(strokes)
      setIsPlaying(true)
    }
  }, [isPlaying, startLoop, stopLoop, strokes, isInitialized])

  const handleTempoChange = useCallback(
    (newTempo) => {
      setTempo(newTempo)
      setAudioTempo(newTempo)
    },
    [setAudioTempo],
  )

  const handleClear = useCallback(() => {
    setStrokes([])
    clearLoop()
    if (isPlaying) {
      stopLoop()
      setIsPlaying(false)
    }
  }, [clearLoop, stopLoop, isPlaying])

  const handleEnterApp = useCallback(() => {
    setShowLanding(false)
  }, [])

  const handleBackToLanding = useCallback(() => {
    setShowLanding(true)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <LandingPage key="landing" onEnterApp={handleEnterApp} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        >
          <div className="container mx-auto px-4 py-8">
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8 relative"
            >
              <motion.button
                onClick={handleBackToLanding}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all border border-white/20"
              >
                ← Back
              </motion.button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                VisuTune
              </h1>
              <p className="text-gray-300 text-lg">Draw to create music • Each stroke becomes a note • Loop and jam</p>
            </motion.header>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              {/* Canvas Area */}
              <div className="lg:col-span-3">
                <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                  <CanvasDraw onStrokeComplete={handleStrokeComplete} isPlaying={isPlaying} />
                  <Visualizer strokes={strokes} isPlaying={isPlaying} />
                </div>
              </div>

              {/* Controls Panel */}
              <div className="lg:col-span-1">
                <Controls
                  isPlaying={isPlaying}
                  tempo={tempo}
                  onPlay={handlePlay}
                  onTempoChange={handleTempoChange}
                  onClear={handleClear}
                  isInitialized={isInitialized}
                  strokeCount={strokes.length}
                />
              </div>
            </motion.div>

            <motion.footer
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-8 text-gray-400"
            >
              <p className="text-sm">🎨 Draw with your mouse or touch • 🎵 Different colors = different instruments</p>
            </motion.footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
