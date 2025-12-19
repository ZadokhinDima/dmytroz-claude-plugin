/**
 * Custom Chart Example
 * Demonstrates how to create a custom visualization using Chart.js
 */

function render(containerId) {
  const container = document.getElementById(containerId);

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = `chart-${containerId}`;
  canvas.width = 800;
  canvas.height = 400;
  container.appendChild(canvas);

  // Sample data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Custom Visualization',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2
    }]
  };

  // Chart configuration
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Custom Chart Example'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Create chart
  new Chart(canvas, config);
}

// Auto-execute if container is specified
if (typeof CHART_CONTAINER !== 'undefined') {
  render(CHART_CONTAINER);
}
