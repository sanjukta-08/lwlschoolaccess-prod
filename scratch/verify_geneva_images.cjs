const fs = require('fs');
const path = require('path');

const bodyHtml = fs.readFileSync('src/content/geneva/body.html', 'utf8');
const publicGenevaDir = path.resolve('public/camps-assets/geneva');

const imgRegex = /src=["']([^"']+)["']/gi;
let match;
const localImages = [];
const missingImages = [];

while ((match = imgRegex.exec(bodyHtml)) !== null) {
  const src = match[1];
  if (src.startsWith('/camps-assets/geneva/')) {
    const filename = decodeURIComponent(src.replace('/camps-assets/geneva/', ''));
    localImages.push(filename);
    const localPath = path.join(publicGenevaDir, filename);
    if (!fs.existsSync(localPath)) {
      missingImages.push({ src, filename, localPath });
    }
  }
}

console.log('Total local image tags in Geneva body.html:', localImages.length);
console.log('Missing images count:', missingImages.length);
if (missingImages.length > 0) {
  console.log('Missing image samples:', missingImages.slice(0, 10));
}
