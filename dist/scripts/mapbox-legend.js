mapboxgl.accessToken = "pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg"; // vis.gl token?
// "pk.eyJ1IjoiYXByZWplYW4iLCJhIjoiY2tkNXp3ZHo4MGdlZDMycGdjMHpidTduZCJ9.NUFlwrBU2cTE1NRZEyR2Wg";
  

// create base map
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/aprejean/ckd7s972901rs1inyi8ahzxu0",
  center: [-90.5, 30.75], // starting position
  zoom: 7.25, // starting zoom
  minZoom: 6
});

// disable map rotation using right click + drag
map.dragRotate.disable();
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

// define hover state
var hoveredStateId = null;

// Colors
var color_range = ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];
// var color_range = ["#fffd87", "#feca61", "#f4974f", "#df644c", "#bf3250"];

// control fill color with data
var fill_colors = [
  "interpolate",
  ["linear"],
  // ["exponential", 1],
  ["get", "Cases"], // data variable to look up
  0,
  color_range[0], // start value and color
  127*.25,
  color_range[1], // end value and color
  127*.5,
  color_range[2], // end value and color
  127*.75,
  color_range[3], // end value and color
  127,
  color_range[4] // end value and color
];


var color_range = ["#ffffff", "#0096bb"];
// control fill color with data
var recent_cases_fill_color = [
  "interpolate",
  ["linear"],
  // ["exponential", 5],
  ["get", "Cases"], // data variable to look up
  0,
  color_range[0], // start value and color
  127,
  color_range[1] // end value and color
];

// set to map style's land color
var border_color = "#1d262a"; // #3d484d, #1d262a, #627BC1

// load map and add layers
map.on("load", function () {
  // load geoJson
  map.addSource("recent_cases", {
    type: "geojson",
    data:
      "https://raw.githubusercontent.com/a-prejean/data-viz/master/CREST/recent_cases_la_ms.json"
  });
  
  // feature-state dependent fill-opacity expression will render the hover effect when a feature's hover state is set to true.
  // shape fill layer
  map.addLayer(
    {
      id: "recent_cases_fills",
      type: "fill",
      source: "recent_cases",
      paint: {
        "fill-color": fill_colors,
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.5,
          0.3
        ]
      }
    }
    // render zip code labels layer on top
    // "la-zip-codes-labels"
  );

  // shape borders layer
  map.addLayer({
    id: "recent_cases_borders",
    type: "line",
    source: "recent_cases",
    paint: {
      "line-color": border_color,
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2.5,
        1
      ],
      "line-opacity": 0.75
    }
  });

  // labels
  map.addLayer({
    id: "recent_cases_labels",
    type: "symbol",
    source: "recent_cases",
    layout: {
      "text-field": "{ParishName}",
      "text-font": [
        "Roboto Bold", //Light
        "DIN Offc Pro Medium",
        "Arial Unicode MS Bold"
      ],
      "text-size": 14
    },
    paint: {
      "text-color": "#93a9b4",
      "text-halo-color": "#151b1e",
      "text-halo-width": 1,
      "text-halo-blur": 0
    }
  });
 
  
  // create popup
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: "bottom-left",
    offset: [12, 0]
  });

  // when user moves mouse over fill layer, update feature-state for feature under mouse.
  map.on("mousemove", "recent_cases_fills", function (e) {
    // change feature style
    if (e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: "recent_cases", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].properties.FIPS;
      map.setFeatureState(
        { source: "recent_cases", id: hoveredStateId },
        { hover: true }
      );

      // change the cursor style to UI indicator
      map.getCanvas().style.cursor = "pointer";

      // var coordinates = e.features[0].geometry.coordinates.slice(); // for "point" not "fill"
      var coordinates = e.lngLat;
      // e.point is the x, y coordinates of the mousemove event relative to the top-left corner of the map
      // e.lngLat is the longitude, latitude geographical position of the event

      // popup info
      var popup_info_recent_cases =
        "<p style='color:black'>Parish / County :  <strong>" +
        e.features[0].properties.ParishName +
        "</strong></><br>Data Value :  <strong>" +
        e.features[0].properties.Cases +
        "</strong></p>";

      // Ensure that if map is zoomed out such that multiple copies of feature are visible, the popup appears over the copy being pointed to
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // populate the popup and set its coordinates based on the feature found.
      popup.setLngLat(coordinates).setHTML(popup_info_recent_cases).addTo(map);
    }
  });

  // when mouse leaves fill layer, update feature state of previously hovered feature
  map.on("mouseleave", "recent_cases_fills", function () {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: "recent_cases", id: hoveredStateId },
        { hover: false }
      );
      // change cursor back
      map.getCanvas().style.cursor = ""; // 'default'

      // remove Popup
      popup.remove();
    }
    hoveredStateId = null;
  });
  
});
