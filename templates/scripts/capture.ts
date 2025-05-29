#!/usr/bin/env tsx

import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs/promises";
import path from "path";

interface CaptureFrame {
  data: Buffer;
  timestamp: number;
}

interface CaptureConfig {
  duration: number;
  frameRate: number;
  width: number;
  height: number;
}

const DEFAULT_CONFIG: CaptureConfig = {
  duration: 10000, // 10 seconds
  frameRate: 30, // 30 fps
  width: 740,
  height: 200,
};

class TronGameCapture {
  private config: CaptureConfig;
  private browser: Browser | null = null;

  constructor(config: Partial<CaptureConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async captureGame(username: string, outputPath: string): Promise<string> {
    console.log(`🎮 Starting Tron GitHub capture for ${username}...`);

    this.browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await this.browser.newPage();

      // Set viewport
      await page.setViewport({
        width: this.config.width,
        height: this.config.height,
        deviceScaleFactor: 1,
      });

      // Navigate to the game
      const gameUrl = `file://${path.resolve("./dist/index.html")}`;
      console.log(`📱 Loading game: ${gameUrl}`);

      await page.goto(gameUrl, { waitUntil: "networkidle0" });

      // Wait for game to initialize
      await page.waitForSelector("#gameCanvas", { visible: true });
      console.log("🎯 Game loaded, starting capture...");

      // Capture frames
      const frames = await this.captureFrames(page);

      // Generate SVG animation
      const svg = await this.generateAnimatedSVG(frames, username);

      // Ensure output directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      // Write SVG file
      await fs.writeFile(outputPath, svg);
      console.log(`💾 Saved animation to ${outputPath}`);

      return svg;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  private async captureFrames(page: Page): Promise<CaptureFrame[]> {
    const frames: CaptureFrame[] = [];
    const frameInterval = 1000 / this.config.frameRate;
    const totalFrames = Math.floor(this.config.duration / frameInterval);

    for (let i = 0; i < totalFrames; i++) {
      const canvas = await page.$("#gameCanvas");
      if (!canvas) {
        throw new Error("Game canvas not found");
      }

      const screenshot = await canvas.screenshot({
        type: "png",
        omitBackground: true,
      });

      frames.push({
        data: screenshot,
        timestamp: i * frameInterval,
      });

      if (i % 30 === 0) {
        console.log(`📸 Captured frame ${i}/${totalFrames}`);
      }

      await page.waitForTimeout(frameInterval);
    }

    console.log(`✅ Captured ${frames.length} frames`);
    return frames;
  }

  private async generateAnimatedSVG(
    frames: CaptureFrame[],
    username: string
  ): Promise<string> {
    const { width, height, duration } = this.config;
    const durationSeconds = duration / 1000;

    // Create frame animations
    const frameAnimations = frames
      .map((_, i) => {
        const startPercent = ((i / frames.length) * 100).toFixed(2);
        const endPercent = (((i + 1) / frames.length) * 100).toFixed(2);

        return `
      .frame-${i} {
        animation: frame-${i}-anim ${durationSeconds}s linear infinite;
      }
      
      @keyframes frame-${i}-anim {
        ${startPercent}% { opacity: 1; }
        ${endPercent}% { opacity: 0; }
      }`;
      })
      .join("");

    // Create frame images
    const frameImages = frames
      .map(
        (frame, i) => `
  <image x="0" y="0" width="${width}" height="${height}" 
         class="frame frame-${i}"
         xlink:href="data:image/png;base64,${frame.data.toString("base64")}" />`
      )
      .join("");

    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      .frame { opacity: 0; }
      .frame.active { opacity: 1; }
      ${frameAnimations}
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#0d1117"/>
  
  <!-- Title -->
  <text x="20" y="25" fill="#00d4ff" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
    🏍️ ${username}'s Tron GitHub - Live Capture
  </text>
  
  <!-- Animated frames -->
  ${frameImages}
  
  <!-- Footer -->
  <text x="20" y="${
    height - 10
  }" fill="#8b949e" font-family="Arial, sans-serif" font-size="12">
    Auto-generated from real GitHub contribution data • Updates daily
  </text>
</svg>`;

    return svg;
  }
}

// Main execution
async function main(): Promise<void> {
  const username = process.argv[2] || "markpython86";
  const outputPath = process.argv[3] || "./output/tron-github-live.svg";

  try {
    const capture = new TronGameCapture();
    await capture.captureGame(username, outputPath);
    console.log("🎉 Capture completed successfully!");
  } catch (error) {
    console.error("❌ Capture failed:", error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
