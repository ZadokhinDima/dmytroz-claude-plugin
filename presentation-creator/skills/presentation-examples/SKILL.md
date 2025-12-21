# Presentation Examples Skill

Browse and learn from complete example presentations that demonstrate all plugin features.

## When to Use This Skill

This skill should be invoked when the user:
- Asks for "examples" or "sample presentations"
- Wants to see "how to use" presentation features
- Requests a "reference" or "demo" presentation
- Asks "can you show me an example?"
- Wants to learn by looking at working presentations
- Needs inspiration for their own presentation structure

## What This Skill Provides

This skill showcases complete, working example presentations that demonstrate:
- All tag types (images, charts, tables, videos, scripts)
- Different presentation styles and themes
- Custom color schemes and typography
- Data visualization techniques
- Layout and composition patterns
- Best practices for presentation structure

## Available Examples

### presentation-creator-guide

**Location:** `examples/presentation-creator-guide/`

A comprehensive guide presentation showcasing the presentation-creator plugin itself.

**Features Demonstrated:**
- Custom color scheme (Claude Design warm earth tones)
- Image embedding with custom sizing
- Multi-dataset line charts with 4 data series
- Pie charts with custom colors
- CSV-based tables with striped styling
- YouTube video embedding
- Custom scripts for data generation
- Vertical progress indicator
- Clean, professional typography
- Consistent spacing and layout

**Structure:**
```
presentation-creator-guide/
├── content.md           # Main presentation content
├── data/               # CSV files for charts/tables
│   ├── features-comparison.csv
│   ├── tags-usage.csv
│   └── usage-stats.csv
├── images/             # Image assets
│   └── intro.png
├── output/             # Generated HTML presentation
└── scripts/            # Custom scripts
    └── count-tags.js
```

**Use Cases:**
- Reference for learning all tag types
- Template for documentation presentations
- Example of professional styling
- Guide for implementing custom themes

## How to Use Examples

### View Example Presentation

```bash
# Navigate to example directory
cd ~/.claude/plugins/presentation-creator/skills/presentation-examples/examples/presentation-creator-guide

# View the content
cat content.md

# Build and preview
/build-presentation
/preview-presentation
```

### Copy Example as Template

```bash
# Copy example to your working directory
cp -r ~/.claude/plugins/presentation-creator/skills/presentation-examples/examples/presentation-creator-guide ./my-presentation

# Customize content.md
cd my-presentation
# Edit content.md with your content
```

### Learn from Example Structure

1. **Study content.md** - See how tags are used in context
2. **Examine data/ folder** - Learn CSV data formatting for charts/tables
3. **Review output/** - See the generated HTML and styling
4. **Inspect scripts/** - Understand custom script integration

## Tag Usage Examples

### From presentation-creator-guide

**Image Tag:**
```markdown
#image-<intro.png, width=400, alt="Presentation Creator introduction">
```

**Table Tag:**
```markdown
#table-<features-comparison.csv, style=striped>
```

**Chart Tags:**
```markdown
#chart-<usage-stats.csv, type=line, title="Monthly Usage Growth">
#chart-<tags-usage.csv, type=pie, title="Tag Usage">
```

**Video Tag:**
```markdown
#video-<https://www.youtube.com/watch?v=SpPhm7S9vsQ, title="Claude Demo">
```

## Customization Patterns

### Color Scheme (from presentation-creator-guide)

```yaml
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
```

## Tips

- **Start with an example** - Easier to customize than creating from scratch
- **Study the CSV formats** - See exactly how data should be structured
- **Compare output/ to content.md** - Understand how tags are processed
- **Mix and match** - Combine techniques from different examples
- **Keep examples updated** - Copy before modifying to preserve originals

## Adding Your Own Examples

Want to contribute an example presentation?

1. Create presentation in `examples/your-example-name/`
2. Include complete structure (content.md, data/, images/, scripts/)
3. Document what features it demonstrates
4. Update this SKILL.md with your example

## Related

- Use `presentation-structure` skill for tag syntax reference
- Use `/init-presentation` to create new presentations
- Use `/validate-presentation` to check your presentation structure
- Use `/build-presentation` to generate HTML from examples
