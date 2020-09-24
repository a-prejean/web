// Line Chart
function lineChart(chart_name, xAxis, yAxis, yLabel, curve_color) {
  // Grab chart element by id
  var chartElement = document.getElementById(chart_name);
  // variable to store gradient
  var ctx = chartElement.getContext("2d");

  if (curve_color.length > 1) {
    var curveColor = ctx.createLinearGradient(0, 0, chartElement.width, 0);
    curveColor.addColorStop(0, curve_color[0]); // first
    curveColor.addColorStop(1, curve_color[curve_color.length - 1]); // last

    if (curve_color.length > 2) {
      // curveColor.addColorStop(0.5, curve_color[1]);
      var i;
      for (i = 1; i < curve_color.length - 1; i++) {
        curveColor.addColorStop(i / (curve_color.length - 1), curve_color[i]);
      }
    }
  } else {
    var curveColor = curve_color[0];
  }

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

    var chart = new Chart(chartElement, {
      type: "line",
      data: {
        labels: xData,
        datasets: [
          {
            data: yData,
            label: yLabel,
            backgroundColor: curveColor,
            borderColor: curveColor,
            hoverBackgroundColor: curveColor,
            hoverBorderColor: curveColor,
            borderWidth: 4,
            pointRadius: 3,
            pointHoverRadius: 6,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: chart_aspect_ratio,
        legend: {
          display: false,
          drawTicks: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawTicks: false,
                drawBorder: false
              },
              ticks: {
                padding: 12
              },
              scaleLabel: {
                display: true,
                labelString: "Week / Date",
                fontSize: 12
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                drawTicks: false,
                drawBorder: false,
                zeroLineColor: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.08)"
              },
              ticks: {
                padding: 12
              },
              scaleLabel: {
                display: true,
                labelString: "Data Totals",
                fontSize: 12
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
  }
}

// Create Chart
lineChart("line_chart", "Date", "CurveValue", "Data Value", curve_color);
