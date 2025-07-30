"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as Tone from "tone"

export const useTone = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const synthsRef = useRef({})
  const loopRef = useRef(null)
  const strokesRef = useRef([])

  // Initialize Tone.js
  useEffect(() => {
    const initializeTone = async () => {
      try {
        await Tone.start()

        // Create different synths for different colors/instruments
        synthsRef.current = {
          // Blue - Lead synth
          "#3b82f6": new Tone.Synth({
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.8 },
          }).toDestination(),

          // Red - Bass
          "#ef4444": new Tone.FMSynth({
            harmonicity: 0.5,
            modulationIndex: 2,
            envelope: { attack: 0.1, decay: 0.3, sustain: 0.5, release: 1.2 },
          }).toDestination(),

          // Green - Pad
          "#10b981": new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: { attack: 0.5, decay: 0.3, sustain: 0.7, release: 2.0 },
          }).toDestination(),

          // Yellow - Pluck
          "#f59e0b": new Tone.PluckSynth({
            attackNoise: 1,
            dampening: 4000,
            resonance: 0.9,
          }).toDestination(),

          // Purple - Bell
          "#8b5cf6": new Tone.MetalSynth({
            frequency: 200,
            envelope: { attack: 0.001, decay: 1.4, release: 0.2 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5,
          }).toDestination(),

          // Pink - Noise
          "#ec4899": new Tone.NoiseSynth({
            noise: { type: "pink" },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.0, release: 0.8 },
          }).toDestination(),
        }

        // Set initial tempo
        Tone.Transport.bpm.value = 120

        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize Tone.js:", error)
      }
    }

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initializeTone()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("touchstart", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)

      // Cleanup
      if (loopRef.current) {
        loopRef.current.dispose()
      }
      Object.values(synthsRef.current).forEach((synth) => {
        synth.dispose()
      })
      Tone.Transport.stop()
    }
  }, [])

  const triggerNote = useCallback(
    (stroke) => {
      if (!isInitialized || !synthsRef.current[stroke.color]) return

      // Map stroke properties to musical parameters
      const synth = synthsRef.current[stroke.color]

      // Map stroke length to note duration (0.1s to 2s)
      const duration = Math.max(0.1, Math.min(2, stroke.length / 50))

      // Map stroke hue to pitch (C3 to C6)
      const baseNote = 48 // C3 in MIDI
      const noteOffset = (stroke.hue % 12) + Math.floor((stroke.hue % 48) / 4) * 12
      const midiNote = baseNote + noteOffset
      const frequency = Tone.Frequency(midiNote, "midi").toFrequency()

      // Map stroke speed to velocity/volume
      const velocity = stroke.duration ? Math.max(0.1, Math.min(1, 500 / stroke.duration)) : 0.5

      try {
        if (synth.triggerAttackRelease) {
          synth.triggerAttackRelease(frequency, duration, undefined, velocity)
        } else if (synth.triggerAttack && synth.triggerRelease) {
          synth.triggerAttack(frequency, undefined, velocity)
          setTimeout(() => synth.triggerRelease(), duration * 1000)
        }
      } catch (error) {
        console.warn("Error triggering note:", error)
      }
    },
    [isInitialized],
  )

  const startLoop = useCallback(
    (strokes) => {
      if (!isInitialized || strokes.length === 0) return

      strokesRef.current = strokes

      // Stop existing loop
      if (loopRef.current) {
        loopRef.current.dispose()
      }

      // Create a 4-bar loop (16 beats at current BPM)
      const loopLength = "4m" // 4 measures

      loopRef.current = new Tone.Loop((time) => {
        // Play all strokes with timing based on their creation order
        strokes.forEach((stroke, index) => {
          const noteTime = time + ((index * 0.1) % Tone.Time(loopLength).toSeconds())

          // Schedule the note
          Tone.Draw.schedule(() => {
            triggerNote(stroke)
          }, noteTime)
        })
      }, loopLength)

      loopRef.current.start(0)
      Tone.Transport.start()
    },
    [isInitialized, triggerNote],
  )

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.stop()
    }
    Tone.Transport.stop()
  }, [])

  const clearLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.dispose()
      loopRef.current = null
    }
    strokesRef.current = []
  }, [])

  const setTempo = useCallback(
    (bpm) => {
      if (isInitialized) {
        Tone.Transport.bpm.value = bpm
      }
    },
    [isInitialized],
  )

  return {
    triggerNote,
    startLoop,
    stopLoop,
    clearLoop,
    setTempo,
    isInitialized,
  }
}
