# 🎨 KreggsCode Sorting Visualizer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Now-brightgreen?style=for-the-badge&logo=github)](https://kreggscode.github.io/kreggscode-sorting-visualizer/)
[![GitHub](https://img.shields.io/badge/GitHub-kreggscode-blue?logo=github)](https://github.com/kreggscode/kreggscode-sorting-visualizer)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/kreggscode)

> **A professional, mobile-responsive sorting algorithm visualizer designed for creating stunning Instagram Reels, TikTok videos, and educational content.**

![Sorting Visualizer Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=KreggsCode+Sorting+Visualizer)

## ✨ Features

### 🔢 17 Sorting Algorithms

All major sorting algorithms with realistic implementations:

1. **Bubble Sort** - O(n²) - Simple comparison-based algorithm
2. **Insertion Sort** - O(n²) - Builds sorted array one item at a time
3. **Selection Sort** - O(n²) - Finds minimum and swaps
4. **Merge Sort** - O(n log n) - Divide and conquer approach
5. **Quick Sort** - O(n log n) - Partition-based sorting
6. **Heap Sort** - O(n log n) - Binary heap data structure
7. **Shell Sort** - O(n log n) - Generalized insertion sort
8. **Counting Sort** - O(n + k) - Non-comparison integer sorting
9. **Radix Sort** - O(nk) - Digit-by-digit sorting
10. **Bucket Sort** - O(n + k) - Distribution sort
11. **Cocktail Sort** - O(n²) - Bidirectional bubble sort
12. **Comb Sort** - O(n²/2ᵖ) - Improved bubble sort with gap
13. **Gnome Sort** - O(n²) - Simple comparison sort
14. **Bitonic Sort** - O(n log² n) - Parallel sorting algorithm
15. **Tim Sort** - O(n log n) - Hybrid merge/insertion sort
16. **Cycle Sort** - O(n²) - In-place with minimal writes
17. **Bogo Sort** - O((n+1)!) - Random permutation sort (for fun!)

### 🎯 Key Features

- ✅ **Mobile Responsive** - Perfect for phones, tablets, and desktops
- ✅ **Collapsible Controls** - Clean interface for recording
- ✅ **Customizable Colors** - Solid, Gradient, and Rainbow modes
- ✅ **Completion Effects** - Bars turn white with satisfying "ting" sound
- ✅ **Real-time Statistics** - Comparisons, swaps, and execution time
- ✅ **Sound Effects** - Musical tones based on bar heights
- ✅ **Grid View** - See 9 algorithms sorting simultaneously
- ✅ **Simultaneous Sorting** - Compare 2, 3, 4, or all algorithms
- ✅ **Beautiful Animations** - Smooth transitions and effects
- ✅ **No Dependencies** - Pure JavaScript, HTML, and CSS

## 🚀 Quick Start

### Option 1: Direct Use

1. **Clone the repository**
   ```bash
   git clone https://github.com/kreggscode/kreggscode-sorting-visualizer.git
   cd kreggscode-sorting-visualizer
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

### Option 2: Local Server

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000
```

## 📱 Usage Guide

### Main View (`index.html`)

**Perfect for focused algorithm comparisons**

1. **Select Algorithms**
   - Choose which algorithms to visualize
   - Select 2-4 for best comparison

2. **Customize Appearance**
   - **Color Modes**: Solid, Gradient, or Rainbow
   - **Bar Color**: Main color for bars
   - **Highlight Color**: Color during comparisons (default: magenta)
   - **Completion Color**: Color when sorted (default: white)

3. **Adjust Parameters**
   - **Array Size**: 10-200 elements
   - **Speed**: 1-200ms animation delay

4. **Control Playback**
   - **Generate Array**: Create new random array
   - **Start Sorting**: Begin visualization
   - **Stop**: Pause the sorting
   - **Reset**: Clear and start over

5. **Collapse Controls**
   - Click "⚙️ Controls" header to hide/show controls
   - Perfect for clean recording

### Grid View (`grid-view.html`)

**Perfect for overview and comparison videos**

- Shows 9 algorithms sorting simultaneously
- 3x3 grid layout on desktop
- Responsive: 2x2 on tablet, 1 column on mobile
- Minimal controls for clean look
- Great for thumbnails and overview content

## 🎨 Color Customization

### Gradient Mode (Recommended)
```
Start Color: #00ff00 (Green)
End Color: #00ffff (Cyan)
Result: Smooth color transition across bars
```

### Rainbow Mode
- Automatic full spectrum
- Most eye-catching
- Perfect for viral content

### Solid Mode
- Single color for all bars
- Clean, professional look
- Good for focusing on algorithm behavior

### Special Colors
- **Highlight Color**: Shows bars being compared/swapped
- **Completion Color**: All bars change to this when sorted

## 🔊 Sound Design

### During Sorting
- Frequency: `200 + (bar_value × 8)` Hz
- Creates musical effect as bars move
- Higher bars = higher pitch

### Completion Sound
- Frequency: 1200 Hz (sharp "ting")
- Duration: 150ms with quick attack/decay
- Similar to iPhone WhatsApp notification
- Indicates algorithm completion

## 📊 Algorithm Details

### Time Complexity Comparison

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Shell Sort | O(n log n) | O(n log² n) | O(n²) | O(1) |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n + k) |
| Tim Sort | O(n) | O(n log n) | O(n log n) | O(n) |
| Bogo Sort | O(n) | O((n+1)!) | O(∞) | O(1) |

### Algorithm Explanations

#### Bubble Sort
**How it works**: Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.

**Best for**: Educational purposes, small datasets

**Visualization**: You'll see adjacent bars comparing and swapping, with larger values "bubbling" to the end.

#### Merge Sort
**How it works**: Divides array into halves, recursively sorts them, then merges the sorted halves.

**Best for**: Large datasets, stable sorting needed

**Visualization**: Watch the array split and merge back together in sorted order.

#### Quick Sort
**How it works**: Picks a pivot element and partitions array around it, then recursively sorts partitions.

**Best for**: General purpose, average case performance

**Visualization**: See the partitioning process with elements moving around the pivot.

#### Heap Sort
**How it works**: Builds a max heap, then repeatedly extracts the maximum element.

**Best for**: Guaranteed O(n log n) performance

**Visualization**: Watch the heap structure form and elements being extracted.

#### Radix Sort
**How it works**: Sorts integers digit by digit, from least to most significant.

**Best for**: Integer sorting, fixed-length keys

**Visualization**: See bars organize by each digit position.

#### Bogo Sort (Fun Algorithm!)
**How it works**: Randomly shuffles the array until it happens to be sorted.

**Best for**: Demonstrating inefficiency, humor

**Visualization**: Watch chaos as the array randomly shuffles! (Limited to 1000 attempts for safety)

**⚠️ Warning**: Extremely inefficient! Only use with small arrays (10-20 elements).

## 🎬 Content Creation Tips

### For Instagram Reels

**Recommended Settings**:
- Array Size: 50-75
- Speed: 30-50ms
- Algorithms: 2-3 for comparison
- Color Mode: Gradient or Rainbow
- Completion Color: White

**Recording Tips**:
1. Collapse controls before recording
2. Use portrait mode
3. Include completion sound for satisfaction
4. Show before/after state
5. Add text overlays explaining the algorithm

### For TikTok

**Similar to Instagram**:
- Can add trending music over the audio
- Use text overlays to explain
- Show algorithm name and complexity
- Keep it under 60 seconds

### For YouTube Shorts

**Extended Format**:
- Can use Grid View for overview
- Show 3-4 algorithms for detailed comparison
- Explain the logic in voiceover
- Include time complexity in description

## 💻 Technical Details

### Technologies Used
- **Pure JavaScript** - No frameworks, fast and lightweight
- **HTML5 Canvas** - Smooth, efficient rendering
- **Web Audio API** - High-quality sound generation
- **CSS3 Animations** - Beautiful transitions and effects
- **Responsive Design** - Mobile-first approach

### Browser Compatibility
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Handles up to 200 elements smoothly
- 17 algorithms available
- Real-time audio generation
- Responsive at 60fps
- Minimal memory footprint

## 📁 Project Structure

```
sorting-visualizer/
├── index.html              # Main page with algorithm selector
├── grid-view.html          # Grid view showing 9 algorithms
├── sorting-visualizer.js   # Core visualization engine
├── algorithms.js           # All 17 sorting algorithm implementations
├── README.md              # This file
└── LICENSE                # MIT License
```

## 🎓 Educational Value

### Learning Features
- **Visual Understanding**: See exactly how algorithms work step-by-step
- **Performance Comparison**: Compare speeds and efficiency in real-time
- **Statistics**: Understand complexity through actual numbers
- **Multiple Algorithms**: Learn differences between approaches
- **Interactive**: Experiment with different array sizes and speeds

### Use Cases
- Computer Science education
- Algorithm visualization for students
- Technical interview preparation
- Educational content creation
- Algorithm performance analysis
- Teaching sorting concepts

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Ideas for Contributions
- Add more sorting algorithms
- Improve mobile responsiveness
- Add new color themes
- Enhance sound effects
- Add algorithm explanations
- Improve documentation
- Fix bugs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**KreggsCode**
- GitHub: [@kreggscode](https://github.com/kreggscode)
- Instagram: [@kreggscode](https://instagram.com/kreggscode)

## 🙏 Acknowledgments

- Inspired by the need for better algorithm visualization tools
- Built for content creators and educators
- Designed with mobile-first approach for social media

## 📧 Support

If you have any questions or need help:
- Open an issue on GitHub
- Follow [@kreggscode](https://instagram.com/kreggscode) on Instagram
- Star ⭐ this repository if you find it useful!

## 🎉 Show Your Support

If you like this project:
- ⭐ Star this repository
- 🍴 Fork it for your own use
- 📱 Share your creations on social media with #KreggsCode
- 🐛 Report bugs or suggest features

---

**Made with ❤️ by KreggsCode**

*Perfect for Instagram Reels, TikTok, YouTube Shorts, and Educational Content!*
