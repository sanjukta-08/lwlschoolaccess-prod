const fs = require('fs');
const path = require('path');

const downloadsBase = 'C:\\Users\\Sanjukta\\Downloads\\camps (2)';
const targetPublicDir = path.resolve('public/camps-assets');
const targetContentDir = path.resolve('src/content');

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

ensureDir(targetPublicDir);
ensureDir(targetContentDir);

function processGeneva() {
  const genevaSource = path.join(downloadsBase, 'genevacamp');
  if (!fs.existsSync(genevaSource)) {
    console.log('Geneva source not found!');
    return;
  }
  console.log('Processing Geneva Camp...');
  
  const imgSource = path.join(genevaSource, 'images');
  const imgTarget = path.join(targetPublicDir, 'geneva');
  ensureDir(imgTarget);
  
  if (fs.existsSync(imgSource)) {
    fs.cpSync(imgSource, imgTarget, { recursive: true });
    console.log('Copied Geneva images to public/camps-assets/geneva');
  }

  // Combine CSS
  const cssSourceDir = path.join(genevaSource, 'css');
  const cssFiles = ['bootstrap.min.css', 'all.min.css', 'animate.min.css', 'owl.carousel.min.css', 'owl.theme.default.min.css', 'style.css', 'responsive.css'];
  let combinedCss = '';
  cssFiles.forEach(f => {
    const fp = path.join(cssSourceDir, f);
    if (fs.existsSync(fp)) {
      combinedCss += `/* --- ${f} --- */\n` + fs.readFileSync(fp, 'utf8') + '\n\n';
    }
  });

  // Read HTML
  let html = fs.readFileSync(path.join(genevaSource, 'index.html'), 'utf8');

  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;

  // Remove script tags from body
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Replace image paths: images/ -> /camps-assets/geneva/
  bodyContent = bodyContent.replace(/src=["'](?:images\/|\.\/images\/)([^"']+)["']/g, (m, imgName) => {
    // Decode first if encoded, then sanitize spaces to %20 if needed, or encode URI components
    const cleanName = decodeURIComponent(imgName);
    return `src="/camps-assets/geneva/${encodeURI(cleanName)}"`;
  });

  const genevaContentTarget = path.join(targetContentDir, 'geneva');
  ensureDir(genevaContentTarget);

  fs.writeFileSync(path.join(genevaContentTarget, 'body.html'), bodyContent, 'utf8');
  fs.writeFileSync(path.join(genevaContentTarget, 'scoped.css'), combinedCss, 'utf8');

  const contentTs = `export const pageHtml = ${JSON.stringify(bodyContent)};\n`;
  fs.writeFileSync(path.join(genevaContentTarget, 'content.ts'), contentTs, 'utf8');

  console.log('Geneva processing complete!');
}

processGeneva();
