# VisuTune - Generative Audio-Visual Playground

A browser-based creative tool that transforms your drawings into music. Draw colorful strokes on the canvas and watch them come alive with synchronized audio and visual effects.

## Features

- **Interactive Drawing Canvas**: Draw freehand strokes with different colors and brush sizes
- **Real-time Audio Generation**: Each stroke triggers musical notes based on its properties
- **Color-to-Instrument Mapping**: Different colors produce different synthesizer sounds
- **Loop Playback**: Automatic 4-bar looping of your visual and audio creations
- **Visual Effects**: Animated particles and glow effects synchronized with playback
- **Tempo Control**: Adjust the BPM of your musical loops
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with Vite for fast development
- **TailwindCSS** for utility-first styling
- **Tone.js** for Web Audio API synthesis and scheduling
- **HTML5 Canvas** for drawing and visual effects

## Quick Start

1. **Clone and install dependencies:**
   \`\`\`bash
   git clone <repository-url>
   cd frontend
   npm install
   \`\`\`

2. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to \`http://localhost:3000\`

4. **Start creating:**
   - Click anywhere on the canvas to initialize audio
   - Draw colorful strokes
   - Hit play to loop your creation
   - Adjust tempo and experiment!

## How It Works

### Audio Mapping
- **Stroke Color** → **Instrument Type** (Lead, Bass, Pad, Pluck, Bell, Noise)
- **Stroke Length** → **Note Duration** (longer strokes = longer notes)
- **Stroke Hue** → **Pitch** (mapped to musical scales)
- **Drawing Speed** → **Note Velocity** (faster drawing = louder notes)

### Color Palette
- 🔵 **Blue**: Lead synthesizer with sawtooth waves
- 🔴 **Red**: FM bass synthesizer
- 🟢 **Green**: Ambient pad with sine waves  
- 🟡 **Yellow**: Plucked string synthesizer
- 🟣 **Purple**: Metallic bell sounds
- 🩷 **Pink**: Noise-based percussion

### Controls
- **Play/Pause**: Start/stop the 4-bar loop
- **Tempo Slider**: Adjust BPM from 60-180
- **Clear Canvas**: Reset everything
- **Brush Tools**: Change color and size

## Project Structure

\`\`\`
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CanvasDraw.jsx      # Drawing canvas with stroke capture
│   │   ├── Controls.jsx        # UI controls panel
│   │   └── Visualizer.jsx      # Visual effects and animations
│   ├── hooks/
│   │   └── useTone.js          # Tone.js integration and audio logic
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React entry point
│   └── index.css              # TailwindCSS styles
├── package.json
├── vite.config.js
└── tailwind.config.js
\`\`\`

## Development

### Available Scripts
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

### Key Components

**CanvasDraw.jsx**: Handles mouse/touch input, stroke recording, and real-time drawing feedback.

**useTone.js**: Custom hook that manages Tone.js synthesizers, transport scheduling, and audio parameter mapping.

**Visualizer.jsx**: Renders visual effects including glow effects and particle systems synchronized with audio playback.

**Controls.jsx**: Provides user interface for playback control, tempo adjustment, and session management.

## Browser Compatibility

- Modern browsers with Web Audio API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers with touch support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and experimentation!

---

**Happy creating! 🎨🎵**
