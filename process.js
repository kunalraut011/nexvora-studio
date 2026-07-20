const { Jimp } = require('jimp');

async function main() {
  try {
    const img = await Jimp.read('C:/Users/raut8/.gemini/antigravity/brain/4fe23625-7128-4f6a-acad-6aff5a6c6f01/media__1784568790709.png');
    
    // 1. Convert white to transparent and invert dark text to white for dark mode
    img.scan((x, y, idx) => {
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];
      
      // If it's near white, make transparent
      if (r > 220 && g > 220 && b > 220) {
        img.bitmap.data[idx + 3] = 0;
      }
      // If pixel is very dark (text), make it white for dark mode visibility
      else if (r < 50 && g < 50 && b < 50) {
        img.bitmap.data[idx] = 255;
        img.bitmap.data[idx+1] = 255;
        img.bitmap.data[idx+2] = 255;
      }
    });
    
    await img.write('public/logo-transparent.png');
    console.log('Saved logo-transparent.png');
    
    // Find bounding box for the icon on the left half (x < 450)
    let minX = 1024, maxX = 0, minY = 682, maxY = 0;
    img.scan((x, y, idx) => {
      if (x < 450) {
        const a = img.bitmap.data[idx + 3];
        if (a > 50) { // Not transparent
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    });
    
    const w = maxX - minX;
    const h = maxY - minY;
    // Make it a perfect square
    const size = Math.max(w, h);
    const cx = minX + w/2;
    const cy = minY + h/2;
    
    let cropX = cx - size/2;
    let cropY = cy - size/2;
    
    // Add a tiny bit of padding (5%)
    const padding = size * 0.05;
    const paddedSize = size + padding * 2;
    cropX -= padding;
    cropY -= padding;
    
    const icon = img.clone().crop({ x: cropX, y: cropY, w: paddedSize, h: paddedSize });
    
    const sizes = [16, 32, 48, 180, 512];
    for (const s of sizes) {
      const resized = icon.clone().resize({ w: s, h: s });
      await resized.write(`public/favicon-${s}.png`);
      console.log(`Saved favicon-${s}.png`);
    }
  } catch (e) {
    console.error(e);
  }
}

main();
