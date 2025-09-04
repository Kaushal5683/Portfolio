const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directories to process
const publicDir = path.join(__dirname, 'public');
const assetsImgDir = path.join(__dirname, 'src', 'assets', 'img');

// Function to process a directory recursively
const processDirectory = async (directory) => {
  // Read all files in the directory
  const items = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    
    if (item.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath);
    } else if (item.isFile()) {
      // Process image files
      if (/\.(png|jpe?g)$/i.test(item.name)) {
        const outputPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
        
        // Skip if WebP version already exists and is newer
        if (fs.existsSync(outputPath)) {
          const inputStat = fs.statSync(fullPath);
          const outputStat = fs.statSync(outputPath);
          
          if (outputStat.mtime > inputStat.mtime) {
            console.log(`Skipping ${item.name} - WebP version is up to date`);
            continue;
          }
        }
        
        try {
          console.log(`Converting ${item.name} to WebP...`);
          
          // Optimize based on image size
          const imageBuffer = fs.readFileSync(fullPath);
          const imageInfo = await sharp(imageBuffer).metadata();
          
          // Determine appropriate quality and resize if needed
          let quality = 80;
          let resizeOptions = null;
          
          // For larger images, use more aggressive optimization
          if (imageInfo.width > 1200 || imageInfo.height > 1200) {
            quality = 75;
            // Maintain aspect ratio but limit max dimension to 1200px
            const aspectRatio = imageInfo.width / imageInfo.height;
            resizeOptions = aspectRatio > 1 
              ? { width: 1200 } 
              : { height: 1200 };
          }
          
          // Process the image
          let sharpInstance = sharp(imageBuffer);
          
          // Apply resize if needed
          if (resizeOptions) {
            sharpInstance = sharpInstance.resize(resizeOptions);
          }
          
          // Convert to WebP with appropriate quality
          await sharpInstance
            .webp({ quality, effort: 6 }) // Higher effort = better compression
            .toFile(outputPath);
            
          console.log(`Successfully converted ${item.name} to WebP`);
          
          // Get file sizes for reporting
          const originalSize = fs.statSync(fullPath).size;
          const webpSize = fs.statSync(outputPath).size;
          const savingsPercent = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
          
          console.log(`Size reduction: ${savingsPercent}% (${(originalSize/1024).toFixed(2)}KB → ${(webpSize/1024).toFixed(2)}KB)`);
          
        } catch (error) {
          console.error(`Error converting ${item.name}:`, error.message);
        }
      }
    }
  }
};

// Main function
const optimizeImages = async () => {
  console.log('Starting image optimization...');
  console.log('Processing public directory...');
  await processDirectory(publicDir);
  console.log('Processing assets/img directory...');
  await processDirectory(assetsImgDir);
  console.log('Image optimization complete!');
};

optimizeImages();