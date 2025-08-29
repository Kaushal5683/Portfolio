const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Convert PNG and JPG files in public directory to WebP
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);

// Process files sequentially with promises
const processFiles = async () => {
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace(/\.(png|jpg)$/, '.webp'));
      
      try {
        console.log(`Converting ${file} to WebP...`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully converted ${file} to WebP`);
      } catch (error) {
        console.error(`Error converting ${file}:`, error.message);
      }
    }
  }
  console.log('Conversion complete!');
};

processFiles();