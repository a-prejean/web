Chart.defaults.global.defaultFontFamily = "Segoe UI"; // Main font used for chart
Chart.defaults.global.defaultFontSize = 10; // Font size of X and Y axis labels
Chart.defaults.global.defaultFontColor = "#fff"; // Font Color

var chart_aspect_ratio = 1.25;

// Colors
// Combo Bar Chart Colors
var barColorA = "#a52941"; // 378a65, df644c, f4974f
var barHoverColorA = "#931e37"; // 2b7a51, df644c
var curveColor = "#fff388"; // ffffd9, ffffcc
var barColorB = "#e38c4e"; // 96c078, c64f39
var barHoverColorB = "#c36a2f"; // 70a461, bf3250

// var curve_color = ["#ffffd9"]; // Single color
var curve_color = ["#7C4DFF", "#448AFF", "#00BCD4", "#1DE9B6"]; // Gradient

// Pie Chart Colors
var chart_colors = ["#c85b45", "#e38c4e"];

// Bar Chart Color Functions
// Colors
var colorScale = d3.interpolateCool; // Pick color scale
// Tweak colors
var colorRangeInfo = {
  colorStart: 0.5,
  colorEnd: 0.1,
  useEndAsStart: false // Reverses gradient
};

// Color Functions
function calculatePoint(i, intervalSize, colorRangeInfo) {
  var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return useEndAsStart
    ? colorEnd - i * intervalSize
    : colorStart + i * intervalSize;
}
/* Must use an interpolated color scale, which has a range of [0, 1] */
function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  var { colorStart, colorEnd } = colorRangeInfo;
  var colorRange = colorEnd - colorStart;
  var intervalSize = colorRange / dataLength;
  var i, colorPoint;
  var colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}


