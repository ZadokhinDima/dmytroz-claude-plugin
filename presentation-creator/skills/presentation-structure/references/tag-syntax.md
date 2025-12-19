# Complete Tag Syntax Reference

This document provides comprehensive documentation for all presentation tags, including syntax, parameters, and examples.

## Tag Format

### Basic Syntax

```
#<type>-<filename>
```

### Parameterized Syntax

```
#<type>-<filename, param1=value1, param2=value2, param3=value3>
```

**Rules:**
- Tags must start with `#`
- Type and filename separated by `-`
- Filename in angle brackets `<>`
- Parameters comma-separated after filename
- Parameter format: `key=value`
- No spaces around `=` in parameters
- Spaces after commas are optional

## Image Tag

### Syntax

```
#image-<filename>
#image-<filename, width=W, height=H, alt="text">
```

### Parameters

| Parameter | Type | Description | Default | Required |
|-----------|------|-------------|---------|----------|
| `width` | number | Image width in pixels | auto | No |
| `height` | number | Image height in pixels | auto | No |
| `alt` | string | Alt text for accessibility | filename | No |
| `class` | string | Additional CSS classes | - | No |
| `caption` | string | Image caption text | - | No |

### Supported Formats

- PNG (.png)
- JPEG (.jpg, .jpeg)
- SVG (.svg)
- GIF (.gif)
- WebP (.webp)

### Examples

**Basic image:**
```markdown
#image-<logo.png>
```

**Sized image:**
```markdown
#image-<diagram.svg, width=600>
```

**With alt text:**
```markdown
#image-<photo.jpg, width=800, alt="Team photo from Q4 retreat">
```

**With caption:**
```markdown
#image-<chart.png, width=700, caption="Revenue growth 2024">
```

**Custom styling:**
```markdown
#image-<banner.jpg, width=100%, class="full-width shadow">
```

### Generated HTML

```html
<figure class="presentation-image">
  <img src="images/photo.jpg"
       width="800"
       alt="Team photo from Q4 retreat"
       loading="lazy">
</figure>
```

## Table Tag

### Syntax

```
#table-<filename.csv>
#table-<filename.csv, style=striped, sortable=true>
```

### Parameters

| Parameter | Type | Description | Default | Required |
|-----------|------|-------------|---------|----------|
| `style` | string | Table style preset | striped | No |
| `sortable` | boolean | Enable column sorting | false | No |
| `caption` | string | Table caption | - | No |
| `class` | string | Additional CSS classes | - | No |
| `pageSize` | number | Rows per page (pagination) | all | No |

### Style Presets

- `striped` - Alternating row colors
- `bordered` - Full borders on all cells
- `minimal` - Minimal styling, clean look
- `compact` - Reduced padding, more data density
- `hover` - Highlight rows on mouse over

### Examples

**Basic table:**
```markdown
#table-<sales.csv>
```

**Styled and sortable:**
```markdown
#table-<metrics.csv, style=striped, sortable=true>
```

**With caption:**
```markdown
#table-<results.csv, style=bordered, caption="Q4 Results by Region">
```

**Paginated:**
```markdown
#table-<large-dataset.csv, style=minimal, sortable=true, pageSize=20>
```

### CSV Format Requirements

First row must be headers:

```csv
Column1,Column2,Column3
Value1,Value2,Value3
Value4,Value5,Value6
```

**Tips:**
- Use descriptive column headers
- Remove unnecessary decimal places
- Format large numbers with commas in post-processing
- Keep column count reasonable (<10 for readability)

### Generated HTML

```html
<figure class="presentation-table">
  <table class="striped-table sortable-table">
    <caption>Q4 Results by Region</caption>
    <thead>
      <tr>
        <th>Region</th>
        <th>Revenue</th>
        <th>Growth</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>North America</td>
        <td>$2.5M</td>
        <td>15%</td>
      </tr>
    </tbody>
  </table>
</figure>
```

## Chart Tag

### Syntax

```
#chart-<filename.csv>
#chart-<filename.csv, type=bar, title="Chart Title">
```

### Parameters

| Parameter | Type | Description | Default | Required |
|-----------|------|-------------|---------|----------|
| `type` | string | Chart type | bar | No |
| `title` | string | Chart title | - | No |
| `height` | number | Height in pixels | 400 | No |
| `width` | number | Width in pixels | 100% | No |
| `legend` | boolean | Show legend | true | No |
| `colors` | string | Color scheme | default | No |
| `animate` | boolean | Enable animations | true | No |
| `grid` | boolean | Show grid lines | true | No |

### Chart Types

- `bar` - Vertical bar chart
- `line` - Line chart
- `pie` - Pie chart
- `doughnut` - Doughnut chart
- `radar` - Radar/spider chart
- `polarArea` - Polar area chart
- `scatter` - Scatter plot
- `bubble` - Bubble chart

### Color Schemes

- `default` - Blue gradient
- `blue` - Blue palette
- `green` - Green palette
- `red` - Red palette
- `purple` - Purple palette
- `orange` - Orange palette
- `rainbow` - Multi-color palette
- `monochrome` - Grayscale

### Examples

**Basic bar chart:**
```markdown
#chart-<sales.csv>
```

**Line chart with title:**
```markdown
#chart-<revenue.csv, type=line, title="Monthly Revenue Trend">
```

**Pie chart with custom colors:**
```markdown
#chart-<distribution.csv, type=pie, colors=rainbow, legend=true>
```

**Tall chart:**
```markdown
#chart-<data.csv, type=bar, height=600, title="Detailed Analysis">
```

**Minimal styling:**
```markdown
#chart-<metrics.csv, type=line, grid=false, animate=false>
```

### CSV Format for Charts

**Single dataset (bar, line, pie):**
```csv
Label,Value
January,45
February,52
March,61
```

**Multiple datasets (bar, line):**
```csv
Month,Revenue,Expenses,Profit
Jan,50000,32000,18000
Feb,55000,35000,20000
Mar,60000,38000,22000
```

**Scatter/bubble:**
```csv
X,Y,Size
10,20,5
15,35,10
20,25,15
```

### Generated HTML

```html
<div class="presentation-chart">
  <canvas id="chart-abc123" width="800" height="400"></canvas>
  <script>
    // Chart.js configuration
    new Chart(document.getElementById('chart-abc123'), {
      type: 'line',
      data: { /* data from CSV */ },
      options: { /* chart options */ }
    });
  </script>
</div>
```

## YouTube Tag

### Syntax

```
#youtube-<videoId>
#youtube-<videoId, width=800, height=450>
```

### Parameters

| Parameter | Type | Description | Default | Required |
|-----------|------|-------------|---------|----------|
| `width` | number | Embed width in pixels | 800 | No |
| `height` | number | Embed height in pixels | 450 | No |
| `autoplay` | boolean | Auto-play video | false | No |
| `controls` | boolean | Show player controls | true | No |
| `start` | number | Start time in seconds | 0 | No |
| `end` | number | End time in seconds | - | No |

### Finding Video ID

Extract from YouTube URL:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                  ^^^^^^^^^^^
                                  Video ID

https://youtu.be/dQw4w9WgXcQ
                 ^^^^^^^^^^^
                 Video ID
```

### Examples

**Basic embed:**
```markdown
#youtube-<dQw4w9WgXcQ>
```

**Custom size:**
```markdown
#youtube-<dQw4w9WgXcQ, width=1000, height=562>
```

**Start at specific time:**
```markdown
#youtube-<dQw4w9WgXcQ, start=30, end=120>
```

**Auto-play (use sparingly):**
```markdown
#youtube-<dQw4w9WgXcQ, autoplay=true>
```

### Generated HTML

```html
<div class="presentation-video">
  <iframe
    width="800"
    height="450"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?start=30&end=120"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

## Script Tag

### Syntax

```
#script-<filename.js>
#script-<filename.js, container=elementId>
```

### Parameters

| Parameter | Type | Description | Default | Required |
|-----------|------|-------------|---------|----------|
| `container` | string | HTML element ID for output | auto-generated | No |
| `defer` | boolean | Defer script execution | false | No |
| `async` | boolean | Async script loading | false | No |

### Script Requirements

Scripts should export a `render()` function or auto-execute:

```javascript
// Auto-execute
(function() {
  // Your code here
})();

// Or export render function
function render(containerId) {
  const container = document.getElementById(containerId);
  // Your visualization code
}
```

### Examples

**Basic script:**
```markdown
#script-<custom-viz.js>
```

**With container:**
```markdown
#script-<fetch-data.js, container=data-display>
```

**Deferred execution:**
```markdown
#script-<heavy-animation.js, defer=true>
```

### Generated HTML

```html
<div id="script-container-abc123" class="presentation-script"></div>
<script src="scripts/custom-viz.js"></script>
<script>
  if (typeof render === 'function') {
    render('script-container-abc123');
  }
</script>
```

## Advanced Tag Features

### Multiple Tags Per Slide

Combine multiple tags on one slide:

```markdown
# Sales Overview

#chart-<revenue.csv, type=line, title="Revenue Trend">

#table-<breakdown.csv, style=striped, sortable=true>

#image-<logo.png, width=200>
```

### Tags in Columns

Use tags within layout divs:

```markdown
# Comparison

<div class="columns-2">
  <div>
    #chart-<before.csv, type=bar, title="Before">
  </div>
  <div>
    #chart-<after.csv, type=bar, title="After">
  </div>
</div>
```

### Conditional Tags

Tags can be commented out for testing:

```markdown
<!-- #chart-<test-data.csv> -->
#chart-<production-data.csv>
```

## Error Handling

### Common Errors

**File not found:**
```
Error: Image file 'logo.png' not found in images/
```
**Solution:** Verify filename and location

**Invalid CSV:**
```
Error: CSV file 'data.csv' has no headers
```
**Solution:** Add header row to CSV

**Invalid parameter:**
```
Warning: Unknown parameter 'color' in chart tag
```
**Solution:** Check parameter name spelling

**Syntax error:**
```
Error: Tag syntax invalid: #image-logo.png (missing brackets)
```
**Solution:** Use proper tag format with brackets

### Validation

Run validation before building:

```bash
/validate-presentation
```

Checks all tags for:
- Correct syntax
- File existence
- Valid parameters
- Proper CSV format

## Performance Tips

### Image Optimization

- Use appropriate formats (SVG for diagrams, JPG for photos)
- Compress images before adding to presentation
- Use `loading="lazy"` for images below the fold (automatic)
- Limit image sizes (width/height parameters)

### Chart Performance

- Limit data points (<100 for smooth animations)
- Disable animations for large datasets (`animate=false`)
- Use appropriate chart types (bar/line faster than radar)
- Aggregate data when possible

### Script Optimization

- Minimize external dependencies
- Use `defer=true` for non-critical scripts
- Cache data fetching results
- Avoid synchronous operations

## Best Practices

1. **Always provide alt text** for images
2. **Use descriptive filenames** (not "image1.png")
3. **Keep CSV files clean** (no empty rows, consistent formatting)
4. **Test charts with various data** (handle edge cases)
5. **Validate before building** to catch errors early
6. **Use semantic tag names** that describe content
7. **Document custom scripts** with comments
8. **Follow accessibility guidelines** (contrast, alt text, captions)

## Quick Reference

| Tag | Purpose | Example |
|-----|---------|---------|
| `#image` | Display image | `#image-<logo.png, width=400>` |
| `#table` | CSV to table | `#table-<data.csv, style=striped>` |
| `#chart` | Data visualization | `#chart-<sales.csv, type=line>` |
| `#youtube` | Embed video | `#youtube-<VIDEO_ID, width=800>` |
| `#script` | Custom JS | `#script-<viz.js, container=output>` |

For component styling and advanced techniques, see `component-guidelines.md` and `advanced-techniques.md`.
