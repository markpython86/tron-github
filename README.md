# 🏍️ Contrib Tron

Transform your GitHub contribution grid into an auto-playing Tron Light Cycles arena! Watch AI-controlled motorcycles race through your coding activity, leaving glowing trails in their wake.

## ✨ Features

- **Auto-Playing Game**: Watch AI light cycles race without any interaction needed
- **Real GitHub Data**: Uses your actual contribution patterns as the game arena
- **Advanced AI**: Neural network-inspired pathfinding with 8 evaluation factors
- **Continuous Loop**: Perfect for embedding in GitHub profiles
- **Easy Setup**: One command creates a complete project
- **Auto-Deploy**: GitHub Actions automatically deploys to GitHub Pages

## 🚀 Quick Start

```bash
npx contrib-tron init --user YOUR_GITHUB_USERNAME
cd tron-github
npm install
npm run dev
```

## 🎮 How It Works

1. **Fetches Your Data**: Pulls your GitHub contribution SVG
2. **Maps the Arena**: Converts 7×52 grid (days × weeks) into game space
3. **AI Racing**: 4 light cycles with different strategies compete
4. **Persistent Trails**: Cycles leave permanent light trails
5. **Collision Detection**: Game resets when cycles crash

## 🤖 AI System

Each light cycle uses sophisticated pathfinding with:

- **Safety Analysis**: 10-step collision lookahead
- **Space Evaluation**: Open area detection
- **Edge Avoidance**: Boundary risk assessment
- **Memory System**: Path diversity tracking
- **Future Planning**: Multi-step option evaluation
- **Exploration Bonus**: Encourages new territory
- **Weighted Decisions**: Softmax-style action selection

## 📦 Project Structure

```
your-tron-project/
├── src/
│   ├── main.ts          # Game initialization
│   ├── game.ts          # Core game logic
│   ├── renderer.ts      # Canvas rendering
│   └── api.ts           # GitHub data fetching
├── index.html           # Game interface
├── package.json         # Dependencies
└── .github/workflows/   # Auto-deployment
```

## 🌐 Deployment

The generated project includes GitHub Actions for automatic deployment:

1. Create a GitHub repository
2. Push your code
3. Enable GitHub Pages (source: GitHub Actions)
4. Your game will be live at `https://username.github.io/repo-name/`

## 📋 Embed in Profile

Add this to your GitHub profile README:

```markdown
[![Tron GitHub](https://username.github.io/tron-github/preview.png)](https://username.github.io/tron-github/)

🎮 Watch AI light cycles race through my contribution data!
```

## 🎯 Game Mechanics

- **4 AI Cycles**: Cyan, Red, Orange, Green
- **Scoring**: `survivalTime * 10 + activeCycles * 5 + trailLength`
- **Auto-Restart**: 1-second delay between games
- **Real-Time**: Updates with your latest GitHub activity

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📊 Technical Details

- **Canvas Rendering**: Smooth 60fps animation
- **TypeScript**: Full type safety
- **Vite**: Fast development and building
- **Responsive**: Adapts to different screen sizes
- **No Dependencies**: Pure vanilla implementation

## 🎨 Customization

The generated project is fully customizable:

- Modify AI behavior in `game.ts`
- Adjust visual styling in `renderer.ts`
- Change game rules and scoring
- Add new cycle types or behaviors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this in your own projects!

## 🎉 Examples

Check out these live examples:

- [Demo Game](https://username.github.io/tron-github/) - See it in action
- [Profile Integration](https://github.com/username) - Embedded in README

---

**Transform your GitHub profile into a gaming arena!** 🏍️✨
