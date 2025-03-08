const fs = require('fs');
const path = require('path');

const endpointsDir = path.join(__dirname, 'api-reference', 'endpoint');

fs.readdirSync(endpointsDir).forEach(file => {
  const filePath = path.join(endpointsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if file starts with frontmatter
  if (content.startsWith('---')) {
    const endOfFrontmatter = content.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      let frontmatter = content.substring(0, endOfFrontmatter + 3);
      if (!frontmatter.includes('authMethod')) {
        // Insert authMethod: "bearer" after the opening ---
        frontmatter = frontmatter.replace('---', '---\nauthMethod: "bearer"');
        content = frontmatter + content.substring(endOfFrontmatter + 3);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
      }
    }
  }
});
