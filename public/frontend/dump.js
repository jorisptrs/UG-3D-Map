
const paint2 = {
   "fill-extrusion-color": ["case",
      ["<", ["get", "bouwjaar"], 1001], "black",
      ["<", ["get", "bouwjaar"], 1700], "#7f0000",
      ["<", ["get", "bouwjaar"], 1800], "#b30000",
      ["<", ["get", "bouwjaar"], 1900], "#d7301f",
      ["<", ["get", "bouwjaar"], 1930], "#ef6548",
      ["<", ["get", "bouwjaar"], 1960], "#fc8d59",
      ["<", ["get", "bouwjaar"], 1975], "#fdbb84",
      ["<", ["get", "bouwjaar"], 1990], "#fdd49e",
      ["<", ["get", "bouwjaar"], 2000], "#fee8c8",
      ["<=", ["get", "bouwjaar"], 2025], "#fff7ec",
      "#fff7ec"],
   "fill-extrusion-height": ["-", ["get", "dd_h_dak_max"], ["get", "h_maaiveld"]],
   "fill-extrusion-base": 0,
   "fill-extrusion-opacity": 0.95
}

// The 'building' layer in the Mapbox Streets
// vector tileset contains building height data
// from OpenStreetMap.

const paint1 = {
   'fill-extrusion-color': ' #e8daef',

   // Use an 'interpolate' expression to
   // add a smooth transition effect to
   // the buildings as the user zooms in.
   'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'dd_h_dak_max']
   ],
   'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', '0']
   ],
   'fill-extrusion-opacity': 0.7
}