---
name: edit-slides
description: Interactive guided presentation creation and editing with style selection and slide-by-slide content planning
argument-hint: <presentation-name>
allowed-tools:
  - Write
  - Edit
  - Read
  - Bash
  - AskUserQuestion
---

# Edit Slides Command

An interactive, guided presentation creation and editing experience that helps you plan, structure, and refine your presentation slide-by-slide with style customization. Works with both new and existing presentations.

## Usage

```bash
# Create new presentation
/edit-slides my-presentation

# Edit existing presentation (resumes from where you left off)
/edit-slides my-presentation
```

## What This Command Does

Creates or edits a presentation through an intelligent, adaptive workflow:
1. **Checks for existing presentation** and style configuration
2. **Asks about style editing** if styles are already defined
3. **Analyzes existing slides** to determine resume point
4. **Discovers topic and audience** (if new or not defined)
5. **Suggests and previews visual styles** with HTML samples
6. **Guides slide-by-slide content planning** with confirmations
7. **Generates/updates content.md and resources** incrementally

## Interactive Workflow

### Phase 0: Context Analysis (Smart Resume)

**Step 0.1: Check for Existing Presentation**
- Check if presentation directory exists
- If exists, read `content.md` to analyze current state
- If doesn't exist, create directory structure and proceed to Phase 1

**Step 0.2: Parse Style Configuration**
- Look for style configuration in content.md frontmatter:
  ```yaml
  ---
  style: Tech/Startup
  colorScheme:
    primary: "#00D9FF"
    secondary: "#FF6B6B"
    background: "#1a1a1a"
    text: "#ffffff"
  typography:
    headings: "Montserrat"
    body: "Open Sans"
  ---
  ```
- If style guides found, ask: "I found existing style configuration. Would you like to:"
  - Options:
    1. Keep current style and edit slides only
    2. Update style configuration
    3. Start fresh (clear all and redesign)

**Step 0.3: Analyze Existing Slides**
- Parse content.md to identify completed slides
- Count slides and identify types (text, image, chart, table)
- Determine if presentation is:
  - Empty (only title or template)
  - Partially complete (some slides, but seems unfinished)
  - Complete (full presentation with closing slide)

**Step 0.4: Determine Starting Point**
- If empty or new: Start at Phase 1 (Discovery)
- If partially complete: Ask "I found [N] slides. Would you like to:"
  - Options:
    1. Continue from slide [N+1] (resume)
    2. Edit existing slides
    3. Add slides at specific position
    4. Redesign from scratch
- If complete: Ask "This presentation appears complete. Would you like to:"
  - Options:
    1. Add more slides
    2. Edit specific slides
    3. Update style/theme
    4. Create a variation

### Phase 1: Discovery & Planning (Only if new or style not defined)

**Step 1: Topic Discovery**
- Ask: "What is the topic of your presentation?"
- Ask: "What are the main objectives? (e.g., educate, persuade, inform)"
- Store responses for context

**Step 2: Audience Analysis**
- Ask: "Who is your target audience?"
  - Options: Technical professionals, Business executives, Students/Educators, General public, Other
- Ask: "What is their expertise level with this topic?"
  - Options: Beginner, Intermediate, Advanced, Mixed
- Ask: "What is the presentation context?"
  - Options: Conference talk, Business meeting, Educational lecture, Sales pitch, Other
- Use this to tailor content complexity and style

**Step 3: Presentation Scope**
- Ask: "How many slides do you envision? (excluding title/thank you)"
  - Suggest: 5-10 for short (15 min), 10-20 for medium (30 min), 20-30 for long (45+ min)
- Ask: "Will you need data visualizations?"
  - Options: Yes - charts/graphs, Yes - tables, Both, No
- Ask: "Will you need images?"
  - Options: Yes, No, Maybe

### Phase 2: Style Selection

**Step 4: Visual Style**
- Present 3-4 style options based on audience/context
- For each style, generate a sample HTML preview in `output/style-preview-[n].html`
- Styles should include:
  1. **Professional Corporate**: Clean, minimal, blue/gray tones
  2. **Creative Modern**: Bold colors, dynamic layouts, gradients
  3. **Academic Classic**: Traditional, serif fonts, conservative colors
  4. **Tech/Startup**: Dark theme, accent colors, modern sans-serif
- Ask user to select preferred style or request custom

**Step 5: Color Scheme**
- Based on selected style, present color scheme options
- Generate HTML preview showing:
  - Primary color (headings, accents)
  - Secondary color (highlights)
  - Background color
  - Text color
- Options format: Present 3 variations with hex codes
- Ask: "Select a color scheme or provide custom colors"

**Step 6: Typography**
- Present font pair options based on style:
  - Headings font
  - Body text font
- Show preview in HTML
- Ask: "Select a font pair or provide custom fonts"

### Phase 3: Slide-by-Slide Structure

**Step 7: Title Slide**
- Create title slide in content.md
- Ask: "Presentation title?"
- Ask: "Subtitle or tagline? (optional)"
- Ask: "Author/presenter name?"
- Confirm before proceeding

**Step 8: Content Slides**
For each slide (based on count from Step 3):
- Ask: "What is the focus of slide [n]?"
- Ask: "What type of content?"
  - Options:
    - Text only (bullets, paragraphs)
    - Text + Image
    - Text + Chart
    - Text + Table
    - Full-screen image
    - Split layout (50/50)
- Based on type, ask specific questions:

  **For Text slides:**
  - "Key points to cover? (bullet format)"

  **For Image slides:**
  - "Image description/placeholder name?"
  - "Image width/size? (default: 600px)"
  - "Image alt text?"
  - Create placeholder note in images/ folder

  **For Chart slides:**
  - "Chart type?" (bar, line, pie, scatter, doughnut)
  - "What data will be shown? (describe)"
  - "Chart title?"
  - Create sample CSV template in data/ folder

  **For Table slides:**
  - "What data will be shown? (describe columns)"
  - "Table style?" (striped, bordered, minimal)
  - Create sample CSV template in data/ folder

- Write slide to content.md
- Show preview of what was written
- Ask: "Confirm this slide? (yes/edit/skip)"
  - yes: proceed to next
  - edit: allow modifications
  - skip: skip this slide
- Repeat until all slides completed

**Step 9: Closing Slide**
- Ask: "Thank you slide message?"
- Ask: "Include contact information?"
  - If yes: "Email/website/social handles?"
- Create closing slide
- Confirm

### Phase 4: Finalization

**Step 10: Resource Generation**
- Create all CSV templates in data/ folder
- Create image placeholder list in images/README.md
- Create custom style configuration if applicable
- Create .gitignore

**Step 11: Summary & Next Steps**
- Display summary:
  - Total slides created
  - Resources needed (images, data files)
  - Selected style/colors
- Show next steps:
  1. Add actual images to images/
  2. Populate CSV files in data/
  3. Run /build-presentation
  4. Preview with /preview-presentation

## Implementation Instructions

### Directory Structure
```
<presentation-name>/
├── content.md              # Generated slide structure
├── images/
│   └── README.md          # List of needed images
├── data/
│   ├── [chart-data].csv   # Generated CSV templates
│   └── [table-data].csv
├── scripts/
│   └── custom-style.css   # If custom style selected
└── .gitignore
```

### Style Preview Generation

When generating style previews, create sample HTML files in `output/` directory:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Style Preview - [Style Name]</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/[theme].css">
  <style>
    /* Custom color overrides */
    :root {
      --primary-color: [color];
      --secondary-color: [color];
      --background-color: [color];
      --text-color: [color];
    }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section>
        <h1>Sample Title</h1>
        <p>This is how your presentation will look</p>
      </section>
      <section>
        <h2>Content Slide</h2>
        <ul>
          <li>First point</li>
          <li>Second point</li>
        </ul>
      </section>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
  <script>Reveal.initialize();</script>
</body>
</html>
```

### Content.md Template Structure

Based on user inputs, generate content.md with YAML frontmatter for style config and proper tag syntax:

```markdown
---
style: Tech/Startup
colorScheme:
  primary: "#00D9FF"
  secondary: "#FF6B6B"
  background: "#1a1a1a"
  text: "#ffffff"
typography:
  headings: "Montserrat"
  body: "Open Sans"
---

# [User's Title]
[Subtitle if provided]

[Author if provided]

---

## [Slide 2 Title]

[Content based on type selected]

[For images:]
#image-<placeholder-name.png, width=[size], alt="[description]">

[For charts:]
#chart-<data-file.csv, type=[chart-type], title="[title]">

[For tables:]
#table-<data-file.csv, style=[style]>

---

[Repeat for each slide...]

---

# [Closing message]

[Contact info if provided]
```

### CSV Template Generation

For each chart/table, create appropriately named CSV files:

**For charts** - `data/[descriptive-name]-chart.csv`:
```csv
Label,Value
Category 1,0
Category 2,0
Category 3,0
```

**For tables** - `data/[descriptive-name]-table.csv`:
```csv
[Column1],[Column2],[Column3]
Row 1,Data,Data
Row 2,Data,Data
```

### Image Placeholder Tracking

Create `images/README.md`:
```markdown
# Required Images

Please add the following images to this folder:

1. **placeholder-1.png**
   - Description: [user's description]
   - Recommended size: [width]px
   - Alt text: [alt text]

2. **placeholder-2.jpg**
   - Description: [user's description]
   - Recommended size: [width]px
   - Alt text: [alt text]

[etc...]
```

## Example Interaction Flows

### Example 1: New Presentation

```
User: /edit-slides tech-innovation-2025

Claude: I don't see an existing presentation at 'tech-innovation-2025'. Let's create it!

Creating directory structure...
✓ Created tech-innovation-2025/

Let's start with some questions:

What is the topic of your presentation?
> [User: Latest trends in AI technology]

What are the main objectives?
> [User: Educate and inspire]

Who is your target audience?
Options: 1) Technical professionals 2) Business executives 3) Students 4) General public 5) Other
> [User: 2]

What is their expertise level?
Options: 1) Beginner 2) Intermediate 3) Advanced 4) Mixed
> [User: 2]

Great! I'll create a business-focused presentation for intermediate-level executives.

How many slides do you envision?
> [User: 12]

Will you need data visualizations?
Options: 1) Yes - charts/graphs 2) Yes - tables 3) Both 4) No
> [User: 1]

Perfect! Now let's choose a visual style. I'm generating previews...

[Generates 3 HTML previews]

Style options:
1. Professional Corporate (Blue/Gray, clean, minimal)
   Preview: output/style-preview-1.html
2. Creative Modern (Bold colors, dynamic)
   Preview: output/style-preview-2.html
3. Tech/Startup (Dark theme, modern)
   Preview: output/style-preview-3.html

Which style do you prefer? (1-3 or describe custom)
> [User: 3]

Excellent choice! Now for colors...
[Shows color scheme options in HTML preview]

[Continue through each phase...]

Slide 1: What is the focus of this slide?
> [User: Introduction to AI trends]

What type of content?
Options: 1) Text only 2) Text + Image 3) Text + Chart 4) Text + Table
> [User: 2]

Image description?
> [User: AI brain visualization]

Image width? (default: 600px)
> [User: 500]

Writing slide 1...

## Introduction to AI Trends

The landscape of artificial intelligence is rapidly evolving.

#image-<ai-brain-visualization.png, width=500, alt="AI brain visualization">

Confirm this slide? (yes/edit/skip)
> [User: yes]

[Continues for all slides...]

✓ Presentation structure created!
✓ 12 slides written to content.md
✓ 3 chart templates created in data/
✓ Image requirements documented in images/README.md
✓ Custom dark theme configured in scripts/custom-style.css

Next steps:
1. Add 5 images to images/ folder (see images/README.md)
2. Populate 3 CSV files in data/ folder
3. Run /build-presentation to generate HTML
4. Run /preview-presentation to view your presentation
```

### Example 2: Resume Existing Presentation

```
User: /edit-slides tech-innovation-2025

Claude: Found existing presentation 'tech-innovation-2025'!

Analyzing content...
✓ Found style configuration (Tech/Startup theme, dark colors)
✓ Found 7 slides (Title + 5 content + Thank you)
✓ Status: Partially complete (planned for 12 slides)

I found existing style configuration:
- Style: Tech/Startup
- Colors: Dark theme with cyan accents
- Fonts: Montserrat / Open Sans

Would you like to:
1. Keep current style and edit slides only
2. Update style configuration
3. Start fresh (clear all and redesign)

> [User: 1]

Great! I'll keep the existing style.

I found 7 slides, but it looks like you planned for 12. Would you like to:
1. Continue from slide 8 (resume adding slides)
2. Edit existing slides
3. Add slides at specific position
4. Mark as complete (already has 7 slides)

> [User: 1]

Perfect! Let's continue building from slide 8.

Slide 8: What is the focus of this slide?
> [User: Implementation challenges]

What type of content?
Options: 1) Text only 2) Text + Image 3) Text + Chart 4) Text + Table
> [User: 1]

Key points to cover?
> [User: Technical debt, Resource constraints, Timeline pressures]

Writing slide 8...

## Implementation Challenges

Key obstacles to address:
- Technical debt and legacy systems
- Resource constraints and budget limitations
- Timeline pressures and market demands

Confirm this slide? (yes/edit/skip)
> [User: yes]

✓ Slide 8 added

[Continues for remaining slides...]
```

### Example 3: Edit Specific Slide

```
User: /edit-slides tech-innovation-2025

Claude: Found existing presentation with 12 slides.

This presentation appears complete. Would you like to:
1. Add more slides
2. Edit specific slides
3. Update style/theme
4. Create a variation

> [User: 2]

Which slide would you like to edit? (1-12)
> [User: 5]

Current slide 5:

## Market Opportunities

The AI market is growing rapidly.

#chart-<market-data.csv, type=bar, title="Market Growth">

Would you like to:
1. Rewrite slide content
2. Change slide type (add/remove image/chart/table)
3. Update existing chart/image/table settings
4. Cancel

> [User: 1]

Key points for this slide?
> [User: Market size projections, Geographic expansion, Industry verticals]

Writing updated slide 5...

## Market Opportunities

Significant growth potential across sectors:
- Market projected to reach $500B by 2030
- Geographic expansion into emerging markets
- Vertical-specific solutions gaining traction

#chart-<market-data.csv, type=bar, title="Market Growth 2025-2030">

Confirm changes? (yes/edit/cancel)
> [User: yes]

✓ Slide 5 updated successfully
```

## Error Handling

**If content.md is malformed:**
```
Warning: Unable to parse content.md properly.
Found syntax errors at line [N].

Would you like to:
1. Attempt to fix automatically
2. Show me the errors to fix manually
3. Start fresh with backup of current file
```

**If user cancels mid-way:**
```
Progress saved to content.md.
Resume anytime by running:
/edit-slides [same-name]

Your work has been preserved.
```

**If invalid input:**
- Provide helpful error message
- Re-ask the question
- Offer examples

## Tips for Implementation

1. **Always check for existing presentation first** - Read content.md to understand context
2. **Parse YAML frontmatter** - Extract style config to determine if styles are already set
3. **Use AskUserQuestion extensively** - This is an interactive command
4. **Generate real HTML previews** - Users need to see actual visual styles
5. **Be patient** - Confirm each slide before moving forward
6. **Adapt to answers** - Tailor questions based on previous responses and existing content
7. **Save incrementally** - Write to content.md as you go, don't wait until the end
8. **Provide context** - Remind users where they are in the process
9. **Be flexible** - Allow users to go back and edit if needed
10. **Smart resume** - Detect partial work and offer to continue from where they left off
11. **Preserve work** - Never overwrite existing slides without explicit confirmation

## Related Commands

- `/init-presentation` - Quick setup without interactive guidance
- `/build-presentation` - Generate HTML from content.md
- `/validate-presentation` - Check structure and resources
- `/preview-presentation` - Launch preview server
