---
name: run-scripts
description: Execute all scripts in the presentation's scripts/ directory
---

# Run Presentation Scripts

Execute all automation scripts in the presentation's scripts/ directory. This command is useful for:
- Generating dynamic data (CSV files from content analysis)
- Pre-processing assets
- Running custom build steps
- Updating presentation data before building

The scripts will run automatically before building/previewing, but you can also run them manually with this command.

## Instructions

1. Check if we're in a presentation directory (has content.md, images/, data/, scripts/ folders)
2. If scripts/ directory exists:
   - List all .js and .py files in scripts/
   - Execute each script using the appropriate interpreter:
     - `.js` files: `node scripts/filename.js`
     - `.py` files: `python scripts/filename.py`
   - Run scripts in alphabetical order
   - Display output from each script
   - Report success/failure for each script
3. If scripts/ doesn't exist or is empty, inform the user that no scripts were found
4. After all scripts complete, provide a summary of what was executed

## Error Handling

- If a script fails, display the error but continue with remaining scripts
- Show which scripts succeeded and which failed
- Suggest checking the script if errors occur

## Example Output

When running scripts, provide output like:
```
Running presentation scripts...

✓ count-tags.js - Tag usage statistics generated
✓ optimize-images.py - 5 images optimized

All scripts completed successfully.
```

## Notes

- Scripts are automatically run before `/build-presentation` and `/preview-presentation`
- You can add custom scripts to automate data generation, asset processing, etc.
- Scripts have access to the presentation directory structure

## Related

- Use `/build-presentation` to generate HTML presentation
- Use `/preview-presentation` to preview with live reload
- Use `presentation-examples` skill to see example scripts (e.g., count-tags.js)
