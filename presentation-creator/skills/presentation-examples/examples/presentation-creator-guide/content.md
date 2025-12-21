---
style: Claude Design
colorScheme:
  primary: "#cc785c"
  secondary: "#a66a4f"
  background: "#f5f0eb"
  text: "#2d2d2d"
  accent: "#e07448"
typography:
  headings: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
---

# Guide to Presentation Creator Plugin

Build beautiful slides with ease

#image-<intro.png, width=400, alt="Presentation Creator introduction">

---

## Installation

Get started with Presentation Creator from the Claude Code marketplace:

```bash
# Install from marketplace
claude-code plugins install presentation-creator

# Verify installation
claude-code plugins list
```

The plugin will be available immediately in your Claude Code environment.

---

## Creating a Presentation

Initialize a new presentation with a single command:

```bash
/init-presentation my-presentation
```

**Folder Structure:**

```
my-presentation/
├── content.md           # Your presentation content
├── images/             # Image assets
├── data/               # CSV files for charts/tables
├── scripts/            # Custom scripts
└── .gitignore          # Git ignore rules
```

---

## Other Commands

- `/edit-slides [name]` - Interactive slide-by-slide editor
- `/build-presentation` - Generate HTML from content.md
- `/preview-presentation` - Launch live preview server
- `/validate-presentation` - Check for errors and missing files

---

## Supported Media & Tags

- **Images:** `$#image-<filename.png, width=600, alt="Description">`
- **Charts:** `$#chart-<data.csv, type=bar, title="Chart Title">`
- **Tables:** `$#table-<data.csv, style=striped>`
- **Videos:** `$#video-<youtube-url, title="Video Title">`

---

## Table Example

#table-<features-comparison.csv, style=striped>

---

## Chart Examples

Visualize data with multiple chart types:

**Line Chart:**
#chart-<usage-stats.csv, type=line, title="Monthly Usage Growth">

**Pie Chart:**
#chart-<tags-usage.csv, type=pie, title="Tags Used in This Demo">

---

## Video Example

Embed YouTube videos directly in your slides:

#video-<https://www.youtube.com/watch?v=SpPhm7S9vsQ, title="Claude-Powered Vending Machine Demo">

---

# Thank You!

Start creating beautiful presentations today

**Get Started:**
```bash
/init-presentation my-first-presentation
```

**Resources:**
- GitHub: github.com/dmytroz-marketplace/presentation-creator
- Documentation: View plugin README for detailed guides
- Marketplace: claude.ai/marketplace
