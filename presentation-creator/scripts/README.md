# Presentation Creator Scripts

Build scripts and utilities for the presentation-creator plugin.

## build.js

Main build script that parses content.md and generates HTML presentation.

### Usage

```bash
# Build presentation in current directory
node build.js

# Build presentation in specific directory
node build.js path/to/presentation
```

### Requirements

- Node.js 14+ (uses fs.promises, async/await)
- No external dependencies (uses built-in modules only)

### What it does

1. Reads content.md
2. Processes all tags (#image, #table, #chart, #youtube, #script)
3. Parses CSV files for tables and charts
4. Generates Reveal.js HTML
5. Copies assets to output/ directory
6. Creates custom CSS

### Output

```
output/
├── index.html           # Main presentation file
├── assets/
│   └── images/          # Copied images
└── styles/
    └── custom.css       # Generated styles
```

## Adding Custom Scripts

Create additional utilities as needed:

- `validate.js` - Standalone validation script
- `watch.js` - File watcher for live reload
- `optimize.js` - Image/asset optimization
- `export-pdf.js` - PDF export functionality

## Integration with Commands

The `/build-presentation` command calls this script:

```javascript
// In command implementation
const { exec } = require('child_process');
exec('node ${CLAUDE_PLUGIN_ROOT}/scripts/build.js', (error, stdout) => {
  if (error) {
    console.error('Build failed:', error);
  } else {
    console.log(stdout);
  }
});
```

## Development

To test the build script:

1. Create a test presentation with `/create-presentation test`
2. Run `node build.js test`
3. Open `test/output/index.html`

## Troubleshooting

**Error: Cannot find module**
- Ensure Node.js is installed
- Run from correct directory

**CSV parse errors**
- Check CSV file format
- Ensure first row has headers
- Verify consistent column counts

**Assets not copying**
- Verify files exist in source directories
- Check file permissions
