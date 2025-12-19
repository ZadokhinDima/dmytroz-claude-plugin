#!/usr/bin/env node

/**
 * Presentation Builder Script
 *
 * Parses content.md, processes tags, and generates HTML presentation
 *
 * Usage:
 *   node build.js [presentation-directory]
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  contentFile: 'content.md',
  outputDir: 'output',
  assetsDir: 'output/assets',
  imagesDir: 'images',
  dataDir: 'data',
  scriptsDir: 'scripts',
  revealJsVersion: '4.5.0',
  chartJsVersion: '4.4.0'
};

// Tag regex patterns
const TAG_PATTERNS = {
  image: /#image-<([^,>]+)(?:,\s*([^>]+))?>/g,
  table: /#table-<([^,>]+)(?:,\s*([^>]+))?>/g,
  chart: /#chart-<([^,>]+)(?:,\s*([^>]+))?>/g,
  youtube: /#youtube-<([^,>]+)(?:,\s*([^>]+))?>/g,
  script: /#script-<([^,>]+)(?:,\s*([^>]+))?>/g
};

/**
 * Parse tag parameters
 */
function parseParams(paramsString) {
  if (!paramsString) return {};

  const params = {};
  const pairs = paramsString.match(/(\w+)=([^,]+)/g) || [];

  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    // Remove quotes if present
    params[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
  });

  return params;
}

/**
 * Process image tag
 */
function processImageTag(filename, paramsString) {
  const params = parseParams(paramsString);
  const width = params.width ? `width="${params.width}"` : '';
  const height = params.height ? `height="${params.height}"` : '';
  const alt = params.alt || filename;
  const caption = params.caption;

  let html = `<figure class="presentation-image">
  <img src="assets/images/${filename}" ${width} ${height} alt="${alt}" loading="lazy">`;

  if (caption) {
    html += `\n  <figcaption>${caption}</figcaption>`;
  }

  html += '\n</figure>';

  return html;
}

/**
 * Parse CSV file
 */
async function parseCSV(filepath) {
  const content = await fs.readFile(filepath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line =>
    line.split(',').map(cell => cell.trim())
  );

  return { headers, rows };
}

/**
 * Process table tag
 */
async function processTableTag(filename, paramsString, dataDir) {
  const params = parseParams(paramsString);
  const style = params.style || 'striped';
  const sortable = params.sortable === 'true';
  const caption = params.caption;

  const csvPath = path.join(dataDir, filename);
  const { headers, rows } = await parseCSV(csvPath);

  const tableClass = `${style}-table${sortable ? ' sortable-table' : ''}`;

  let html = `<figure class="presentation-table">
  <table class="${tableClass}">`;

  if (caption) {
    html += `\n    <caption>${caption}</caption>`;
  }

  html += `\n    <thead>
      <tr>
        ${headers.map(h => `<th>${h}</th>`).join('\n        ')}
      </tr>
    </thead>
    <tbody>`;

  rows.forEach(row => {
    html += `\n      <tr>
        ${row.map(cell => `<td>${cell}</td>`).join('\n        ')}
      </tr>`;
  });

  html += `\n    </tbody>
  </table>
</figure>`;

  return html;
}

/**
 * Process chart tag
 */
async function processChartTag(filename, paramsString, dataDir) {
  const params = parseParams(paramsString);
  const chartType = params.type || 'bar';
  const title = params.title || '';
  const height = params.height || '400';
  const colors = params.colors || 'default';

  const csvPath = path.join(dataDir, filename);
  const { headers, rows } = await parseCSV(csvPath);

  const chartId = `chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Prepare chart data
  const labels = rows.map(row => row[0]);
  const datasets = [];

  for (let i = 1; i < headers.length; i++) {
    datasets.push({
      label: headers[i],
      data: rows.map(row => parseFloat(row[i]) || 0)
    });
  }

  const html = `<div class="presentation-chart">
  <canvas id="${chartId}" height="${height}"></canvas>
</div>
<script>
  new Chart(document.getElementById('${chartId}'), {
    type: '${chartType}',
    data: {
      labels: ${JSON.stringify(labels)},
      datasets: ${JSON.stringify(datasets)}
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: ${title ? 'true' : 'false'},
          text: '${title}'
        }
      }
    }
  });
</script>`;

  return html;
}

/**
 * Process YouTube tag
 */
function processYouTubeTag(videoId, paramsString) {
  const params = parseParams(paramsString);
  const width = params.width || '800';
  const height = params.height || '450';

  const html = `<div class="presentation-video">
  <iframe width="${width}" height="${height}"
    src="https://www.youtube.com/embed/${videoId}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>`;

  return html;
}

/**
 * Process script tag
 */
function processScriptTag(filename, paramsString) {
  const params = parseParams(paramsString);
  const container = params.container || `script-container-${Date.now()}`;

  const html = `<div id="${container}" class="presentation-script"></div>
<script src="scripts/${filename}"></script>
<script>
  if (typeof render === 'function') {
    render('${container}');
  }
</script>`;

  return html;
}

/**
 * Process all tags in content
 */
async function processTags(content, baseDir) {
  let processed = content;

  // Process image tags
  const imageMatches = [...content.matchAll(TAG_PATTERNS.image)];
  for (const match of imageMatches) {
    const html = processImageTag(match[1], match[2]);
    processed = processed.replace(match[0], html);
  }

  // Process table tags
  const tableMatches = [...content.matchAll(TAG_PATTERNS.table)];
  for (const match of tableMatches) {
    const html = await processTableTag(match[1], match[2], path.join(baseDir, CONFIG.dataDir));
    processed = processed.replace(match[0], html);
  }

  // Process chart tags
  const chartMatches = [...content.matchAll(TAG_PATTERNS.chart)];
  for (const match of chartMatches) {
    const html = await processChartTag(match[1], match[2], path.join(baseDir, CONFIG.dataDir));
    processed = processed.replace(match[0], html);
  }

  // Process YouTube tags
  const youtubeMatches = [...content.matchAll(TAG_PATTERNS.youtube)];
  for (const match of youtubeMatches) {
    const html = processYouTubeTag(match[1], match[2]);
    processed = processed.replace(match[0], html);
  }

  // Process script tags
  const scriptMatches = [...content.matchAll(TAG_PATTERNS.script)];
  for (const match of scriptMatches) {
    const html = processScriptTag(match[1], match[2]);
    processed = processed.replace(match[0], html);
  }

  return processed;
}

/**
 * Convert markdown to HTML slides
 */
function convertToSlides(markdown) {
  // Split by top-level headers
  const slides = markdown.split(/\n(?=# )/);

  return slides.map(slide => {
    const lines = slide.trim().split('\n');
    const header = lines[0];
    const content = lines.slice(1).join('\n');

    return `<section>
${slide.trim()}
</section>`;
  }).join('\n\n');
}

/**
 * Generate HTML template
 */
function generateHTML(slidesHTML, title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Presentation'}</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@${CONFIG.revealJsVersion}/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@${CONFIG.revealJsVersion}/dist/theme/black.css">

  <script src="https://cdn.jsdelivr.net/npm/chart.js@${CONFIG.chartJsVersion}/dist/chart.umd.js"></script>

  <link rel="stylesheet" href="styles/custom.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
${slidesHTML}
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/reveal.js@${CONFIG.revealJsVersion}/dist/reveal.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@${CONFIG.revealJsVersion}/plugin/markdown/markdown.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
      plugins: [ RevealMarkdown ]
    });
  </script>
</body>
</html>`;
}

/**
 * Copy assets
 */
async function copyAssets(sourceDir, destDir) {
  try {
    await fs.mkdir(destDir, { recursive: true });
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const src = path.join(sourceDir, file);
      const dest = path.join(destDir, file);
      await fs.copyFile(src, dest);
    }
  } catch (error) {
    // Directory might not exist, that's okay
  }
}

/**
 * Main build function
 */
async function build(presentationDir = process.cwd()) {
  console.log('Building presentation...\n');

  try {
    // Read content.md
    const contentPath = path.join(presentationDir, CONFIG.contentFile);
    const content = await fs.readFile(contentPath, 'utf-8');

    console.log('✓ Read content.md');

    // Process tags
    const processedContent = await processTags(content, presentationDir);
    console.log('✓ Processed tags');

    // Convert to slides
    const slidesHTML = convertToSlides(processedContent);
    const slideCount = slidesHTML.match(/<section>/g)?.length || 0;
    console.log(`✓ Generated ${slideCount} slides`);

    // Generate HTML
    const html = generateHTML(slidesHTML, 'Presentation');

    // Create output directory
    const outputDir = path.join(presentationDir, CONFIG.outputDir);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(path.join(outputDir, 'assets'), { recursive: true });
    await fs.mkdir(path.join(outputDir, 'assets/images'), { recursive: true});
    await fs.mkdir(path.join(outputDir, 'styles'), { recursive: true });

    // Write HTML
    await fs.writeFile(path.join(outputDir, 'index.html'), html);
    console.log('✓ Generated index.html');

    // Copy assets
    await copyAssets(
      path.join(presentationDir, CONFIG.imagesDir),
      path.join(outputDir, 'assets/images')
    );
    console.log('✓ Copied assets');

    // Create custom CSS (basic)
    const customCSS = `/* Custom presentation styles */
.presentation-image { text-align: center; margin: 2rem 0; }
.presentation-table { margin: 2rem auto; }
.presentation-chart { margin: 2rem auto; max-width: 800px; }
.presentation-video { text-align: center; margin: 2rem 0; }
.striped-table { width: 100%; border-collapse: collapse; }
.striped-table th { background: #2C3E50; color: white; padding: 12px; }
.striped-table td { padding: 10px; border-bottom: 1px solid #ddd; }
.striped-table tr:nth-child(even) { background: #f8f9fa; }
`;
    await fs.writeFile(path.join(outputDir, 'styles/custom.css'), customCSS);

    console.log('\n✅ Build complete!');
    console.log(`\nOutput: ${path.join(outputDir, 'index.html')}`);
    console.log('\nTo view: open output/index.html');

  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build
const presentationDir = process.argv[2] || process.cwd();
build(presentationDir);
