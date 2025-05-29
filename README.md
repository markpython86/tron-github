# 🏍️ Contrib Tron

**Play Tron Light Cycles on your GitHub contribution grid!**

Contrib Tron is a CLI tool that generates a playable Tron Light Cycles game using your real GitHub contribution calendar as the game board. Navigate your light cycle through your coding history while avoiding trails and edges!

![Contrib Tron Demo](https://user-images.githubusercontent.com/placeholder/demo.gif)

## ✨ Features

- 🎮 **Classic Tron Gameplay**: Control a light cycle that leaves a persistent trail
- 📊 **Real GitHub Data**: Uses your actual contribution calendar as the game board
- 🎨 **Beautiful Visuals**: Neon-styled graphics with glowing effects and particles
- 🚀 **Easy Deployment**: One-command setup with automatic GitHub Pages deployment
- 📱 **Embeddable**: Perfect for your GitHub profile README
- ⚡ **60fps Performance**: Smooth canvas-based rendering
- 🎯 **Progressive Difficulty**: Game speed increases as your score grows

## 🚀 Quick Start

### Installation

```bash
npm install -g contrib-tron
```

### Create Your Game

```bash
npx contrib-tron init --user YOUR_GITHUB_USERNAME
```

This creates a complete project with:

- 🎮 Fully functional Tron game
- 📦 Vite build configuration
- 🚀 GitHub Actions for auto-deployment
- 🎨 Beautiful, responsive UI

### Local Development

```bash
cd contrib-tron
npm install
npm run dev
```

### Deploy to GitHub Pages

1. **Push to GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/contrib-tron.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:

   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

3. **Your game will be live at**:
   ```
   https://YOUR_USERNAME.github.io/contrib-tron/
   ```

## 🎮 How to Play

- **Arrow Keys** or **WASD**: Control your light cycle direction
- **Space**: Pause/Resume game
- **Objective**: Survive as long as possible without hitting trails or edges
- **Scoring**: Your score increases with the length of your trail

### Game Rules

1. 🚫 **No 180° turns**: You can't reverse directly into your trail
2. 💥 **Avoid collisions**: Don't hit your trail or the grid edges
3. ⚡ **Speed increases**: The game gets faster as your score grows
4. 🎯 **Beat your high score**: Challenge yourself to improve!

## 📱 Embed in Your Profile

Add this to your GitHub profile README to showcase your game:

```html
<div align="center">
  <h3>🏍️ Play Tron on My Contribution Grid!</h3>
  <iframe
    src="https://YOUR_USERNAME.github.io/contrib-tron/"
    width="740"
    height="200"
    style="border:0; overflow:hidden; border-radius: 8px;"
    title="Contrib Tron Game"
  >
  </iframe>
  <p><em>Use arrow keys to play!</em></p>
</div>
```

## 🛠️ Project Structure

```
contrib-tron/
├── public/
│   └── index.html          # Game HTML with beautiful UI
├── src/
│   ├── api.ts             # GitHub data fetching & parsing
│   ├── renderer.ts        # Canvas rendering & visual effects
│   ├── game.ts           # Core Tron game logic
│   └── main.ts           # Game initialization & loop
├── .github/workflows/
│   └── gh-pages.yml      # Auto-deployment workflow
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Build configuration
```

## 🎨 Customization

### Render Configuration

Edit `src/main.ts` to customize the visual appearance:

```typescript
const RENDER_CONFIG: RenderConfig = {
  cellSize: 12, // Size of each grid cell
  cellGap: 2, // Gap between cells
  padding: 20, // Canvas padding
};
```

### Game Mechanics

Modify `src/game.ts` to adjust gameplay:

```typescript
// Starting speed (lower = faster)
this.speed = 200;

// Speed increase rate
this.speed = Math.max(100, 200 - Math.floor(this.score / 10) * 5);
```

### Visual Effects

Customize colors and effects in `src/renderer.ts`:

```typescript
// Cycle colors
ctx.fillStyle = "#00d4ff"; // Cyan cycle
ctx.fillStyle = "#00ff88"; // Green trail
```

## 🔧 API Reference

### CLI Commands

```bash
# Initialize new project
contrib-tron init --user <username> [--dir <directory>]

# Options:
#   --user <username>    GitHub username (required)
#   --dir <directory>    Project directory name (default: "contrib-tron")
```

### Game API

The game exposes a debug API on `window.contribTron`:

```javascript
// Access current game instance
window.contribTron.game();

// Restart game
window.contribTron.restart();

// Get current score
window.contribTron.getScore();

// Get game state
window.contribTron.getState();
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Setup

```bash
git clone https://github.com/contrib-tron/contrib-tron.git
cd contrib-tron
npm install
npm run dev
```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by the classic Tron Light Cycles game
- Built with modern web technologies (TypeScript, Vite, Canvas API)
- GitHub contribution calendar design inspiration

## 🐛 Issues & Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/contrib-tron/contrib-tron/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/contrib-tron/contrib-tron/discussions)
- 📧 **Support**: Open an issue with the `help wanted` label

---

<div align="center">
  <strong>Made with ❤️ for the GitHub community</strong><br>
  <em>Turn your coding journey into a game!</em>
</div>
