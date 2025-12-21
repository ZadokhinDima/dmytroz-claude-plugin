---
name: validate-presentation
description: Validate presentation structure, tags, and referenced files
argument-hint: "[presentation-directory]"
allowed-tools:
  - Read
  - Glob
  - Bash
---

# Validate Presentation Command

Check presentation structure, validate tag syntax, verify referenced files exist, and identify potential issues before building.

## Usage

```
/validate-presentation
/validate-presentation path/to/presentation
```

If no path is provided, validates presentation in current directory.

## What This Command Does

1. Checks folder structure is correct
2. Validates content.md exists and is readable
3. Parses all tags and checks syntax
4. Verifies referenced files exist
5. Validates CSV file formats
6. Checks for common errors
7. Provides detailed validation report

## Implementation Instructions

When this command executes:

### 1. Structure Validation

Check that required structure exists:
- `content.md` file exists
- `images/` directory exists
- `data/` directory exists
- `scripts/` directory exists

Report any missing components.

### 2. Content.md Validation

Validate content.md file:
- File is readable
- File is not empty
- Uses valid UTF-8 encoding
- Contains at least one slide (has headers)
- No malformed markdown

### 3. Tag Syntax Validation

Parse all tags and validate syntax:

**Check tag format:**
- Tags start with `#`
- Have type and filename
- Use angle brackets correctly: `#type-<filename>`
- Parameters are properly formatted: `key=value`
- No invalid characters

**Tag-specific validation:**

**#image tags:**
- Filename has valid extension (.png, .jpg, .jpeg, .svg, .gif, .webp)
- Parameters are valid (width, height, alt, class, caption)
- Numeric parameters are actually numbers

**#table tags:**
- Filename has .csv extension
- Style parameter is valid (striped, bordered, minimal, compact, hover)
- Sortable parameter is boolean

**#chart tags:**
- Filename has .csv extension
- Type parameter is valid chart type
- Height/width parameters are numeric
- Color scheme is valid

**#youtube tags:**
- Video ID format is valid (11 characters)
- Parameters are valid

**#script tags:**
- Filename has .js extension
- Container ID doesn't conflict

### 4. File Reference Validation

For each referenced file:

**Images:**
- Check file exists in `images/` folder
- Verify file size (warn if >2MB)
- Check file is readable
- Optionally check image dimensions

**Data files:**
- Check CSV file exists in `data/` folder
- Verify file is readable
- Validate CSV format:
  - Has header row
  - Consistent column count across rows
  - No completely empty rows
  - Data types match chart requirements (numeric for charts)

**Scripts:**
- Check JS file exists in `scripts/` folder
- Verify file is readable
- Optionally check for syntax errors

### 5. Quality Checks

Additional quality validations:

**Accessibility:**
- Images have alt text (warn if missing)
- Tables have captions (warn if missing)
- Proper heading hierarchy

**Performance:**
- Large images (>2MB) - warn
- Large CSV files (>1000 rows) - warn
- Too many assets on single slide - warn

**Best practices:**
- Consistent tag formatting
- Descriptive filenames
- Reasonable slide count (<50)

### 6. Generate Validation Report

Create detailed report with:
- Overall status (✓ PASS or ✗ FAIL)
- Error count (blocking issues)
- Warning count (non-blocking issues)
- Detailed findings organized by category
- Suggestions for fixes

## Example Output

**Successful validation:**
```
Validating presentation...

✓ Structure
  ✓ content.md exists
  ✓ images/ directory exists
  ✓ data/ directory exists
  ✓ scripts/ directory exists

✓ Content
  ✓ content.md is readable (15 slides)
  ✓ Valid markdown format
  ✓ Proper heading hierarchy

✓ Tags (12 total)
  ✓ 3 image tags - syntax valid
  ✓ 2 table tags - syntax valid
  ✓ 4 chart tags - syntax valid
  ✓ 1 YouTube tag - syntax valid
  ✓ 2 script tags - syntax valid

✓ File References
  ✓ All 3 images found in images/
  ✓ All 6 CSV files found in data/
  ✓ All 2 scripts found in scripts/

✓ CSV Validation
  ✓ revenue.csv - valid format (8 rows, 2 columns)
  ✓ sales.csv - valid format (6 rows, 4 columns)
  ✓ metrics.csv - valid format (12 rows, 3 columns)

⚠ Warnings (2)
  ⚠ Image 'photo.jpg' is large (3.2MB) - consider compressing
  ⚠ Chart on slide 8 uses >500 data points - may impact performance

Validation successful!
Ready to build presentation with /build-presentation
```

**Validation with errors:**
```
Validating presentation...

✓ Structure
  ✓ content.md exists
  ✓ All directories present

✗ Tags (3 errors, 1 warning)
  ✗ Line 45: #image-logo.png - missing angle brackets, should be #image-<logo.png>
  ✗ Line 67: #chart-<data.csv, type=invalid> - invalid chart type 'invalid'
  ✗ Line 89: #table-<metrics.csv, style=fancy> - invalid style 'fancy'
  ⚠ Line 34: #image-<photo.jpg> - missing alt text

✗ File References (2 errors)
  ✗ logo.png referenced but not found in images/
  ✗ metrics.csv referenced but not found in data/

✗ CSV Validation
  ✗ data/sales.csv - missing header row
  ✗ data/revenue.csv - inconsistent column count (row 5 has 3 columns, expected 2)

Validation failed with 7 errors and 1 warning.
Please fix errors before building.
```

## Error Categories

### Critical Errors (must fix)
- Missing required files
- Invalid tag syntax
- Malformed CSV files
- Referenced files don't exist

### Warnings (should fix)
- Missing alt text
- Large file sizes
- Performance concerns
- Best practice violations

## Validation Levels

Support different validation levels:

**Quick (default):**
- Structure and syntax only
- Fast validation

**Standard:**
- All checks except optional quality checks

**Thorough:**
- All checks including:
  - Image dimension checks
  - Script syntax validation
  - Advanced CSV analysis
  - Accessibility audit

## Exit Codes

- `0` - Validation passed (no errors)
- `1` - Validation failed (has errors)
- Warnings don't affect exit code

## Tips

- Run validation before every build
- Fix errors in order they're reported
- Address warnings for better presentations
- Use thorough validation before final build
- Set up validation as pre-commit hook

## Related

- Run `/build-presentation` after validation passes
- Use `presentation-structure` skill for tag syntax reference
- Use `presentation-examples` skill to see correct presentation structure
- Consult references/tag-syntax.md for detailed tag documentation
