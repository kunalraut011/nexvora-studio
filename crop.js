const { Jimp } = require('jimp');

async function processLogos() {
    try {
        console.log('Reading image...');
        const image = await Jimp.read('public/logo.jpg');
        
        // 1. Crop Horizontal Logo (Top Right)
        // Image is 769 x 1024
        const horizontal = image.clone().crop({ x: 370, y: 50, w: 380, h: 240 });
        
        // Make dark background transparent for horizontal logo
        horizontal.scan((x, y, idx) => {
            const r = horizontal.bitmap.data[idx + 0];
            const g = horizontal.bitmap.data[idx + 1];
            const b = horizontal.bitmap.data[idx + 2];
            // If pixel is very dark, make it transparent
            if (r < 25 && g < 25 && b < 30) {
                horizontal.bitmap.data[idx + 3] = 0; // alpha to 0
            }
        });
        await horizontal.write('public/horizontal.png');
        console.log('Saved horizontal.png');

        // 2. Crop Icon Only (Top Left)
        const icon = image.clone().crop({ x: 20, y: 50, w: 330, h: 330 });
        
        // Make dark background transparent for icon
        icon.scan((x, y, idx) => {
            const r = icon.bitmap.data[idx + 0];
            const g = icon.bitmap.data[idx + 1];
            const b = icon.bitmap.data[idx + 2];
            if (r < 25 && g < 25 && b < 30) {
                icon.bitmap.data[idx + 3] = 0;
            }
        });
        await icon.write('public/icon-only.png');
        console.log('Saved icon-only.png');
        
    } catch (e) {
        console.error(e);
    }
}

processLogos();
