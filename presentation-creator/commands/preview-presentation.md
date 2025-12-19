---
name: preview-presentation
description: Launch dev server with live reload for presentation development
argument-hint: "[presentation-directory]"
allowed-tools:
  - Bash
  - Read
---

# Preview Presentation Command

Launch a local development server with live reload to preview the presentation and automatically rebuild on content changes.

## Usage

```
/preview-presentation
/preview-presentation path/to/presentation
```

If no path is provided, previews presentation in current directory.

## What This Command Does

1. Starts local HTTP server
2. Opens presentation in browser
3. Watches for content.md changes
4. Auto-rebuilds on file changes
5. Auto-refreshes browser (live reload)

## Implementation Instructions

When this command executes:

### 1. Validation

- Verify presentation directory exists
- Check that content.md exists
- Run initial build if output/ doesn't exist

### 2. Start HTTP Server

Launch simple HTTP server in presentation directory:

**Option A - Python:**
```bash
cd <presentation-dir>
python3 -m http.server 8000
```

**Option B - Node.js (if available):**
```bash
cd <presentation-dir>
npx serve output -p 8000
```

**Option C - Built-in (preferred):**
```bash
cd <presentation-dir>
# Use Node.js http-server with live reload
npx http-server output -p 8000 --cors
```

### 3. Setup File Watching

Monitor content.md and asset folders for changes:

**Using Node.js (preferred):**
```javascript
// Watch for changes
const chokidar = require('chokidar');

const watcher = chokidar.watch([
  'content.md',
  'images/**/*',
  'data/**/*',
  'scripts/**/*'
], {
  ignored: /output/,
  persistent: true
});

watcher.on('change', async (path) => {
  console.log(`File ${path} changed, rebuilding...`);
  await buildPresentation();
  console.log('Rebuild complete!');
});
```

**Using bash (alternative):**
```bash
# Simple watch loop
while true; do
  inotifywait -e modify,create,delete -r content.md images/ data/ scripts/ 2>/dev/null
  echo "Changes detected, rebuilding..."
  /build-presentation
  echo "Rebuild complete!"
done
```

### 4. Live Reload Setup

Add live reload script to generated HTML:

```html
<!-- Injected into output/index.html -->
<script>
  // Simple live reload via polling
  let lastModified = null;

  async function checkForUpdates() {
    try {
      const response = await fetch('/index.html', { method: 'HEAD' });
      const modified = response.headers.get('last-modified');

      if (lastModified && modified !== lastModified) {
        console.log('Presentation updated, reloading...');
        window.location.reload();
      }

      lastModified = modified;
    } catch (error) {
      console.error('Live reload check failed:', error);
    }
  }

  // Check every 2 seconds
  setInterval(checkForUpdates, 2000);
</script>
```

### 5. Open in Browser

Automatically open presentation in default browser:

**macOS:**
```bash
open http://localhost:8000
```

**Linux:**
```bash
xdg-open http://localhost:8000
```

**Windows:**
```bash
start http://localhost:8000
```

### 6. Display Server Info

Show server status and instructions:

```
Starting preview server...

✓ Built presentation
✓ Started HTTP server on http://localhost:8000
✓ Watching for file changes
✓ Opened browser

Press Ctrl+C to stop server

Watching:
  - content.md
  - images/
  - data/
  - scripts/

Next steps:
1. Edit content.md in your editor
2. Changes will auto-rebuild and reload browser
3. Navigate slides with arrow keys
4. Press 'Esc' for slide overview
5. Press 'S' for speaker notes
```

### 7. Handle Shutdown

Gracefully shut down server on Ctrl+C:
- Stop file watcher
- Close HTTP server
- Clean up temporary files
- Show goodbye message

## Example Output

**Starting server:**
```
Starting preview server for presentation...

Building presentation...
✓ Build complete (2.3s)

Starting dev server...
✓ HTTP server running on http://localhost:8000
✓ Live reload enabled
✓ Watching for changes

Opening browser...
✓ http://localhost:8000

Preview server is running!

Watching for changes to:
  - content.md
  - images/ (3 files)
  - data/ (6 files)
  - scripts/ (2 files)

Press Ctrl+C to stop
```

**During development:**
```
[14:23:45] File content.md changed
[14:23:45] Rebuilding presentation...
[14:23:47] Build complete (1.8s)
[14:23:47] Browser will reload automatically

[14:25:12] File images/logo.png changed
[14:25:12] Rebuilding presentation...
[14:25:13] Build complete (0.9s)
```

**Stopping server:**
```
^C
Shutting down preview server...

✓ Stopped file watcher
✓ Closed HTTP server
✓ Cleaned up

Preview session ended.
Total builds: 8
Total time: 15m 34s
```

## Configuration

Support optional configuration for preview:

```yaml
# .claude/presentation-creator.local.md
---
preview:
  port: 8000
  openBrowser: true
  liveReload: true
  watchDebounce: 500  # ms
  buildOnStart: true
---
```

## Advanced Features

### Custom Port

```
/preview-presentation --port 3000
```

### Skip Browser Open

```
/preview-presentation --no-browser
```

### Verbose Logging

```
/preview-presentation --verbose
```

## Error Handling

**Port already in use:**
```
Error: Port 8000 is already in use.

Try:
  1. /preview-presentation --port 8001
  2. Stop other server using port 8000

Or find process: lsof -i :8000
```

**Build fails:**
```
Error: Build failed, cannot start preview.

Run /validate-presentation to check for errors.
```

**No content.md:**
```
Error: content.md not found.

Run /create-presentation first or navigate to presentation directory.
```

## Performance Tips

- Debounce file changes to avoid rapid rebuilds
- Only rebuild if files actually changed (check modification time)
- Cache unchanged assets during rebuild
- Use incremental builds when possible

## Tips

- Keep editor and browser windows side-by-side
- Save frequently to see changes
- Use browser dev tools to debug issues
- Check terminal for build errors
- Ctrl+C to stop when done

## Keyboard Shortcuts

**In terminal:**
- `Ctrl+C` - Stop server
- `R` - Manual rebuild (optional)
- `O` - Open browser again (optional)

**In browser (Reveal.js):**
- Arrow keys - Navigate slides
- Space - Next slide
- Esc - Slide overview
- F - Fullscreen
- S - Speaker notes
- B - Pause (black screen)

## Related

- Use `/build-presentation` for one-time builds
- Use `/validate-presentation` if build fails
- Consult presentation-structure skill for tag syntax
