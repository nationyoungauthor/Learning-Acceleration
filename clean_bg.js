const fs = require('fs');
const path = require('path');

const filesToProcess = [
  "About.jsx",
  "BrainAssessment.jsx",
  "Dashboard.jsx",
  "Contact.jsx",
  "Games.jsx",
  "HelpCenter.jsx",
  "HighScores.jsx",
  "IQTest.jsx",
  "Login.jsx",
  "PrivacyPolicy.jsx",
  "Progress.jsx",
  "QuizZone.jsx",
  "Terms.jsx"
];

const basePath = path.join(__dirname, 'src', 'pages');

for (const file of filesToProcess) {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace bg-slate-50 with bg-white
  content = content.replace(/bg-slate-50/g, 'bg-white');

  // Remove standard background shapes block
  const shapesRegex = /\{\/\*\s*(Background Shapes|Decorative Background Blobs|Visual background accents)[^*]*\*\/\}\s*<div[^>]*><\/div>\s*<div[^>]*><\/div>/g;
  content = content.replace(shapesRegex, '');

  // specific for Contact.jsx
  if (file === 'Contact.jsx') {
    content = content.replace(/<FloatingShapes \/>/g, '');
    const curvedFloorRegex = /\{\/\*\s*The curved white floor.*?\*\/\}\s*<div[^>]*><\/div>/g;
    content = content.replace(curvedFloorRegex, '');
    const contactDecorations = /\{\/\*\s*Background decorations\s*\*\/\}\s*<div[^>]*><\/div>\s*<div[^>]*><\/div>/g;
    content = content.replace(contactDecorations, '');
  }
  
  // specific for IQTest.jsx and Login.jsx (decorative clouds)
  const decorativeClouds = /\{\/\*\s*Decorative clouds.*?\*\/\}\s*(<div[^>]*>.*?<\/div>|)/g;
  content = content.replace(decorativeClouds, '');

  // Removing any stray Background Shapes comment that wasn't matched
  content = content.replace(/\{\/\*\s*Background Shapes[^}]*\}\s*/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${file}`);
}
