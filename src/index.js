const core = require('@actions/core');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    // Get inputs
    const githubUserName = core.getInput('github_user_name');
    const outputs = core.getInput('outputs');
    
    if (!githubUserName) {
      throw new Error('github_user_name is required');
    }
    
    console.log(`🎮 Generating Tron Light Cycles for ${githubUserName}`);
    
    // Parse the outputs input to get the files to generate
    const outputLines = outputs.split('\n').filter(line => line.trim());
    const generatedFiles = [];
    
    for (const line of outputLines) {
      if (line.trim()) {
        // Parse filename and theme
        const parts = line.split('?');
        const filename = parts[0];
        const themeParam = parts[1] ? parts[1].split('=')[1] : 'light';
        const theme = themeParam || 'light';
        
        console.log(`🎮 Generating ${filename} with theme: ${theme}`);
        
        try {
          // Generate the SVG file using the CLI tool
          const cliPath = path.join(__dirname, 'cli.js');
          const command = `node "${cliPath}" generate-svg --user "${githubUserName}" --output "${filename}" --theme "${theme}"`;
          
          execSync(command, { 
            cwd: process.cwd(),
            stdio: 'inherit'
          });
          
          if (fs.existsSync(filename)) {
            console.log(`✅ Successfully generated ${filename}`);
            generatedFiles.push(filename);
          } else {
            console.log(`❌ Failed to generate ${filename}`);
          }
        } catch (error) {
          console.error(`❌ Error generating ${filename}:`, error.message);
        }
      }
    }
    
    // Set output
    core.setOutput('generated-files', generatedFiles.join('\n'));
    
    console.log('🏍️ Tron Light Cycles SVG generation complete!');
    
  } catch (error) {
    console.error('❌ Action failed:', error.message);
    core.setFailed(error.message);
  }
}

run(); 