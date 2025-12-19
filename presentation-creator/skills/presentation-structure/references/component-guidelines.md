# Component Code Guidelines

Detailed specifications for styling tables, charts, layouts, and other presentation components to ensure professional, consistent, and accessible presentations.

## Table Styling

### CSS Classes

#### Striped Tables

```css
.striped-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
}

.striped-table thead {
  background-color: #2C3E50;
  color: #ECF0F1;
}

.striped-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.striped-table tbody tr:nth-child(even) {
  background-color: #F8F9FA;
}

.striped-table tbody tr:nth-child(odd) {
  background-color: #FFFFFF;
}

.striped-table td {
  padding: 10px 16px;
  border-bottom: 1px solid #E9ECEF;
}

.striped-table tbody tr:hover {
  background-color: #E3F2FD;
  transition: background-color 0.2s ease;
}
```

#### Bordered Tables

```css
.bordered-table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #34495E;
}

.bordered-table th,
.bordered-table td {
  padding: 12px 16px;
  border: 1px solid #BDC3C7;
}

.bordered-table thead {
  background-color: #34495E;
  color: #FFFFFF;
}

.bordered-table tbody tr:hover {
  background-color: #ECF0F1;
}
```

#### Minimal Tables

```css
.minimal-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

.minimal-table thead {
  border-bottom: 2px solid #2C3E50;
}

.minimal-table th {
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: #2C3E50;
}

.minimal-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #E9ECEF;
}

.minimal-table tbody tr:last-child td {
  border-bottom: none;
}
```

### Sortable Tables

Add sorting functionality with JavaScript:

```javascript
// Add to generated HTML for sortable tables
function makeSortable(tableId) {
  const table = document.getElementById(tableId);
  const headers = table.querySelectorAll('th');

  headers.forEach((header, index) => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => sortTable(table, index));
  });
}

function sortTable(table, columnIndex) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  const sorted = rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    // Try numeric sort
    const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ''));
    const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ''));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }

    // Fallback to string sort
    return aText.localeCompare(bText);
  });

  sorted.forEach(row => tbody.appendChild(row));
}
```

### Responsive Tables

For mobile responsiveness:

```css
@media (max-width: 768px) {
  .striped-table,
  .bordered-table,
  .minimal-table {
    font-size: 12px;
  }

  .striped-table th,
  .striped-table td,
  .bordered-table th,
  .bordered-table td {
    padding: 8px;
  }

  /* Stack table on very small screens */
  @media (max-width: 480px) {
    .striped-table thead {
      display: none;
    }

    .striped-table tr {
      display: block;
      margin-bottom: 16px;
      border: 1px solid #E9ECEF;
    }

    .striped-table td {
      display: block;
      text-align: right;
      padding-left: 50%;
      position: relative;
    }

    .striped-table td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 45%;
      padding-left: 15px;
      font-weight: bold;
      text-align: left;
    }
  }
}
```

## Chart Styling

### Chart.js Configuration

#### Default Configuration

```javascript
const defaultChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          family: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          size: 12
        },
        padding: 15,
        usePointStyle: true
      }
    },
    title: {
      display: false,  // Set via title parameter
      font: {
        family: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        size: 18,
        weight: 'bold'
      },
      padding: 20
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        size: 13
      },
      padding: 12,
      cornerRadius: 4
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 12
        }
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};
```

#### Color Schemes

```javascript
const colorSchemes = {
  default: [
    '#4A90E2',  // Blue
    '#7ED321',  // Green
    '#F5A623',  // Orange
    '#D0021B',  // Red
    '#9013FE',  // Purple
    '#50E3C2',  // Teal
    '#F8E71C',  // Yellow
    '#BD10E0'   // Magenta
  ],

  blue: [
    '#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'
  ],

  green: [
    '#064E3B', '#059669', '#34D399', '#6EE7B7', '#A7F3D0'
  ],

  red: [
    '#7F1D1D', '#DC2626', '#EF4444', '#F87171', '#FCA5A5'
  ],

  purple: [
    '#581C87', '#9333EA', '#A855F7', '#C084FC', '#D8B4FE'
  ],

  orange: [
    '#7C2D12', '#EA580C', '#F97316', '#FB923C', '#FDBA74'
  ],

  rainbow: [
    '#EF4444', '#F97316', '#F59E0B', '#10B981',
    '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'
  ],

  monochrome: [
    '#1F2937', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB'
  ]
};
```

#### Chart Type Configurations

**Bar Chart:**
```javascript
const barChartConfig = {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Dataset',
      data: data,
      backgroundColor: colorSchemes.default[0],
      borderColor: colorSchemes.default[0],
      borderWidth: 0,
      borderRadius: 4,
      barPercentage: 0.8
    }]
  },
  options: {
    ...defaultChartConfig,
    scales: {
      ...defaultChartConfig.scales,
      y: {
        ...defaultChartConfig.scales.y,
        beginAtZero: true
      }
    }
  }
};
```

**Line Chart:**
```javascript
const lineChartConfig = {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Dataset',
      data: data,
      borderColor: colorSchemes.default[0],
      backgroundColor: colorSchemes.default[0] + '20',  // 20% opacity
      borderWidth: 3,
      fill: true,
      tension: 0.4,  // Curved lines
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: defaultChartConfig
};
```

**Pie/Doughnut Chart:**
```javascript
const pieChartConfig = {
  type: 'pie',  // or 'doughnut'
  data: {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: colorSchemes.default,
      borderWidth: 2,
      borderColor: '#FFFFFF'
    }]
  },
  options: {
    ...defaultChartConfig,
    scales: undefined,  // No scales for pie charts
    plugins: {
      ...defaultChartConfig.plugins,
      legend: {
        ...defaultChartConfig.plugins.legend,
        position: 'right'
      }
    }
  }
};
```

**Radar Chart:**
```javascript
const radarChartConfig = {
  type: 'radar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Dataset',
      data: data,
      borderColor: colorSchemes.default[0],
      backgroundColor: colorSchemes.default[0] + '30',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: colorSchemes.default[0]
    }]
  },
  options: {
    ...defaultChartConfig,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 12
          }
        },
        ticks: {
          backdropColor: 'transparent'
        }
      }
    }
  }
};
```

### Chart Accessibility

```javascript
// Add ARIA labels and roles
function makeChartAccessible(canvas, chartData) {
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', generateChartDescription(chartData));

  // Add tabindex for keyboard navigation
  canvas.setAttribute('tabindex', '0');
}

function generateChartDescription(chartData) {
  const { type, labels, datasets } = chartData;
  const datasetName = datasets[0].label || 'Data';
  const valueRange = datasets[0].data;
  const min = Math.min(...valueRange);
  const max = Math.max(...valueRange);

  return `${type} chart showing ${datasetName} ranging from ${min} to ${max}`;
}
```

## Layout Patterns

### Column Layouts

#### Two Columns

```css
.columns-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

@media (max-width: 768px) {
  .columns-2 {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

**Usage:**
```html
<div class="columns-2">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

#### Three Columns

```css
.columns-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .columns-3 {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

### Centered Content

```css
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 400px;
}
```

### Grid Layouts

```css
.grid-2x2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
}

.grid-3x3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
}
```

### Flexible Layouts

```css
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Typography

### Heading Styles

```css
h1 {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #1A202C;
}

h2 {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 20px;
  color: #2D3748;
}

h3 {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 16px;
  color: #4A5568;
}
```

### Body Text

```css
p {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #2D3748;
  margin-bottom: 16px;
}

strong {
  font-weight: 600;
  color: #1A202C;
}

em {
  font-style: italic;
  color: #4A5568;
}
```

### Lists

```css
ul, ol {
  font-size: 18px;
  line-height: 1.8;
  margin-left: 32px;
  margin-bottom: 16px;
}

li {
  margin-bottom: 8px;
}

ul li::marker {
  color: #4A90E2;
}
```

### Code

```css
code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 16px;
  background-color: #F7FAFC;
  padding: 2px 6px;
  border-radius: 4px;
  color: #E53E3E;
}

pre code {
  display: block;
  padding: 16px;
  background-color: #2D3748;
  color: #E2E8F0;
  border-radius: 8px;
  overflow-x: auto;
  line-height: 1.5;
}
```

## Color Palette

### Primary Colors

```css
:root {
  --color-primary: #4A90E2;
  --color-secondary: #7ED321;
  --color-accent: #F5A623;
  --color-error: #D0021B;
  --color-success: #7ED321;
  --color-warning: #F5A623;
  --color-info: #4A90E2;
}
```

### Neutral Colors

```css
:root {
  --color-gray-900: #1A202C;
  --color-gray-800: #2D3748;
  --color-gray-700: #4A5568;
  --color-gray-600: #718096;
  --color-gray-500: #A0AEC0;
  --color-gray-400: #CBD5E0;
  --color-gray-300: #E2E8F0;
  --color-gray-200: #EDF2F7;
  --color-gray-100: #F7FAFC;
  --color-white: #FFFFFF;
}
```

### Theme Colors

**Light theme:**
```css
.light-theme {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7FAFC;
  --text-primary: #1A202C;
  --text-secondary: #4A5568;
  --border-color: #E2E8F0;
}
```

**Dark theme:**
```css
.dark-theme {
  --bg-primary: #1A202C;
  --bg-secondary: #2D3748;
  --text-primary: #F7FAFC;
  --text-secondary: #CBD5E0;
  --border-color: #4A5568;
}
```

## Spacing System

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
}
```

## Animations

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

### Slide In

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}
```

### Scale Up

```css
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-up {
  animation: scaleUp 0.5s ease-out;
}
```

## Utility Classes

### Spacing Utilities

```css
.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }

.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }

.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }
```

### Text Utilities

```css
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.text-sm { font-size: 14px; }
.text-md { font-size: 18px; }
.text-lg { font-size: 24px; }
.text-xl { font-size: 32px; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-normal { font-weight: 400; }
```

### Display Utilities

```css
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
```

## Accessibility Guidelines

### Color Contrast

Ensure WCAG AA compliance:
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum contrast ratio
- UI components: 3:1 minimum contrast ratio

### Focus States

```css
button:focus,
a:focus,
input:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}
```

### Screen Reader Support

```html
<!-- Add sr-only class for screen reader text -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

<span class="sr-only">Descriptive text for screen readers</span>
```

## Best Practices

1. **Use semantic HTML** - Proper heading hierarchy, lists, tables
2. **Maintain consistency** - Stick to defined colors, spacing, typography
3. **Test responsiveness** - Check on mobile, tablet, desktop
4. **Ensure accessibility** - Color contrast, alt text, ARIA labels
5. **Optimize performance** - Minimize CSS, use efficient selectors
6. **Document customizations** - Comment custom CSS clearly
7. **Follow naming conventions** - BEM or consistent class naming
8. **Use CSS variables** - For theming and maintainability

## Component Library Integration

For advanced components, consider integrating:

- **Chart.js** - Already included for charts
- **Reveal.js plugins** - Additional presentation features
- **Highlight.js** - Code syntax highlighting
- **Math.js + MathJax** - Mathematical equations
- **Mermaid** - Diagrams from text

See `advanced-techniques.md` for integration guides.
