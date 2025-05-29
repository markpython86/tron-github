#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs-extra";
import * as path from "path";

const program = new Command();

program
  .name("tron-github")
  .description("Play Tron Light Cycles on your GitHub contribution grid")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new tron-github project")
  .requiredOption("--user <username>", "GitHub username")
  .option("--dir <directory>", "Project directory name", "tron-github")
  .action(async (options) => {
    const { user, dir } = options;
    const projectPath = path.resolve(process.cwd(), dir);

    try {
      // Create project directory
      await fs.ensureDir(projectPath);

      // Copy template files
      const templatePath = path.join(__dirname, "..", "templates");
      await fs.copy(templatePath, projectPath);

      // Update main.ts with the username
      const mainTsPath = path.join(projectPath, "src", "main.ts");
      let mainTsContent = await fs.readFile(mainTsPath, "utf-8");
      mainTsContent = mainTsContent.replace("__GITHUB_USERNAME__", user);
      await fs.writeFile(mainTsPath, mainTsContent);

      // Update package.json name
      const packageJsonPath = path.join(projectPath, "package.json");
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = `${user}-tron-github`;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      console.log(`✅ tron-github project created successfully!`);
      console.log(`📁 Project location: ${projectPath}`);
      console.log(`\n🚀 Next steps:`);
      console.log(`   cd ${dir}`);
      console.log(`   npm install`);
      console.log(`   npm run dev`);
      console.log(`\n🌐 To deploy to GitHub Pages:`);
      console.log(`   1. Push to GitHub`);
      console.log(`   2. Enable GitHub Pages in repository settings`);
      console.log(`   3. Add this to your profile README:`);
      console.log(`\n<iframe`);
      console.log(`  src="https://${user}.github.io/${dir}/"`);
      console.log(`  width="740" height="200"`);
      console.log(`  style="border:0; overflow:hidden;">`);
      console.log(`</iframe>`);
    } catch (error) {
      console.error("❌ Error creating project:", error);
      process.exit(1);
    }
  });

program.parse();
