"use client"

interface ControlsProps {
  isPlaying: boolean
  tempo: number
  onPlay: () => void
  onTempoChange: (tempo: number) => void
  onClear: () => void
  isInitialized: boolean
  strokeCount: number
  testSynth?: (color: string) => void
}

const Controls = ({ isPlaying, tempo, onPlay, onTempoChange, onClear, isInitialized, strokeCount, testSynth }: ControlsProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold mb-6 text-center">Controls</h3>

      {/* Play/Pause Button */}
      <div className="mb-6">
        <button
          onClick={onPlay}
          disabled={!isInitialized || strokeCount === 0}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isPlaying
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
          }`}
        >
          {isPlaying ? "⏸️ Pause" : "▶️ Play Loop"}
        </button>

        {!isInitialized && <p className="text-xs text-yellow-400 mt-2 text-center">Click to initialize audio</p>}

        {strokeCount === 0 && isInitialized && (
          <p className="text-xs text-gray-400 mt-2 text-center">Draw something first!</p>
        )}
      </div>

      {/* Tempo Control */}
      <div className="mb-6">
        <label htmlFor="tempo-slider" className="block text-sm font-medium mb-2">Tempo: {tempo} BPM</label>
        <input
          id="tempo-slider"
          type="range"
          min="60"
          max="180"
          value={tempo}
          onChange={(e) => onTempoChange(Number.parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          aria-label="Adjust tempo"
          title="Adjust playback tempo"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Clear Button */}
      <div className="mb-6">
        <button onClick={onClear} className="w-full btn-secondary" disabled={strokeCount === 0}>
          🗑️ Clear Canvas
        </button>
      </div>

      {/* Test Synths */}
      {testSynth && isInitialized && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Test Synths</h4>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => testSynth("#3b82f6")} className="btn-primary text-xs py-2">Test Blue</button>
            <button onClick={() => testSynth("#10b981")} className="btn-primary text-xs py-2">Test Green</button>
            <button onClick={() => testSynth("#ec4899")} className="btn-primary text-xs py-2">Test Pink</button>
            <button onClick={() => testSynth("#ef4444")} className="btn-primary text-xs py-2">Test Red</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium mb-2">Session Stats</h4>
        <div className="space-y-1 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Strokes:</span>
            <span>{strokeCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={isPlaying ? "text-green-400" : "text-gray-400"}>{isPlaying ? "Playing" : "Stopped"}</span>
          </div>
          <div className="flex justify-between">
            <span>Audio:</span>
            <span className={isInitialized ? "text-green-400" : "text-yellow-400"}>
              {isInitialized ? "Ready" : "Initializing"}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-xs text-gray-400 space-y-1">
        <p>
          🎨 <strong>Draw:</strong> Click and drag to create strokes
        </p>
        <p>
          🎵 <strong>Colors:</strong> Different colors = different instruments
        </p>
        <p>
          🔄 <strong>Loop:</strong> 4-bar automatic looping
        </p>
        <p>
          ⚡ <strong>Live:</strong> Notes play as you draw
        </p>
      </div>
    </div>
  )
}

export default Controls
