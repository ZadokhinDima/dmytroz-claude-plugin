# Dmytroz Claude Plugin Marketplace

[![Plugins](https://img.shields.io/badge/plugins-1-blue)](https://github.com/ZadokhinDima/dmytroz-claude-plugin)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Personal collection of Claude Code plugins for automation, workflows, and productivity.

## Quick Install

```bash
# Install presentation-creator plugin
claude plugin add https://github.com/ZadokhinDima/dmytroz-claude-plugin/presentation-creator
```

## Available Plugins

### 📊 presentation-creator

Create beautiful interactive HTML presentations from semantic markdown content.

**Features:**
- Write presentation content in simple `content.md` with semantic tags
- Automatic HTML generation with Reveal.js
- Support for images, tables, charts, and YouTube videos
- CSV-backed tables and data visualizations
- Auto-build on content changes
- Component code guidelines for consistent styling

**Installation:**
```bash
claude plugin add https://github.com/ZadokhinDima/dmytroz-claude-plugin/presentation-creator
```

**Learn more:** [presentation-creator documentation](./presentation-creator/README.md)

---

## Browse Plugins

**View all available plugins:** See the [`marketplace.json`](./marketplace.json) file or browse the repository.

**Current plugins:**
- [presentation-creator](./presentation-creator) - Interactive HTML presentations

---

## Usage

Each plugin in this marketplace can be installed independently using the Claude Code CLI.

### Installing a Plugin

```bash
# Install specific plugin
claude plugin add https://github.com/ZadokhinDima/dmytroz-claude-plugin/<plugin-name>

# Example: Install presentation-creator
claude plugin add https://github.com/ZadokhinDima/dmytroz-claude-plugin/presentation-creator
```

### Managing Plugins

```bash
# List installed plugins
claude plugin list

# Remove a plugin
claude plugin remove <plugin-name>

# Update a plugin
claude plugin update <plugin-name>
```

## Contributing

This is a personal plugin collection, but feel free to:
- Report issues
- Suggest improvements
- Fork and create your own versions

## License

MIT License - See individual plugin directories for specific licenses.

## Author

Dmytro Zadokhin

---

**More plugins coming soon!** 🚀
