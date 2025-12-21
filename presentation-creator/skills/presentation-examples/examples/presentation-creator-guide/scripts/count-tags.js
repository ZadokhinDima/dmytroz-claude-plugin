#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read content.md
const contentPath = path.join(__dirname, '..', 'content.md');
const content = fs.readFileSync(contentPath, 'utf-8');

// Count different tag types
const tagCounts = {
  'Images': 0,
  'Charts': 0,
  'Tables': 0,
  'Videos': 0
};

// Count #image- tags
const imageMatches = content.match(/#image-</g);
tagCounts['Images'] = imageMatches ? imageMatches.length : 0;

// Count #chart- tags
const chartMatches = content.match(/#chart-</g);
tagCounts['Charts'] = chartMatches ? chartMatches.length : 0;

// Count #table- tags
const tableMatches = content.match(/#table-</g);
tagCounts['Tables'] = tableMatches ? tableMatches.length : 0;

// Count #video- tags
const videoMatches = content.match(/#video-</g);
tagCounts['Videos'] = videoMatches ? videoMatches.length : 0;

// Create CSV content
let csv = 'Tag Type,Count\n';
for (const [tag, count] of Object.entries(tagCounts)) {
  csv += `${tag},${count}\n`;
}

// Write to CSV file
const outputPath = path.join(__dirname, '..', 'data', 'tags-usage.csv');
fs.writeFileSync(outputPath, csv);

console.log('Tag usage statistics generated:');
console.log(tagCounts);
console.log(`\nCSV saved to: ${outputPath}`);
