"use client"

import { useState, useCallback } from "react"
import CanvasDraw from "./components/CanvasDraw"
import Controls from "./components/Controls"
import Visualizer from "./components/Visualizer"
import { useTone } from "./hooks/useTone"

function App() {
  const [strokes, setStrokes] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [tempo, setTempo] = useState(120)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            VisuTune
          </h1>
          <p className="text-gray-300 text-lg">Draw to create music • Each stroke becomes a note • Loop and jam</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
        </div>

        <footer className="text-center mt-8 text-gray-400">
          <p className="text-sm">🎨 Draw with your mouse or touch • 🎵 Different colors = different instruments</p>
        </footer>
      </div>
    </div>
  )
}

export default App
