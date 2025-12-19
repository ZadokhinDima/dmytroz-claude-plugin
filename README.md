# Dmytroz Claude Plugin Marketplace

[![Plugins](https://img.shields.io/badge/plugins-1-blue)](https://github.com/ZadokhinDima/dmytroz-claude-plugin)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Personal collection of Claude Code plugins for automation, workflows, and productivity.

## Quick Start

### Add This Marketplace

Register this marketplace to browse and install plugins through Claude Code:

```bash
claude plugin marketplace add https://github.com/ZadokhinDima/dmytroz-claude-plugin
```

After adding the marketplace, you can:
- Browse plugins with `/plugin` command in Claude Code
- Install any plugin from this marketplace

### Install Plugins

Once the marketplace is added, install plugins by name:

```bash
# Install from your registered marketplace
claude plugin install presentation-creator

# Or install directly via URL
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

**View all available plugins:** See the [`marketplace.json`](./.claude-plugin/marketplace.json) file or browse the repository.

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

### Managing Marketplaces

```bash
# List all registered marketplaces
claude plugin marketplace list

# Update marketplace (refresh plugin list)
claude plugin marketplace update dmytroz-claude-plugin

# Remove marketplace
claude plugin marketplace remove dmytroz-claude-plugin
```

### Managing Plugins

```bash
# List installed plugins
claude plugin list

# Remove a plugin
claude plugin remove presentation-creator

# Update a plugin
claude plugin update presentation-creator

# Enable/disable a plugin
claude plugin enable presentation-creator
claude plugin disable presentation-creator
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
