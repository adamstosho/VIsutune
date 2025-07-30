# VisuTune 🎨🎵

**Where drawing meets music** - Transform your visual creativity into beautiful melodies in real-time.

## Introduction

VisuTune is an innovative web application that bridges the gap between visual art and music creation. It allows users to draw on a digital canvas and instantly hear their strokes transformed into musical notes. Each color represents a different instrument, creating a unique and intuitive way to compose music through visual expression.

## Problem & Solution

### The Problem
- Traditional music creation requires technical knowledge of instruments and music theory
- Visual artists often struggle to translate their creativity into musical compositions
- Existing music creation tools have steep learning curves
- There's a disconnect between visual creativity and musical expression

### The Solution
VisuTune solves these challenges by:
- **Simplifying Music Creation**: No musical knowledge required - just draw!
- **Bridging Art & Music**: Visual strokes become musical notes instantly
- **Intuitive Interface**: Color-coded instruments make composition easy
- **Real-time Feedback**: Hear your music as you create it

##  Main Features

### Visual Music Creation
- **Interactive Canvas**: Draw with your mouse or touch to create music
- **Real-time Playback**: Hear notes instantly as you draw
- **Color-coded Instruments**: 6 different instruments, each with a unique color

### 🎵 Musical Instruments
- **🔵 Blue**: Lead synth with sawtooth wave
- **🔴 Red**: Bass with FM synthesis
- **🟢 Green**: Pad with sine wave
- **🟡 Yellow**: Pluck string sound
- **🟣 Purple**: Bell sound
- **🩷 Pink**: Percussion sound

###  Live Looping
- **4-Bar Loops**: Automatic looping of your compositions
- **Tempo Control**: Adjust playback speed from 60-180 BPM
- **Play/Pause**: Control playback with simple buttons

###  Audio Controls
- **Master Volume**: Control overall output volume
- **Individual Instrument Volumes**: Adjust each instrument's volume
- **Real-time Effects**: Reverb, delay, distortion, and filter controls
- **Audio Initialization**: One-click audio setup

###  Beautiful Interface
- **Animated Landing Page**: Stunning introduction with smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with glassmorphism effects
- **Smooth Animations**: Professional transitions and hover effects

##  How to Use

### Getting Started
1. **Open the App**: Navigate to the application in your web browser
2. **Initialize Audio**: Click anywhere on the landing page to start audio
3. **Enter the App**: Click "Start Creating Music" to begin

### Creating Music
1. **Choose a Color**: Select from the color palette on the left side of the canvas
   - Each color represents a different instrument
   - Blue = Lead synth, Red = Bass, Green = Pad, etc.

2. **Draw on Canvas**: 
   - Click and drag to create strokes
   - Each stroke becomes a musical note
   - Longer strokes create longer notes
   - Different positions affect the pitch

3. **Adjust Brush Size**: Use the slider to change stroke thickness
   - Thicker strokes = louder notes
   - Thinner strokes = softer notes

### Playing Your Music
1. **Live Playback**: Notes play automatically as you draw
2. **Start Loop**: Click "Play Loop" to hear your composition loop
3. **Adjust Tempo**: Use the tempo slider to change playback speed
4. **Pause/Stop**: Use the play/pause button to control playback

### Audio Controls
1. **Master Volume**: Adjust overall volume with the main slider
2. **Instrument Volumes**: Control individual instrument volumes
3. **Effects**: 
   - **Reverb**: Add space and depth to your sound
   - **Delay**: Create echo effects
   - **Distortion**: Add grit and overdrive
   - **Filter**: Cut frequencies for different tones

### Navigation
- **Back to Landing**: Click the "← Back" button to return to the landing page
- **Clear Canvas**: Use "Clear Canvas" to start over
- **Test Instruments**: Use test buttons to hear each instrument

##  Tools & Technologies

### Frontend Framework
- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework

### Audio Engine
- **Tone.js**: Web Audio framework for music creation
- **Web Audio API**: Browser-based audio processing

### Animation & UI
- **Framer Motion**: Professional animations and transitions
- **React Hooks**: State management and side effects
- **Canvas API**: HTML5 canvas for drawing

### Development Tools
- **Node.js**: JavaScript runtime
- **npm**: Package manager
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing

### Browser Support
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

##  Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with Web Audio API support

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/visutune.git
   cd visutune
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - Click to initialize audio
   - Start creating music!

### Building for Production
```bash
npm run build
npm start
```

# Preview of the App Interface (Screenshots)
![screenshots](/public/screenshots/screencapture-visutune-vercel-app-2025-07-30-23_18_05.png)
Landing page of the app
![screenshots](/public/screenshots/screencapture-visutune-vercel-app-2025-07-30-23_18_24.png)
The app interface before drawing on canva
![screenshots](/public/screenshots/screencapture-visutune-vercel-app-2025-07-30-23_18_47.png)
The app interface after the after the drawing...

##  Use Cases

### For Musicians
- **Quick Sketching**: Rapidly prototype musical ideas
- **Visual Composition**: See your music as you create it
- **Inspiration**: Break creative blocks with visual input

### For Artists
- **Music Creation**: Turn visual art into music
- **Multimedia Projects**: Combine visual and audio elements
- **Creative Expression**: New way to express creativity

### For Educators
- **Music Education**: Teach music concepts visually
- **Creative Workshops**: Interactive art and music sessions
- **Student Projects**: Engaging way to learn composition

### For Everyone
- **Stress Relief**: Relaxing creative activity
- **Entertainment**: Fun way to create music
- **Social Sharing**: Share musical creations with friends

## 🔧 Technical Details

### Architecture
- **Component-Based**: Modular React components
- **Hook-Based**: Custom hooks for audio and state management
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliant interface

### Audio Processing
- **Real-time Synthesis**: Live audio generation
- **Effect Chain**: Professional audio effects
- **Volume Control**: Individual and master volume
- **Frequency Mapping**: Stroke-to-frequency conversion

### Performance
- **Optimized Rendering**: Efficient canvas updates
- **Memory Management**: Proper cleanup of audio resources
- **Smooth Animations**: 60fps animations with Framer Motion
- **Responsive Design**: Works on all screen sizes

##  Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Tone.js Team**: For the amazing Web Audio framework
- **Framer Motion**: For smooth animations
- **Tailwind CSS**: For the utility-first CSS framework
- **Next.js Team**: For the React framework

##  Support

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact us at support@visutune.com

##  Future Features

- **MIDI Export**: Export compositions to MIDI files
- **Project Saving**: Save and load compositions
- **Collaboration**: Real-time collaborative music creation
- **More Instruments**: Additional instrument types
- **Advanced Effects**: More audio effects and filters
- **Mobile App**: Native mobile application

---

**Made with ❤️ by ART_Redox for creators everywhere**

*VisuTune - Where every stroke tells a story* 