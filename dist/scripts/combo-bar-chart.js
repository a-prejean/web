// Combo Bar Chart
function comboChart(chart_name, xAxis, yAxis, curve) {
  // Variables
  var axisFontSize = 12;
  var curveStrokeSize = 3;
  var curvePointSize = 6;

  // Request data using D3
  d3.csv(
    "https://raw.githubusercontent.com/a-prejean/data-viz/master/CREST/Combined_Data_Lafayette.csv"
  ).then(makeChart);

  function makeChart(source_data) {
    var xData = source_data.map(function (d) {
      return d[xAxis];
    });
    var yData = source_data.map(function (d) {
      return d[yAxis];
    });
    var curveValueFiltered = source_data.filter(function (d) {
      return d[curve] != "";
    });
    var curveValue = curveValueFiltered.map(function (d) {
      return d[curve];
    });

    // Changing the bar colors based on "Forecast" column
    var barColors = source_data.map(function (d) {
      return d.Forecast === "Actual Cases" ? barColorA : barColorB;
    });
    var barHoverColors = source_data.map(function (d) {
      return d.Forecast === "Actual Cases" ? barHoverColorA : barHoverColorB;
    });

    // Grab chart element by id
    var chartElement = document.getElementById(chart_name);
    var chart = new Chart(chartElement, {
      type: "bar",
      data: {
        labels: xData,
        datasets: [
          {
            type: "line",
            data: curveValue,
            label: "Moving Average",
            backgroundColor: curveColor,
            borderColor: curveColor,
            hoverBackgroundColor: curveColor,
            hoverBorderColor: curveColor,
            borderWidth: curveStrokeSize,
            pointRadius: 0,
            pointHoverRadius: curvePointSize,
            fill: false
          },
          {
            type: "bar",
            data: yData,
            label: "Data Value", // Cases
            backgroundColor: barColors,
            hoverBackgroundColor: barHoverColors
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
                padding: axisFontSize
              },
              scaleLabel: {
                display: true,
                labelString: "Week / Date",
                fontSize: axisFontSize
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
                padding: axisFontSize / 3
              },
              scaleLabel: {
                display: true,
                labelString: "Data Totals",
                fontSize: axisFontSize
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
    return chart;
  }
}

// Create Chart
comboChart("combo_chart", "Date", "Cases", "CurveValue");
