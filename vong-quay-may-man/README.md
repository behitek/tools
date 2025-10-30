# Lucky Wheel - Random Decision Maker

A fun and interactive lucky wheel application for making random decisions. Perfect for games, giveaways, or choosing between options!

## Features

### 🎯 Core Functionality
- **Interactive Spinning Wheel**: Smooth animations with realistic physics
- **Random Selection**: Fair and unbiased random item selection
- **Visual Feedback**: Beautiful animations and winner celebrations

### 📝 Item Management
- **Add/Remove Items**: Easy item management with edit functionality
- **Bulk Import**: Add multiple items at once via text input
- **Auto Color Assignment**: Each item gets a unique color automatically
- **Edit Items**: Modify existing item names inline

### 📊 Statistics & History
- **Spin Tracking**: Count total number of spins
- **Winner Statistics**: Track how many times each item has won
- **Most Frequent**: See which item wins most often
- **Recent History**: View the last 10 spin results with timestamps

### 🎨 Visual Effects
- **Confetti Celebration**: Animated confetti when someone wins
- **Sound Effects**: Audio feedback for different actions
- **Smooth Animations**: Professional transitions and micro-interactions
- **Responsive Design**: Works perfectly on all devices

### 💾 Data Persistence
- **Local Storage**: All data saved automatically in browser
- **Privacy First**: No data sent to servers - everything stays local
- **Auto-save**: Changes saved instantly

### ⚙️ Customization
- **Toggle Sounds**: Enable/disable sound effects
- **Toggle Confetti**: Control celebration effects
- **Show Spin Duration**: Optional timing display

## How to Use

1. **Add Items**: Enter item names one by one or use bulk import
2. **Spin the Wheel**: Click the center button to spin
3. **View Results**: See the winner and celebrate with confetti
4. **Track Statistics**: Monitor spin history and win patterns

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Browsers

## File Structure

```
wheel/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and animations
├── script.js       # Application logic and interactions
└── README.md       # Documentation
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: No frameworks required
- **Canvas API**: Wheel rendering and confetti effects
- **Web Audio API**: Sound effect generation
- **LocalStorage**: Client-side data persistence

### Key Features Implementation
- **Physics Simulation**: Realistic wheel deceleration
- **Canvas Drawing**: Dynamic wheel rendering
- **Color Generation**: Automatic color assignment algorithm
- **Responsive Grid**: Mobile-first design approach
- **Toast Notifications**: User-friendly feedback system

## Getting Started

1. Clone or download the files
2. Open `index.html` in your web browser
3. Start adding items and spinning!

## Customization

### Adding Custom Colors
Edit the `generateColor()` method in `script.js` to customize the color palette.

### Modifying Animation Speed
Adjust the `spinVelocity` and friction values in the `spin()` method.

### Custom Sound Effects
Modify the `playSound()` method to use custom audio files instead of generated tones.

## Privacy & Security

- **No Data Collection**: All data stored locally in browser
- **No External Dependencies**: Works completely offline
- **Secure Storage**: Uses browser's secure LocalStorage API

## License

This project is open source and available under the MIT License.

---

Enjoy spinning and making decisions the fun way! 🎉