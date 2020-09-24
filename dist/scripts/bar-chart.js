
// Bar Chart
function barChart(
  chart_name,
  xAxis,
  yAxis,
  yLabel,
  colorScale,
  colorRangeInfo
) {
  // Request data using D3
  d3.csv(
    "https://raw.githubusercontent.com/a-prejean/data-viz/master/CREST/Combined_Data_Lafayette.csv"
  ).then(makeChart);

  function makeChart(source_data) {
    var xDataFiltered = source_data.filter(function (d) {
      return d[xAxis] != "";
    });
    var xData = xDataFiltered.map(function (d) {
      return d[xAxis];
    });
    var yDataFiltered = source_data.filter(function (d) {
      return d[yAxis] != "";
    });
    var yData = yDataFiltered.map(function (d) {
      return d[yAxis];
    });

    var dataLength = xData.length;

    // Create color array
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);
    // var COLORS = "#a52941";

    // Grab chart element by id
    var chartElement = document.getElementById(chart_name);
    var chart = new Chart(chartElement, {
      type: "horizontalBar",
      data: {
        labels: xData,
        datasets: [
          {
            label: yLabel,
            data: yData,
            backgroundColor: COLORS,
            hoverBackgroundColor: COLORS
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: chart_aspect_ratio,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                drawTicks: false,
                drawBorder: false,
                zeroLineColor: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.08)"
              },
              ticks: {
                padding: 8
              },
              scaleLabel: {
                display: true,
                labelString: "Data Totals",
                fontSize: 12
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawTicks: false,
                drawBorder: false,
                zeroLineColor: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.08)"
              },
              ticks: {
                callback: function (value, index, values) {
                  return "" + value;
                },
                fontSize: 12,
                padding: -6,
                mirror: true,
                z: 1 // Show y-axis labels inside horizontal bars
              },
              scaleLabel: {
                display: true,
                labelString: "Week / Date",
                fontSize: 14
              }
            }
          ]
        },
        hover: {
          onHover: function (e) {
            var point = this.getElementAtEvent(e);
            e.target.style.cursor = point.length ? "pointer" : "default";
          }
        }
      }
    });

    // return chart;
  }
}

// Create Chart
barChart(
  "bar_chart",
  "Date",
  "CurveValue",
  "Data Value",
  colorScale,
  colorRangeInfo
);
