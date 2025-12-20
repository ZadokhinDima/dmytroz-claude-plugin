---
name: init-presentation
description: Initialize a new presentation with proper folder structure
argument-hint: <presentation-name>
allowed-tools:
  - Write
  - Bash
  - Read
---

# Init Presentation Command

Initialize a new presentation project with the standard folder structure and template files.

## Usage

```
/init-presentation my-presentation
```

## What This Command Does

1. Creates presentation folder structure
2. Generates template `content.md` with example slides
3. Creates empty asset folders (images/, data/, scripts/)
4. Adds sample CSV data file
5. Creates `.gitignore` for output directory

## Implementation Instructions

When this command executes:

1. **Validate presentation name:**
   - Check that presentation name is provided
   - Ensure name uses valid characters (alphanumeric, hyphens, underscores)
   - Verify directory doesn't already exist

2. **Create directory structure:**
   ```
   <presentation-name>/
   ├── content.md
   ├── images/
   ├── data/
   ├── scripts/
   └── .gitignore
   ```

3. **Generate template content.md:**
   ```markdown
   # Welcome to [Presentation Name]

   Your presentation title slide.

   ---

   ## Slide 2

   Add your content here.

   Use markdown formatting:
   - **Bold text**
   - *Italic text*
   - Lists and more

   ---

   ## Example with Image

   #image-<example.png, width=400, alt="Example image">

   ---

   ## Example with Table

   #table-<sample-data.csv, style=striped>

   ---

   ## Example with Chart

   #chart-<sample-data.csv, type=bar, title="Sample Chart">

   ---

   ## Next Steps

   1. Edit this content.md file
   2. Add images to images/ folder
   3. Add CSV data to data/ folder
   4. Run /build-presentation to generate HTML
   5. Open output/index.html to view

   ---

   # Thank You

   Questions?
   ```

4. **Create sample data file (data/sample-data.csv):**
   ```csv
   Month,Value
   January,45
   February,52
   March,61
   April,58
   May,67
   June,73
   ```

5. **Create .gitignore:**
   ```
   output/
   .DS_Store
   ```

6. **Confirm creation:**
   - Display success message
   - Show next steps:
     - Edit content.md
     - Add assets
     - Run /build-presentation

## Example Output

```
✓ Created presentation structure at: my-presentation/
✓ Generated template content.md
✓ Created asset folders (images/, data/, scripts/)
✓ Added sample data file

Next steps:
1. cd my-presentation
2. Edit content.md with your presentation content
3. Add images to images/ folder
4. Add CSV files to data/ folder
5. Run /build-presentation to generate HTML presentation
```

## Error Handling

**If directory already exists:**
```
Error: Directory 'my-presentation' already exists.
Choose a different name or remove the existing directory.
```

**If invalid name:**
```
Error: Invalid presentation name 'my presentation'.
Use only alphanumeric characters, hyphens, and underscores.
```

## Tips

- Use descriptive presentation names
- Check that you're in the correct parent directory before running
- Review the template content.md to understand the tag system
- Start by customizing the template before creating from scratch

## Related

- Run `/build-presentation` after editing content
- Use `/validate-presentation` to check for errors
- Use presentation-structure skill for tag syntax guidance
