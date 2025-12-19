# Advanced Presentation Techniques

Advanced customization, theming, transitions, plugins, and integration patterns for power users.

## Custom Themes

### Creating Custom Themes

Override default Reveal.js theme variables:

```css
/* custom-theme.css */
:root {
  --r-background-color: #1A202C;
  --r-main-font: 'Inter', sans-serif;
  --r-main-font-size: 42px;
  --r-main-color: #F7FAFC;
  --r-block-margin: 20px;
  --r-heading-margin: 0 0 20px 0;
  --r-heading-font: 'Inter', sans-serif;
  --r-heading-color: #4A90E2;
  --r-heading-line-height: 1.2;
  --r-heading-letter-spacing: normal;
  --r-heading-text-transform: none;
  --r-heading-text-shadow: none;
  --r-heading-font-weight: 700;
  --r-heading1-size: 3.77em;
  --r-heading2-size: 2.11em;
  --r-heading3-size: 1.55em;
  --r-heading4-size: 1em;
  --r-code-font: 'Fira Code', monospace;
  --r-link-color: #7ED321;
  --r-link-color-hover: #A4E856;
  --r-selection-background-color: #4A90E2;
  --r-selection-color: #FFFFFF;
}
```

### Theme Presets

**Corporate theme:**
```css
:root {
  --r-background-color: #FFFFFF;
  --r-main-color: #333333;
  --r-heading-color: #003366;
  --r-link-color: #0066CC;
}
```

**Dark mode theme:**
```css
:root {
  --r-background-color: #0D1117;
  --r-main-color: #C9D1D9;
  --r-heading-color: #58A6FF;
  --r-link-color: #58A6FF;
}
```

**Minimalist theme:**
```css
:root {
  --r-background-color: #FAFAFA;
  --r-main-color: #212121;
  --r-heading-color: #212121;
  --r-link-color: #616161;
}
```

## Advanced Transitions

### Custom Slide Transitions

Add data attributes to slides in content.md:

```html
<!-- Slide with custom transition -->
<section data-transition="zoom">

# Zooming In

Content here...

</section>
```

**Available transitions:**
- `none` - No transition
- `fade` - Fade in/out
- `slide` - Slide horizontally
- `convex` - Slide at a convex angle
- `concave` - Slide at a concave angle
- `zoom` - Scale up/down

### Fragment Animations

Reveal content progressively:

```html
<ul>
  <li class="fragment">First point (appears first)</li>
  <li class="fragment">Second point (appears second)</li>
  <li class="fragment">Third point (appears third)</li>
</ul>
```

**Fragment styles:**
- `fragment fade-in` - Fade in
- `fragment fade-out` - Fade out
- `fragment highlight-red` - Highlight in red
- `fragment grow` - Grow
- `fragment shrink` - Shrink

## Advanced Layouts

### Full-Page Backgrounds

```html
<!-- Slide with background image -->
<section data-background-image="images/background.jpg">

# Content Over Image

</section>
```

```html
<!-- Slide with background color -->
<section data-background-color="#4A90E2">

# Blue Background

</section>
```

```html
<!-- Slide with background video -->
<section data-background-video="videos/bg.mp4" data-background-video-loop>

# Video Background

</section>
```

### Split Layouts

```html
<div class="r-hstack">
  <div style="flex: 1;">
    Left content (50%)
  </div>
  <div style="flex: 1;">
    Right content (50%)
  </div>
</div>
```

```html
<div class="r-hstack">
  <div style="flex: 2;">
    Main content (66%)
  </div>
  <div style="flex: 1;">
    Sidebar (33%)
  </div>
</div>
```

### Overlays

```html
<div class="r-stack">
  <img src="images/base.jpg" width="600">
  <img class="fragment" src="images/overlay1.png" width="600">
  <img class="fragment" src="images/overlay2.png" width="600">
</div>
```

## Interactive Elements

### Speaker Notes

Add notes visible only in speaker view:

```html
# Slide Title

Content for audience...

<aside class="notes">
  Remember to mention the Q3 results here.
  Pause for questions after this slide.
</aside>
```

### Auto-Animate

Smoothly transition between code states:

```html
<section data-auto-animate>

\`\`\`python
def hello():
    pass
\`\`\`

</section>

<section data-auto-animate>

\`\`\`python
def hello():
    print("Hello, world!")
    return True
\`\`\`

</section>
```

## Advanced Data Visualization

### Multi-Dataset Charts

```javascript
// Generate from content.md with multiple CSV files
const multiDatasetChart = {
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        borderColor: '#4A90E2',
        backgroundColor: '#4A90E220'
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: '#D0021B',
        backgroundColor: '#D0021B20'
      },
      {
        label: 'Profit',
        data: profitData,
        borderColor: '#7ED321',
        backgroundColor: '#7ED32120'
      }
    ]
  }
};
```

### Custom Chart Plugins

```javascript
// Add to scripts/ folder
const customPlugin = {
  id: 'customPlugin',
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;

    // Draw custom annotations
    ctx.save();
    ctx.fillStyle = 'rgba(74, 144, 226, 0.1)';
    ctx.fillRect(
      chartArea.left,
      chartArea.top,
      chartArea.right - chartArea.left,
      50
    );
    ctx.restore();
  }
};

Chart.register(customPlugin);
```

### D3.js Integration

```javascript
// scripts/d3-visualization.js
function renderD3Chart(containerId, data) {
  const container = d3.select(`#${containerId}`);
  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([height - margin.bottom, margin.top]);

  // Add axes, plots, etc.
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.x))
    .attr('cy', d => y(d.y))
    .attr('r', 5)
    .attr('fill', '#4A90E2');
}
```

## Advanced Scripting

### Data Fetching

```javascript
// scripts/fetch-api-data.js
async function fetchAndDisplay(apiUrl, containerId) {
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Process and display data
    container.innerHTML = `
      <div class="api-data">
        ${data.map(item => `
          <div class="data-item">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="error">
        Failed to load data: ${error.message}
      </div>
    `;
  }
}
```

### Real-Time Updates

```javascript
// scripts/live-data.js
function setupLiveData(dataSource, updateInterval = 5000) {
  const update = async () => {
    const data = await fetchData(dataSource);
    updateCharts(data);
    updateTables(data);
  };

  // Initial update
  update();

  // Periodic updates
  setInterval(update, updateInterval);
}
```

### Interactive Widgets

```javascript
// scripts/interactive-widget.js
function createSlider(containerId, onChange) {
  const container = document.getElementById(containerId);

  container.innerHTML = `
    <div class="slider-widget">
      <input type="range" min="0" max="100" value="50" id="slider">
      <span id="slider-value">50</span>
    </div>
  `;

  const slider = container.querySelector('#slider');
  const valueDisplay = container.querySelector('#slider-value');

  slider.addEventListener('input', (e) => {
    const value = e.target.value;
    valueDisplay.textContent = value;
    onChange(value);
  });
}
```

## Plugin Integration

### Code Syntax Highlighting

```html
<!-- Add to output/index.html -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
```

### Math Equations (MathJax)

```html
<!-- Add to output/index.html -->
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

```markdown
# Math Example

Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Mermaid Diagrams

```html
<!-- Add to output/index.html -->
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>
```

```markdown
# Process Flow

\`\`\`mermaid
graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Action 1]
  B -->|No| D[Action 2]
  C --> E[End]
  D --> E
\`\`\`
```

## Performance Optimization

### Lazy Loading Images

```javascript
// Automatically added to image tags
<img src="images/large-image.jpg" loading="lazy">
```

### Chart Optimization for Large Datasets

```javascript
// Limit data points for performance
function optimizeChartData(data, maxPoints = 100) {
  if (data.length <= maxPoints) return data;

  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, index) => index % step === 0);
}
```

### Asset Compression

```bash
# Optimize images before adding to presentation
# PNG
pngquant images/*.png --ext .png --force

# JPEG
jpegoptim --max=85 images/*.jpg

# SVG
svgo images/*.svg
```

## Export Options

### PDF Export

```javascript
// Add print styles
<style media="print">
  .reveal .slides {
    width: 100% !important;
    height: 100% !important;
    zoom: 1 !important;
  }

  .reveal .slide-background {
    display: block !important;
  }

  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
</style>
```

**Export:** Open presentation and append `?print-pdf` to URL, then print to PDF.

### Static HTML Export

Bundle entire presentation into single HTML file:

```bash
# Build script can inline all CSS, JS, and images
# Create self-contained HTML file
```

## Accessibility Enhancements

### Keyboard Navigation

Reveal.js built-in shortcuts:
- `Arrow keys` - Navigate slides
- `Space` - Next slide
- `Esc` - Slide overview
- `F` - Fullscreen
- `S` - Speaker notes

### Screen Reader Support

```html
<!-- Add ARIA landmarks -->
<section role="region" aria-label="Introduction">
  # Introduction
</section>

<!-- Add skip links -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --r-background-color: #000000;
    --r-main-color: #FFFFFF;
    --r-heading-color: #FFFFFF;
    --r-link-color: #FFFF00;
  }
}
```

## Advanced Build Customization

### Custom Build Pipeline

```javascript
// scripts/build-pipeline.js
async function customBuild() {
  // 1. Parse content.md
  const content = await parseContentFile();

  // 2. Process tags with custom logic
  const processedContent = await processCustomTags(content);

  // 3. Apply transformations
  const transformed = await applyTransformations(processedContent);

  // 4. Generate HTML with custom template
  const html = await generateHTML(transformed, 'custom-template.html');

  // 5. Optimize output
  await optimizeOutput(html);

  // 6. Write to output directory
  await writeOutput(html);
}
```

### Conditional Content

```markdown
<!-- Use HTML comments for build-time conditionals -->
<!-- BUILD:production -->
#chart-<production-data.csv>
<!-- /BUILD:production -->

<!-- BUILD:development -->
#chart-<test-data.csv>
<!-- /BUILD:development -->
```

### Template Variables

```markdown
# Welcome to {{COMPANY_NAME}}

Presented by: {{AUTHOR}}
Date: {{DATE}}
```

## Integration Patterns

### Embedding External Content

```html
<!-- Embed Google Sheets -->
<iframe
  src="https://docs.google.com/spreadsheets/d/SHEET_ID/edit?usp=sharing&widget=true"
  width="800"
  height="600">
</iframe>

<!-- Embed Tableau Dashboard -->
<iframe
  src="https://public.tableau.com/views/Dashboard/Sheet1"
  width="1000"
  height="800">
</iframe>
```

### API Integration

```javascript
// scripts/api-integration.js
class APIIntegration {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    return response.json();
  }

  async updateChart(chartId, data) {
    const chart = Chart.getChart(chartId);
    chart.data.datasets[0].data = data;
    chart.update();
  }
}
```

## Custom Tag Creation

### Defining Custom Tags

Extend the tag parser:

```javascript
// scripts/custom-tags.js
const customTagHandlers = {
  'map': (filename, params) => {
    return `
      <div class="map-container">
        <iframe
          src="https://maps.google.com/maps?q=${params.location}&output=embed"
          width="${params.width || 800}"
          height="${params.height || 600}">
        </iframe>
      </div>
    `;
  },

  'tweet': (tweetId, params) => {
    return `
      <blockquote class="twitter-tweet">
        <a href="https://twitter.com/x/status/${tweetId}"></a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js"></script>
    `;
  },

  'countdown': (targetDate, params) => {
    return `
      <div id="countdown-${Date.now()}"
           data-target="${targetDate}"
           class="countdown-timer">
      </div>
      <script>
        // Countdown logic
      </script>
    `;
  }
};
```

## Best Practices

1. **Version control** - Track content.md and assets in git
2. **Modular scripts** - One script per feature
3. **Error handling** - Graceful fallbacks for failed loads
4. **Performance testing** - Test with large datasets
5. **Cross-browser testing** - Verify in Chrome, Firefox, Safari
6. **Responsive design** - Test on various screen sizes
7. **Accessibility audit** - Use tools like axe or Lighthouse
8. **Documentation** - Comment custom code thoroughly
9. **Asset optimization** - Compress before adding
10. **Build automation** - Automate repetitive tasks

## Resources

- **Reveal.js docs:** https://revealjs.com/
- **Chart.js docs:** https://www.chartjs.org/docs/
- **D3.js docs:** https://d3js.org/
- **MathJax docs:** https://www.mathjax.org/
- **Mermaid docs:** https://mermaid-js.github.io/

For questions or custom requirements, extend build scripts and tag parsers as needed.
