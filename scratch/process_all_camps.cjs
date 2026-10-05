const fs = require('fs');
const path = require('path');

const downloadsBase = 'C:\\Users\\Sanjukta\\Downloads\\camps (2)';
const targetPublicDir = path.resolve('public/camps-assets');
const targetContentDir = path.resolve('src/content');
const rootPublicDir = path.resolve('public');

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

ensureDir(targetPublicDir);
ensureDir(targetContentDir);

// 1. Process Geneva Camp
function processGeneva() {
  const source = path.join(downloadsBase, 'genevacamp');
  if (!fs.existsSync(source)) return;
  console.log('Processing Geneva Camp...');
  
  // Copy Images
  const imgSource = path.join(source, 'images');
  const imgTarget = path.join(targetPublicDir, 'geneva');
  ensureDir(imgTarget);
  if (fs.existsSync(imgSource)) {
    fs.cpSync(imgSource, imgTarget, { recursive: true });
  }

  // Copy Webfonts
  const wfSource = path.join(source, 'webfonts');
  const wfPublic = path.join(rootPublicDir, 'webfonts');
  const wfGeneva = path.join(imgTarget, 'webfonts');
  ensureDir(wfPublic);
  ensureDir(wfGeneva);
  if (fs.existsSync(wfSource)) {
    fs.cpSync(wfSource, wfPublic, { recursive: true });
    fs.cpSync(wfSource, wfGeneva, { recursive: true });
  }

  // Combine CSS
  const cssSourceDir = path.join(source, 'css');
  const cssFiles = ['bootstrap.min.css', 'all.min.css', 'animate.min.css', 'owl.carousel.min.css', 'owl.theme.default.min.css', 'style.css', 'responsive.css'];
  let combinedCss = `@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Jost:ital,wght@0,400;0,500;0,600;0,700&display=swap');\n\n`;
  
  cssFiles.forEach(f => {
    const fp = path.join(cssSourceDir, f);
    if (fs.existsSync(fp)) {
      combinedCss += `/* --- ${f} --- */\n` + fs.readFileSync(fp, 'utf8') + '\n\n';
    }
  });

  // Rewrite webfonts paths in CSS if relative
  combinedCss = combinedCss.replace(/url\(["']?(?:\.\.\/)?webfonts\/([^"'\)]+)["']?\)/gi, 'url("/webfonts/$1")');

  // Add strong font-family enforcement and TOP ALIGNMENT for split sections in geneva-page
  combinedCss += `\n
/* --- Scoped Font & Alignment Enforcement --- */
.geneva-page,
.geneva-page *,
.geneva-page *::before,
.geneva-page *::after {
  font-family: "Poppins", "Jost", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}

/* Split layout columns alignment (Top aligned side-by-side) */
.geneva-page .leide {
  display: inline-block !important;
  vertical-align: top !important;
  width: 42% !important;
  max-width: 42% !important;
  margin: 0 !important;
  position: relative !important;
}

.geneva-page .accdeoxe,
.geneva-page .riimdew {
  display: inline-block !important;
  vertical-align: top !important;
  width: 54% !important;
  max-width: 54% !important;
  margin: 0 0 0 3% !important;
  padding-top: 0 !important;
}

.geneva-page .leimg {
  width: 100% !important;
  height: auto !important;
  object-fit: cover !important;
  display: block !important;
}

@media (max-width: 991px) {
  .geneva-page .leide,
  .geneva-page .accdeoxe,
  .geneva-page .riimdew {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 0 24px 0 !important;
  }
}
`;

  let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/src=["'](?:images\/|\.\/images\/)([^"']+)["']/g, (m, imgName) => {
    const cleanName = decodeURIComponent(imgName);
    return `src="/camps-assets/geneva/${encodeURI(cleanName)}"`;
  });

  const contentTarget = path.join(targetContentDir, 'geneva');
  ensureDir(contentTarget);
  fs.writeFileSync(path.join(contentTarget, 'body.html'), bodyContent, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'scoped.css'), combinedCss, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'content.ts'), `export const pageHtml = ${JSON.stringify(bodyContent)};\n`, 'utf8');
  console.log('Geneva processing complete!');
}

// 2. Process Salamanca Camp
function processSalamanca() {
  const source = path.join(downloadsBase, 'salamancaspaincamp');
  if (!fs.existsSync(source)) return;
  console.log('Processing Salamanca Camp...');
  
  const imgSource = path.join(source, 'images');
  const imgTarget = path.join(targetPublicDir, 'salamanca');
  ensureDir(imgTarget);
  if (fs.existsSync(imgSource)) {
    fs.cpSync(imgSource, imgTarget, { recursive: true });
  }

  const fontsSource = path.join(source, 'fonts');
  const fontsPublic = path.join(rootPublicDir, 'fonts');
  if (fs.existsSync(fontsSource)) {
    ensureDir(fontsPublic);
    fs.cpSync(fontsSource, fontsPublic, { recursive: true });
  }

  const cssSourceDir = path.join(source, 'css');
  let combinedCss = `@import url('https://fonts.googleapis.com/css2?family=Ramabhadra&family=Poppins:wght@300;400;500;600;700&display=swap');\n\n`;
  if (fs.existsSync(cssSourceDir)) {
    fs.readdirSync(cssSourceDir).forEach(f => {
      if (f.endsWith('.css')) {
        combinedCss += `/* --- ${f} --- */\n` + fs.readFileSync(path.join(cssSourceDir, f), 'utf8') + '\n\n';
      }
    });
  }

  combinedCss += `\n
/* --- Scoped Font Enforcement --- */
.salamanca-page,
.salamanca-page *,
.salamanca-page *::before,
.salamanca-page *::after {
  font-family: "Ramabhadra", "Poppins", sans-serif !important;
}
`;

  let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/src=["'](?:images\/|\.\/images\/)([^"']+)["']/g, (m, imgName) => {
    const cleanName = decodeURIComponent(imgName);
    return `src="/camps-assets/salamanca/${encodeURI(cleanName)}"`;
  });

  const contentTarget = path.join(targetContentDir, 'salamanca');
  ensureDir(contentTarget);
  fs.writeFileSync(path.join(contentTarget, 'body.html'), bodyContent, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'scoped.css'), combinedCss, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'content.ts'), `export const pageHtml = ${JSON.stringify(bodyContent)};\n`, 'utf8');
  console.log('Salamanca processing complete!');
}

// 3. Process Prelaw Camp
function processPrelaw() {
  const source = path.join(downloadsBase, 'prelaw-horizons-program');
  if (!fs.existsSync(source)) return;
  console.log('Processing Prelaw Camp...');
  
  const assetsSource = path.join(source, 'assets');
  const assetsTarget = path.join(targetPublicDir, 'prelaw');
  ensureDir(assetsTarget);
  if (fs.existsSync(assetsSource)) {
    fs.cpSync(assetsSource, assetsTarget, { recursive: true });
  }

  let combinedCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');\n\n`;
  const stylesPath = path.join(source, 'styles.css');
  if (fs.existsSync(stylesPath)) {
    combinedCss += fs.readFileSync(stylesPath, 'utf8');
  }

  combinedCss += `\n
/* --- Scoped Font Enforcement --- */
.prelaw-page,
.prelaw-page *,
.prelaw-page *::before,
.prelaw-page *::after {
  font-family: "Inter", "Playfair Display", sans-serif !important;
}
`;

  let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/src=["'](?:assets\/|\.\/assets\/)([^"']+)["']/g, (m, imgName) => {
    const cleanName = decodeURIComponent(imgName);
    return `src="/camps-assets/prelaw/${encodeURI(cleanName)}"`;
  });

  const contentTarget = path.join(targetContentDir, 'prelaw');
  ensureDir(contentTarget);
  fs.writeFileSync(path.join(contentTarget, 'body.html'), bodyContent, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'scoped.css'), combinedCss, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'content.ts'), `export const pageHtml = ${JSON.stringify(bodyContent)};\n`, 'utf8');
  console.log('Prelaw processing complete!');
}

// 4. Process Premed Camp
function processPremed() {
  const source = path.join(downloadsBase, 'premed-horizons-program');
  if (!fs.existsSync(source)) return;
  console.log('Processing Premed Camp...');
  
  const assetsSource = path.join(source, 'assets');
  const assetsTarget = path.join(targetPublicDir, 'premed');
  ensureDir(assetsTarget);
  if (fs.existsSync(assetsSource)) {
    fs.cpSync(assetsSource, assetsTarget, { recursive: true });
  }

  let combinedCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');\n\n`;
  const stylesPath = path.join(source, 'styles.css');
  if (fs.existsSync(stylesPath)) {
    combinedCss += fs.readFileSync(stylesPath, 'utf8');
  }

  combinedCss += `\n
/* --- Scoped Font Enforcement --- */
.premed-page,
.premed-page *,
.premed-page *::before,
.premed-page *::after {
  font-family: "Inter", "Playfair Display", sans-serif !important;
}
`;

  let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : html;
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/src=["'](?:assets\/|\.\/assets\/)([^"']+)["']/g, (m, imgName) => {
    const cleanName = decodeURIComponent(imgName);
    return `src="/camps-assets/premed/${encodeURI(cleanName)}"`;
  });

  const contentTarget = path.join(targetContentDir, 'premed');
  ensureDir(contentTarget);
  fs.writeFileSync(path.join(contentTarget, 'body.html'), bodyContent, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'scoped.css'), combinedCss, 'utf8');
  fs.writeFileSync(path.join(contentTarget, 'content.ts'), `export const pageHtml = ${JSON.stringify(bodyContent)};\n`, 'utf8');
  console.log('Premed processing complete!');
}

processGeneva();
processSalamanca();
processPrelaw();
processPremed();
