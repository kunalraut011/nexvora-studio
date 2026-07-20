const fs = require('fs');

function getDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    
    // Check JPEG
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
        let i = 4;
        while (i < buffer.length) {
            const marker = buffer[i - 2] * 256 + buffer[i - 1];
            const length = buffer[i] * 256 + buffer[i + 1];
            
            if (marker >= 0xFFC0 && marker <= 0xFFC3) {
                const height = buffer[i + 5] * 256 + buffer[i + 6];
                const width = buffer[i + 7] * 256 + buffer[i + 8];
                return { width, height };
            }
            i += length + 2;
        }
    }
    return null;
}

const dims = getDimensions('public/logo.jpg');
console.log('Dimensions:', dims);
