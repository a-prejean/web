// Unregister plugin globally
Chart.plugins.unregister(ChartDataLabels);

function doughnut_chart(chart_name) {
  // Grab chart element by id
  var chartElement = document.getElementById(chart_name);

  var chart = new Chart(chartElement, {
    type: "doughnut",
    data: {
      labels: ["Data A: ", "Data B: "],
      datasets: [
        {
          data: [6, 4],
          backgroundColor: chart_colors,
          borderColor: "#2d2e39",
          borderWidth: 4
        }
      ]
    },
    // Register for this chart
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          borderColor: chart_colors,
          borderRadius: 4,
          borderWidth: 1,
          anchor: "end", // 'center'
          align: "end", // 'start'
          textAlign: "center",
          offset: 20,
          padding: 8,
          clamp: true,
          color: "#fff",
          display: "auto",
          formatter: function (value, context) {
            return (
              context.chart.data.labels[context.dataIndex] +
              Math.round(value * 10) +
              "%"
            );
          },
          font: {
            size: 14,
            lineHeight: 1.25
          }
        },
        outlabels: false
      },
      legend: false
    }
  });
}

// Create Chart
doughnut_chart("datalabelsChart");


function doughnut_chart_alt(chart_name) {
  // Grab chart element by id
  var chartElement = document.getElementById(chart_name);

  var chart = new Chart(chartElement, {
    type: "doughnut",
    data: {
      labels: ["Data A:", "Data B:"],
      datasets: [
        {
          data: [6, 4],
          backgroundColor: chart_colors,
          borderColor: '#2d2e39',
          borderWidth: 4
        }
      ]
    },
    options: {
      zoomOutPercentage: 60, // makes chart 40% smaller (50% by default, if the preoprty is undefined)
      plugins: {
        legend: false,
        outlabels: {
          backgroundColor: '#2d2e39',
          borderRadius: 4,
          borderWidth: 1,
          lineWidth: 4,
          padding: 8,
          text: "%l %p",
          color: '#fff',
          stretch: 40,
          font: {
            size: 14,
            lineHeight: 1.25,
            minSize: 14,
            maxSize: 14
          }
        }
      }
    }
  });
}

// Create Chart
doughnut_chart_alt("outlabeledChart");
