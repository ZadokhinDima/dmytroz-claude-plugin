---
name: Presentation Structure
description: This skill should be used when the user asks to "create a presentation", "build presentation", "presentation structure", "content.md format", "presentation tags", "add image to presentation", "create table from CSV", "embed chart", or mentions presentation folder structure, tag syntax, or component guidelines.
version: 0.1.0
---

# Presentation Structure Skill

## Overview

This skill defines the semantic, content-first workflow for creating interactive HTML presentations. The approach separates content from presentation: write clean markdown with semantic tags in `content.md`, organize assets in dedicated folders, and build generates a complete HTML presentation powered by Reveal.js.

**Core principle:** `content.md` is the single source of truth. All presentation content lives in this file using markdown and special tags that reference assets.

## Folder Structure

Every presentation follows this standard structure:

```
my-presentation/
├── content.md              # SOURCE OF TRUTH - semantic content with tags
├── images/                 # Image assets (PNG, JPG, SVG, GIF, WebP)
│   ├── logo.png
│   ├── diagram.svg
│   └── photo.jpg
├── data/                   # CSV files for tables and charts
│   ├── sales.csv
│   ├── metrics.csv
│   └── analytics.csv
├── scripts/                # Custom JavaScript for visualizations
│   ├── fetch-data.js
│   ├── custom-chart.js
│   └── animation.js
└── output/                 # GENERATED - HTML presentation (auto-created on build)
    ├── index.html
    ├── assets/
    │   ├── images/
    │   └── data/
    └── styles/
        └── theme.css
```

**Rules:**
- Never edit files in `output/` - they're regenerated on each build
- All manual edits go in `content.md` and asset folders
- Asset filenames should use kebab-case (lowercase with hyphens)
- Keep images under 2MB, videos under 10MB when possible

## Content.md Format

### Slide Delimiters

Use markdown headers (`#` or `##`) to create slides:

```markdown
# Introduction
First slide content here...

## Key Features
Second slide content here...

# Data Analysis
Third slide content here...
```

Each header creates a new slide. Use `#` for major sections and `##` for subsections.

### Basic Markdown

Use standard markdown within slides:

```markdown
# Slide Title

**Bold text** and *italic text*

- Bullet points
- More bullets
  - Nested bullets

1. Numbered lists
2. Second item

> Blockquotes for emphasis

`Inline code` and code blocks:

\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`
```

### Tag System

Tags enable semantic references to assets. Tags always start with `#` followed by the type and filename in angle brackets.

**Basic syntax:**
```
#<type>-<filename>
```

**With parameters:**
```
#<type>-<filename, param1=value1, param2=value2>
```

All tags are replaced with appropriate HTML during build. See `references/tag-syntax.md` for complete tag documentation.

## Supported Tags

### Image Tag

Display images from the `images/` folder:

```markdown
#image-<logo.png>
#image-<diagram.svg, width=600, alt="Architecture Diagram">
#image-<photo.jpg, width=400, height=300, alt="Team Photo">
```

**Parameters:**
- `width` - Image width in pixels
- `height` - Image height in pixels
- `alt` - Alt text for accessibility (recommended)

### Table Tag

Convert CSV files from `data/` folder into styled HTML tables:

```markdown
#table-<sales.csv>
#table-<metrics.csv, style=striped, sortable=true>
#table-<data.csv, style=bordered, caption="Q4 Results">
```

**Parameters:**
- `style` - Table style: `striped`, `bordered`, `minimal` (default: `striped`)
- `sortable` - Enable column sorting: `true`/`false` (default: `false`)
- `caption` - Table caption text

**CSV format:** First row must be headers

```csv
Month,Revenue,Profit
January,50000,12000
February,55000,13500
March,60000,15000
```

### Chart Tag

Generate interactive charts from CSV data using Chart.js:

```markdown
#chart-<sales.csv>
#chart-<metrics.csv, type=line, title="Monthly Revenue">
#chart-<data.csv, type=pie, height=500, legend=true>
```

**Parameters:**
- `type` - Chart type: `bar`, `line`, `pie`, `doughnut`, `radar`, `polarArea` (default: `bar`)
- `title` - Chart title
- `height` - Chart height in pixels (default: 400)
- `legend` - Show legend: `true`/`false` (default: `true`)
- `colors` - Color scheme: `default`, `blue`, `green`, `red`, `purple`

**CSV format:** First column is labels, remaining columns are datasets

```csv
Month,Revenue,Expenses
Jan,50000,32000
Feb,55000,35000
Mar,60000,38000
```

### YouTube Tag

Embed YouTube videos:

```markdown
#youtube-<dQw4w9WgXcQ>
#youtube-<VIDEO_ID, width=800, height=450>
```

**Parameters:**
- `width` - Embed width in pixels (default: 800)
- `height` - Embed height in pixels (default: 450)

**Video ID:** Extract from YouTube URL (e.g., `https://youtube.com/watch?v=dQw4w9WgXcQ`)

### Script Tag

Execute custom JavaScript from `scripts/` folder:

```markdown
#script-<custom-viz.js>
#script-<fetch-data.js, container=data-display>
```

**Parameters:**
- `container` - HTML element ID where script renders output

**Script requirements:** Scripts should be self-contained and export a `render()` function or auto-execute.

## Component Code Guidelines

Follow consistent patterns for presentation components to ensure professional, accessible presentations.

### Table Styling

Use these classes for different table styles:

**Striped tables:**
```html
<table class="striped-table">
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

**Bordered tables:**
```html
<table class="bordered-table">
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

**Minimal tables:**
```html
<table class="minimal-table">
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

Consult `references/component-guidelines.md` for detailed CSS specifications and custom styling.

### Chart Configuration

Chart.js charts use these standard configurations:

**Default colors:**
- Primary: `#4A90E2` (blue)
- Secondary: `#7ED321` (green)
- Accent: `#F5A623` (orange)
- Error: `#D0021B` (red)

**Typography:**
- Font family: `'Inter', 'Helvetica Neue', Arial, sans-serif`
- Title size: 18px
- Label size: 14px
- Legend size: 12px

Consult `references/component-guidelines.md` for complete Chart.js configurations.

### Layout Patterns

**Two-column layout:**
```markdown
<div class="columns-2">
  <div>
    Left column content
  </div>
  <div>
    Right column content
  </div>
</div>
```

**Centered content:**
```markdown
<div class="centered">
  Centered content
</div>
```

See `references/component-guidelines.md` for all layout classes and responsive patterns.

## Build Workflow

### Development Workflow

1. **Create presentation structure:** Run `/create-presentation <name>`
2. **Write content:** Edit `content.md` with markdown and tags
3. **Add assets:** Place images in `images/`, CSV files in `data/`
4. **Build:** Run `/build-presentation` to generate HTML
5. **Preview:** Open `output/index.html` in browser
6. **Iterate:** Edit `content.md` and rebuild

### Auto-Build

Enable auto-build in settings to regenerate presentation when `content.md` changes:

```yaml
# .claude/presentation-creator.local.md
---
autoBuild: true
---
```

With auto-build enabled, edits to `content.md` trigger automatic rebuild.

### Validation

Before building, validate presentation structure:

```bash
/validate-presentation
```

Checks:
- All referenced images exist in `images/`
- All CSV files exist in `data/`
- CSV files have valid format
- Script files exist in `scripts/`
- Tag syntax is correct
- No broken references

## Best Practices

### Content Organization

**Use semantic headers:**
```markdown
# Introduction
Overview and key message

## Problem Statement
What challenge we're addressing

## Our Solution
How we solve it

# Results
Data and outcomes
```

**One concept per slide:**
- Keep slides focused on single ideas
- Break complex topics into multiple slides
- Use progressive disclosure

**Balance text and visuals:**
```markdown
# Sales Growth

Our revenue increased 45% this quarter.

#chart-<revenue.csv, type=line, title="Quarterly Revenue">

Key drivers:
- New customer acquisition
- Expansion in EMEA region
```

### Asset Management

**Image optimization:**
- Use SVG for diagrams and icons
- Compress JPG/PNG images before adding
- Provide descriptive alt text for accessibility

**CSV data quality:**
- Use clear column headers
- Format numbers consistently
- Remove unnecessary decimal places
- Sort data logically

**Script organization:**
- One script per visualization
- Include comments explaining purpose
- Handle errors gracefully
- Make scripts reusable

### Accessibility

**Always provide alt text:**
```markdown
#image-<chart.png, alt="Bar chart showing 45% revenue increase">
```

**Use semantic headers:**
- Use proper heading hierarchy (# → ## → ###)
- Don't skip heading levels

**Table captions:**
```markdown
#table-<data.csv, caption="Q4 Financial Results by Region">
```

**Sufficient color contrast:**
- Test charts with colorblind simulators
- Don't rely solely on color to convey information

## Common Patterns

### Title Slide

```markdown
# Presentation Title

**Subtitle or Tagline**

By Author Name
Date
```

### Data Slide

```markdown
# Sales Performance

#chart-<sales-data.csv, type=bar, title="Revenue by Quarter">

#table-<sales-data.csv, style=striped, sortable=true>

Key insights:
- 45% growth year-over-year
- EMEA leading region
```

### Comparison Slide

```markdown
# Before vs After

<div class="columns-2">
  <div>
    ## Before
    - Manual process
    - 5 hours/week
    - Error-prone
  </div>
  <div>
    ## After
    - Automated workflow
    - 30 minutes/week
    - 99.9% accuracy
  </div>
</div>
```

### Call to Action

```markdown
# Next Steps

1. Review proposal
2. Schedule demo
3. Begin implementation

**Contact:** email@example.com
```

## Additional Resources

### Reference Files

For detailed documentation, consult:

- **`references/tag-syntax.md`** - Complete tag syntax reference with all parameters
- **`references/component-guidelines.md`** - Detailed CSS, Chart.js configurations, and layout patterns
- **`references/advanced-techniques.md`** - Custom themes, animations, transitions

### Example Files

Working examples in `examples/`:

- **`example-presentation.md`** - Complete sample presentation with all tag types
- **`examples/data/sales.csv`** - Sample CSV for tables and charts
- **`examples/scripts/custom-chart.js`** - Custom visualization script example

## Troubleshooting

**Tag not rendering:**
- Verify tag syntax is correct (#type-<filename, params>)
- Check file exists in appropriate folder
- Ensure no typos in filename
- Run `/validate-presentation` to check references

**Chart not displaying:**
- Verify CSV has proper headers
- Check data is numeric where expected
- Ensure chart type matches data structure
- Check browser console for errors

**Images not loading:**
- Verify image file exists in `images/`
- Check filename matches tag exactly (case-sensitive)
- Ensure file format is supported (PNG, JPG, SVG, GIF, WebP)
- Check file isn't corrupted

**Build fails:**
- Run `/validate-presentation` first
- Check all asset files exist
- Verify CSV files are valid
- Review error messages for specific issues

## Settings Configuration

Configure presentation behavior in `.claude/presentation-creator.local.md`:

```yaml
---
theme: dark                    # dark, light, custom
chartLibrary: chartjs          # chartjs (more options future)
autoBuild: true               # Auto-build on content.md changes
presentationFramework: revealjs
defaultChartType: bar
defaultTableStyle: striped
imageQuality: high            # high, medium, low
---

# Custom Notes

Add any presentation-specific configuration notes here.
```

**Common settings:**
- `theme` - Presentation color scheme
- `autoBuild` - Enable/disable automatic rebuilds
- `defaultChartType` - Default chart type when not specified
- `defaultTableStyle` - Default table style when not specified

Refer to plugin README for complete settings documentation.

---

**Quick Summary:**

1. Write content in `content.md` using markdown + tags
2. Place assets in `images/`, `data/`, `scripts/`
3. Build with `/build-presentation`
4. Preview `output/index.html`
5. Iterate and rebuild

For detailed tag syntax, component styling, and advanced techniques, consult the reference files listed above.

**See Working Examples:**

Use the `presentation-examples` skill to view complete, working presentations that demonstrate all tags and features in action. The example presentations show best practices for structure, styling, and tag usage.
