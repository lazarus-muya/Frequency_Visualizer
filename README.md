# Frequency Visualizer

A real-time interactive web application that demonstrates the fascinating world of cymatics and frequency visualization. Watch as particles form intricate Chladni patterns in response to different audio frequencies.

![Frequency Visualizer Demo](https://img.shields.io/badge/Demo-Live%20Demo-blue?style=for-the-badge&logo=github)

## 🌟 Features

- **Real-time Audio Generation**: Generate pure sine wave frequencies from 1 Hz to 22,000 Hz
- **Interactive Particle System**: 2000 particles that respond to frequency changes
- **Chladni Pattern Visualization**: Watch particles form geometric patterns based on frequency modes
- **Multiple Sample Rates**: Support for standard (44.1 kHz), professional (48 kHz), high-res (96 kHz), and ultra high-res (192 kHz) audio
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Customizable Duration**: Adjustable audio buffer length for optimal performance
- **Live Controls**: Real-time frequency adjustment with visual feedback

## 🎯 What is Cymatics?

Cymatics is the study of visible sound and vibration. When sound waves interact with particles on a surface, they create intricate geometric patterns. This application simulates this phenomenon by using mathematical models to create Chladni patterns - the beautiful geometric arrangements that form when a plate or membrane vibrates at specific frequencies.

## 🚀 Live Demo

Visit the live application: [Frequency Visualizer](https://yourusername.github.io/frequency_visualizer)

## 🛠️ Technologies Used

- **HTML5 Canvas**: For real-time particle rendering
- **Web Audio API**: For high-quality audio generation
- **Vanilla JavaScript**: Pure JavaScript for performance and compatibility
- **CSS3**: Modern styling with responsive design
- **GitHub Pages**: For hosting and deployment

## 📦 Installation

### Option 1: Clone the Repository
```bash
git clone https://github.com/yourusername/frequency_visualizer.git
cd frequency_visualizer
```

### Option 2: Download ZIP
1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the files to your desired location

## 🎮 Usage

### Basic Controls
1. **Frequency Slider**: Adjust the frequency from 1 Hz to 22,000 Hz
2. **Play/Pause Button**: Control audio playback
3. **Sample Rate**: Choose audio quality (44.1 kHz to 192 kHz)
4. **Duration**: Set audio buffer length (0.01s to 1.0s)

### How to Use
1. Open `index.html` in a modern web browser
2. Allow audio permissions when prompted
3. Use the frequency slider to explore different frequencies
4. Watch particles form Chladni patterns in real-time
5. Experiment with different sample rates and durations

### Understanding the Patterns
- **Low frequencies** (1-100 Hz): Simple, slow-moving patterns
- **Mid frequencies** (100-1000 Hz): More complex geometric shapes
- **High frequencies** (1000+ Hz): Intricate, rapidly changing patterns
- **Resonant frequencies**: Particles will form clear geometric arrangements

## 🔧 Technical Details

### Audio Generation
- Uses Web Audio API for high-quality sine wave generation
- Configurable sample rates from 44.1 kHz to 192 kHz
- Adjustable buffer duration for optimal performance
- Volume-limited to 0.1 for comfortable listening

### Particle System
- 2000 particles with physics-based movement
- Particles respond to frequency-dependent vibration patterns
- Mathematical models based on Chladni plate theory
- Real-time rendering at 60 FPS

### Frequency Modes
The application calculates frequency modes (m, n) that determine the pattern formation:
- **m**: Horizontal mode number (1-8)
- **n**: Vertical mode number (1-8)
- Patterns change as frequency increases, creating different geometric arrangements

## 🌐 Browser Compatibility

- ✅ Chrome 66+
- ✅ Firefox 60+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ⚠️ Internet Explorer: Not supported

## 📱 Mobile Support

- Responsive design that works on all screen sizes
- Touch-friendly controls for mobile devices
- Optimized performance for mobile browsers
- Collapsible navigation for small screens

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/(root)` folder
5. Your site will be available at `https://yourusername.github.io/frequency_visualizer`

### Manual Deployment
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your server to serve static files

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. **Report Bugs**: Open an issue with detailed bug reports
2. **Feature Requests**: Suggest new features or improvements
3. **Code Contributions**: Submit pull requests for bug fixes or enhancements
4. **Documentation**: Help improve this README or add code comments

### Development Setup
```bash
git clone https://github.com/yourusername/frequency_visualizer.git
cd frequency_visualizer
# Open index.html in your browser or use a local server
python -m http.server 8000  # Python 3
# or
npx serve .                  # Node.js
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the fascinating field of cymatics
- Built with modern web technologies for educational purposes
- Special thanks to the Web Audio API community

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure your browser supports Web Audio API
- Try refreshing the page if audio doesn't work

---

**Enjoy exploring the beautiful world of frequency visualization!** 🎵✨
