"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ToneType {
  start: () => Promise<void>
  Synth: any
  FMSynth: any
  PolySynth: any
  PluckSynth: any
  MetalSynth: any
  NoiseSynth: any
  Transport: any
  Loop: any
  Time: any
  Draw: any
  Frequency: any
}

interface Stroke {
  id: number
  points: { x: number; y: number }[]
  color: string
  size: number
  startTime: number
  endTime?: number
  length?: number
  duration?: number
  hue: number
}

export const useTone = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [Tone, setTone] = useState<ToneType | null>(null)
  const synthsRef = useRef<Record<string, any>>({})
  const loopRef = useRef<any>(null)
  const strokesRef = useRef<Stroke[]>([])

  useEffect(() => {
    const initializeTone = async () => {
      try {
        const ToneModule = await import("tone")
        const ToneInstance = ToneModule
        setTone(ToneInstance)

        await ToneInstance.start()

        synthsRef.current = {
          "#3b82f6": new ToneInstance.Synth({
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.8 },
          }).toDestination(),

          "#ef4444": new ToneInstance.FMSynth({
            harmonicity: 0.5,
            modulationIndex: 2,
            envelope: { attack: 0.1, decay: 0.3, sustain: 0.5, release: 1.2 },
          }).toDestination(),

          "#10b981": new ToneInstance.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.5, decay: 0.3, sustain: 0.7, release: 2.0 },
          }).toDestination(),

          "#f59e0b": new ToneInstance.PluckSynth({
            attackNoise: 1,
            dampening: 4000,
            resonance: 0.9,
          }).toDestination(),

          "#8b5cf6": new ToneInstance.MetalSynth({
            envelope: { attack: 0.001, decay: 1.4, release: 0.2 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5,
          }).toDestination(),

          "#ec4899": new ToneInstance.MetalSynth({
            envelope: { attack: 0.001, decay: 0.4, release: 0.1 },
            harmonicity: 3.1,
            modulationIndex: 16,
            resonance: 2000,
            octaves: 0.5,
          }).toDestination(),
        }

        ToneInstance.Transport.bpm.value = 120

        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize Tone.js:", error)
      }
    }

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

      if (loopRef.current) {
        loopRef.current.dispose()
      }
      Object.values(synthsRef.current).forEach((synth) => {
        if (synth && synth.dispose) {
          synth.dispose()
        }
      })
      if (Tone) {
        Tone.Transport.stop()
      }
    }
  }, [Tone])

  const triggerNote = useCallback(
    (stroke: Stroke) => {
      if (!isInitialized || !Tone || !synthsRef.current[stroke.color]) {
        console.log("Cannot trigger note:", { isInitialized, hasTone: !!Tone, hasSynth: !!synthsRef.current[stroke.color], color: stroke.color })
        return
      }

      const synth = synthsRef.current[stroke.color]

      const duration = Math.max(0.1, Math.min(2, (stroke.length || 1) / 50))

      const baseFreq = 130.81 
      const semitoneRatio = Math.pow(2, 1/12) 
      const noteOffset = Math.floor((stroke.hue % 360) / 30) 
      const frequency = baseFreq * Math.pow(semitoneRatio, noteOffset)

      const velocity = stroke.duration ? Math.max(0.1, Math.min(1, 500 / stroke.duration)) : 0.5

      console.log("Triggering note:", { color: stroke.color, frequency, duration, velocity, synthType: synth.constructor.name })

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
    [isInitialized, Tone],
  )

  const startLoop = useCallback(
    (strokes: Stroke[]) => {
      if (!isInitialized || !Tone || strokes.length === 0) return

      strokesRef.current = strokes

      if (loopRef.current) {
        loopRef.current.dispose()
      }

      const loopLength = "4m" 

      loopRef.current = new Tone.Loop((time: number) => {
        strokes.forEach((stroke, index) => {
          const noteTime = time + ((index * 0.1) % Tone.Time(loopLength).toSeconds())

          Tone.Draw.schedule(() => {
            triggerNote(stroke)
          }, noteTime)
        })
      }, loopLength)

      loopRef.current.start(0)
      Tone.Transport.start()
    },
    [isInitialized, Tone, triggerNote],
  )

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.stop()
    }
    if (Tone) {
      Tone.Transport.stop()
    }
  }, [Tone])

  const clearLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.dispose()
      loopRef.current = null
    }
    strokesRef.current = []
  }, [])

  const setTempo = useCallback(
    (bpm: number) => {
      if (isInitialized && Tone) {
        Tone.Transport.bpm.value = bpm
      }
    },
    [isInitialized, Tone],
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
