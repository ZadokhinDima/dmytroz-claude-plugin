# Presentation Creator Plugin

Create beautiful, interactive HTML presentations using a semantic markdown workflow with automated build pipeline.

## Overview

This plugin enables a clean, content-first approach to creating presentations:
1. Write semantic content in `content.md` with special tags
2. Organize assets in dedicated folders (images, data, scripts)
3. Build generates a complete HTML presentation with Reveal.js
4. Auto-sync keeps presentation updated as you edit

## Features

- **Semantic Content**: Write presentations in clean markdown with tag-based media references
- **Tag System**: Simple tags for images, tables, charts, YouTube videos, and custom scripts
- **Auto-Build**: Hooks automatically rebuild when content changes
- **Data Visualization**: Chart.js integration for beautiful charts from CSV data
- **CSV Tables**: Convert CSV files to styled, sortable HTML tables
- **Component Guidelines**: Best practices for tables, charts, and layouts
- **Reveal.js**: Beautiful, interactive HTML presentations

## Installation

### Option 1: Install from Marketplace (Recommended)

First, add the dmytroz-claude marketplace:

```bash
claude plugin marketplace add https://github.com/ZadokhinDima/dmytroz-claude-plugin
```

Then install the plugin by name:

```bash
claude plugin install presentation-creator
```

### Option 2: Direct Install

```bash
claude plugin add https://github.com/ZadokhinDima/dmytroz-claude-plugin/presentation-creator
```

## Quick Start

### 1. Create a New Presentation

```bash
# In your project directory
/create-presentation my-presentation
```

This creates:
```
my-presentation/
├── content.md              # Your presentation content
├── images/                 # Image assets
├── data/                   # CSV files
├── scripts/                # Custom visualizations
└── output/                 # Generated HTML (auto-created)
```

### 2. Write Content

Edit `content.md` using markdown and tags:

```markdown
# Welcome to My Presentation

This is the introduction slide.

#image-<logo.png, width=400, alt="Company Logo">

---

# Sales Analysis

Here's our quarterly performance:

#table-<sales-data.csv, style=striped, sortable=true>

#chart-<metrics.csv, type=bar, title="Q4 Metrics">

---

# Demo Video

Check out this tutorial:

#youtube-<dQw4w9WgXcQ, width=800, height=450>
```

### 3. Build Presentation

```bash
/build-presentation
```

Opens `output/index.html` in your browser!

## Tag Reference

### Image Tag
```markdown
#image-<filename, width=500, height=300, alt="Description">
```
- `filename`: Image in `images/` folder (required)
- `width`: Width in pixels (optional)
- `height`: Height in pixels (optional)
- `alt`: Alt text for accessibility (optional)

### Table Tag
```markdown
#table-<filename, style=striped, sortable=true>
```
- `filename`: CSV file in `data/` folder (required)
- `style`: Table style: `striped`, `bordered`, `minimal` (optional)
- `sortable`: Enable column sorting (optional, default: false)

### Chart Tag
```markdown
#chart-<filename, type=bar, title="Chart Title", height=400>
```
- `filename`: CSV file in `data/` folder (required)
- `type`: Chart type: `bar`, `line`, `pie`, `doughnut`, `radar` (optional, default: bar)
- `title`: Chart title (optional)
- `height`: Chart height in pixels (optional, default: 400)

### YouTube Tag
```markdown
#youtube-<videoId, width=800, height=450>
```
- `videoId`: YouTube video ID (required)
- `width`: Embed width (optional, default: 800)
- `height`: Embed height (optional, default: 450)

### Script Tag
```markdown
#script-<filename, container=custom-viz>
```
- `filename`: JavaScript file in `scripts/` folder (required)
- `container`: HTML element ID for output (optional)

## Commands

| Command | Description |
|---------|-------------|
| `/create-presentation` | Initialize new presentation structure |
| `/build-presentation` | Parse content.md and generate HTML |
| `/validate-presentation` | Check tags, references, and file structure |
| `/preview-presentation` | Launch dev server with live reload |

## Configuration

Create `.claude/presentation-creator.local.md`:

```yaml
---
theme: dark                    # dark, light, or custom
chartLibrary: chartjs          # chartjs (more options coming)
autoBuild: true               # Auto-build on content.md changes
presentationFramework: revealjs
defaultChartType: bar
defaultTableStyle: striped
---

# Optional: Custom settings notes
Add any additional configuration notes here.
```

## Component Code Guidelines

The plugin provides best practices for:
- **Tables**: Responsive design, styling, sortability
- **Charts**: Color schemes, accessibility, data formatting
- **Images**: Lazy loading, responsive sizing
- **Layouts**: Grid systems, alignment, spacing

Access guidelines via the `presentation-structure` skill (automatically loaded).

## Workflow

1. **Create**: `/create-presentation my-deck`
2. **Write**: Edit `content.md` with tags
3. **Add Assets**: Place images in `images/`, CSVs in `data/`
4. **Build**: `/build-presentation` (or auto-build on save)
5. **Preview**: Open `output/index.html`
6. **Iterate**: Edit and rebuild as needed

## Advanced Usage

### Custom Visualizations

Create custom D3.js or Chart.js scripts in `scripts/`:

```javascript
// scripts/custom-chart.js
async function renderCustomChart() {
  const data = await fetch('../data/metrics.csv').then(r => r.text());
  // Your custom visualization code
  const chart = new Chart(ctx, config);
}
```

Reference in `content.md`:
```markdown
#script-<custom-chart.js, container=my-chart>
```

### CSV Data Format

CSV files should have headers:

```csv
Month,Revenue,Profit
January,50000,12000
February,55000,13500
March,60000,15000
```

## Troubleshooting

**Build fails:**
- Run `/validate-presentation` to check for errors
- Verify all referenced files exist
- Check CSV formatting

**Images not showing:**
- Ensure images are in `images/` folder
- Check filename spelling in tags
- Verify file extensions match

**Charts not rendering:**
- Validate CSV has proper headers
- Check chart type is supported
- Ensure data is numeric where needed

## Examples

See `examples/` directory for sample presentations.

## License

MIT

## Support

Report issues: https://github.com/ZadokhinDima/dmytroz-claude-plugin/issues
