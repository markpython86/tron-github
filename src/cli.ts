#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs-extra";
import * as path from "path";

const program = new Command();

program
  .name("tron-github")
  .description(
    "Create an auto-playing Tron Light Cycles game on your GitHub contribution grid"
  )
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new Tron GitHub project")
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

      console.log(`🏍️ Tron GitHub project created successfully!`);
      console.log(`📁 Project location: ${projectPath}`);
      console.log(`\n🚀 Next steps:`);
      console.log(`   cd ${dir}`);
      console.log(`   npm install`);
      console.log(`   npm run dev`);
      console.log(`\n🌐 To deploy to GitHub Pages:`);
      console.log(`   1. Create a GitHub repository named "${dir}"`);
      console.log(`   2. Push your code to the repository`);
      console.log(
        `   3. Enable GitHub Pages in repository settings (source: GitHub Actions)`
      );
      console.log(
        `   4. Your game will be available at: https://${user}.github.io/${dir}/`
      );
      console.log(`\n📋 Add to your GitHub profile README:`);
      console.log(
        `\n[![Tron GitHub](https://${user}.github.io/${dir}/preview.png)](https://${user}.github.io/${dir}/)`
      );
      console.log(
        `\n🎮 Watch AI light cycles race through your contribution data!`
      );
    } catch (error) {
      console.error("❌ Error creating project:", error);
      process.exit(1);
    }
  });

program.parse();
