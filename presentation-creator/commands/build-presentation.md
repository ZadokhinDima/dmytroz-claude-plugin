---
name: build-presentation
description: Parse content.md and generate HTML presentation
argument-hint: "[presentation-directory]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
---

# Build Presentation Command

Parse the `content.md` file, process all tags, and generate a complete HTML presentation in the `output/` directory.

## Usage

```
/build-presentation
/build-presentation path/to/presentation
```

If no path is provided, builds presentation in current directory.

## What This Command Does

1. Reads and parses `content.md`
2. Processes all presentation tags (#image, #table, #chart, #youtube, #script)
3. Converts markdown to Reveal.js HTML
4. Copies assets to output directory
5. Generates Chart.js visualizations from CSV data
6. Creates complete, ready-to-present HTML file

## Implementation Instructions

When this command executes:

### 1. Validation Phase

- Verify `content.md` exists
- Check that required folders exist (images/, data/, scripts/)
- Run basic syntax validation on content.md
- If validation fails, stop and report errors

### 2. Parse Content.md

- Read content.md file
- Split into slides using `#` or `##` headers as delimiters
- Identify all tags in the content
- Extract tag parameters

### 3. Process Tags

For each tag type, generate appropriate HTML:

**#image tags:**
- Verify image file exists in images/
- Generate `<img>` tag with parameters
- Copy image to output/assets/images/

**#table tags:**
- Read CSV file from data/
- Parse CSV (first row as headers)
- Generate HTML `<table>` with specified style
- Add sorting JavaScript if sortable=true

**#chart tags:**
- Read CSV file from data/
- Parse CSV data
- Generate Chart.js configuration
- Create canvas element with unique ID
- Add Chart.js initialization script

**#youtube tags:**
- Extract video ID
- Generate iframe embed code
- Apply width/height parameters

**#script tags:**
- Copy script file to output/scripts/
- Generate script inclusion HTML
- Add container div if specified

### 4. Generate HTML Structure

Create `output/index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentation Title</title>

  <!-- Reveal.js CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css">

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>

  <!-- Custom styles -->
  <link rel="stylesheet" href="styles/custom.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <!-- Generated slides here -->
    </div>
  </div>

  <!-- Reveal.js -->
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide'
    });
  </script>

  <!-- Chart initialization scripts -->
  <!-- Custom scripts -->
</body>
</html>
```

### 5. Copy Assets

- Copy all referenced images to output/assets/images/
- Copy all referenced data files to output/assets/data/
- Copy all referenced scripts to output/scripts/

### 6. Generate Styles

Create `output/styles/custom.css` with:
- Table styles (striped, bordered, minimal)
- Chart container styles
- Layout utility classes (columns-2, centered, etc.)
- Custom color scheme

### 7. Completion

- Display success message
- Show path to generated file
- Provide instructions to open in browser

## Example Output

```
Building presentation...

✓ Parsed content.md (15 slides)
✓ Processed 12 tags:
  - 3 images
  - 2 tables
  - 4 charts
  - 1 YouTube video
  - 2 custom scripts
✓ Generated HTML structure
✓ Copied assets to output/
✓ Created custom styles

Build complete!

Output: ./output/index.html

To view your presentation:
1. Open output/index.html in your browser
2. Use arrow keys to navigate slides
3. Press 'F' for fullscreen
4. Press 'S' for speaker notes

Or run: open output/index.html
```

## Error Handling

**Missing content.md:**
```
Error: content.md not found in current directory.
Run /create-presentation first or navigate to presentation directory.
```

**Tag references missing file:**
```
Error: Image 'logo.png' referenced in content.md not found in images/
Please add the file or remove the tag.
```

**Invalid CSV format:**
```
Error: CSV file 'data.csv' has invalid format.
Ensure first row contains headers and data is properly formatted.
```

**Build warnings (non-fatal):**
```
Warning: Large image 'photo.jpg' (5.2MB) may slow loading.
Consider compressing images to under 2MB.
```

## Build Process Details

The build script should:

1. Use Node.js for tag parsing and HTML generation
2. Use marked or similar library for markdown conversion
3. Generate unique IDs for charts to avoid conflicts
4. Minify output HTML for production builds (optional)
5. Create source maps for debugging (optional)

## Configuration

Read settings from `.claude/presentation-creator.local.md`:
- Theme preference
- Default chart colors
- Output directory name
- Optimization level

## Performance Tips

- Build time scales with number of tags and assets
- Large CSV files (>1000 rows) may slow chart generation
- Consider data aggregation for large datasets
- Images are copied, not optimized (optimize before adding)

## Tips

- Run `/validate-presentation` before building to catch errors
- Keep build output in git ignore
- Rebuild after every content.md change
- Check browser console for Chart.js errors if charts don't display

## Related

- Use `/validate-presentation` before building
- Use `/init-presentation` to initialize structure
- Use `presentation-structure` skill for tag syntax
- Use `presentation-examples` skill to see complete working presentations
