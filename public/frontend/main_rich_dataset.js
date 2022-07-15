async function fetchData() {
   try {
      const response = await fetch("./data/places/places.geojson");
      const coords = await response.json();
      return coords;
   } catch (error) {
      console.error(error);
   }
}

const myjson = await fetchData();

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVydGllciIsImEiOiJja3kxcG00ZXEwOHgxMm9ueTR1emRiZjNtIn0.kPUIiRVbZUg43ivsy8GfHg';

const groningen = [6.56667, 53.21917]

const map = new mapboxgl.Map({
   style: 'mapbox://styles/mapbox/streets-v11',
   center: groningen,
   zoom: 15.5,
   pitch: 45,
   bearing: -17.6,
   container: 'map',
   antialias: true
});

map.on('load', () => {
   // Insert the layer beneath any symbol layer.
   const layers = map.getStyle().layers;
   const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
   ).id;
   //map.addSource('places', myjson);
   // The 'building' layer in the Mapbox Streets
   // vector tileset contains building height data
   // from OpenStreetMap.
   map.addLayer(
      {
         'id': 'add-3d-buildings',
         'source': 'composite',
         'source-layer': 'building',
         'filter': ['==', 'extrude', 'true'],
         'type': 'fill-extrusion',
         'minzoom': 10,
         'paint': {
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
               ['get', 'height']
            ],
            'fill-extrusion-base': [
               'interpolate',
               ['linear'],
               ['zoom'],
               15,
               0,
               15.05,
               ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.7
         }
      },
      labelLayerId
   );

   map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
         // set up the sky layer to use a color gradient
         'sky-type': 'gradient',
         // the sky will be lightest in the center and get darker moving radially outward
         // this simulates the look of the sun just below the horizon
         'sky-gradient': [
            'interpolate',
            ['linear'],
            ['sky-radial-progress'],
            0.8,
            'rgba(70, 170, 235, 1.0)',
            1,
            'rgba(0,0,0,0.1)'
         ],
         'sky-gradient-center': [0, 0],
         'sky-gradient-radius': 90,
         'sky-opacity': [
            'interpolate',
            ['exponential', 0.2],
            ['zoom'],
            5,
            0,
            22,
            1
         ]
      }
   });
});

function registerControlPosition(map, positionName) {
   if (map._controlPositions[positionName]) {
      return;
   }
   var positionContainer = document.createElement('div');
   positionContainer.className = `mapboxgl-ctrl-${positionName}`;
   map._controlContainer.appendChild(positionContainer);
   map._controlPositions[positionName] = positionContainer;
}
registerControlPosition(map, "center");

var geocoder = new MapboxGeocoder({
   accessToken: mapboxgl.accessToken,
   mapboxgl: mapboxgl
})
window.mobileCheck = function () {
   let check = false;
   (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
   return check;
};
if (window.mobileCheck()) {
   map.addControl(geocoder, 'bottom-left');
} else {
   map.addControl(geocoder, 'center');
}

const nameInfo = document.getElementById('name');
const nbInfo = document.getElementById('nb');
const facultyInfo = document.getElementById('faculty');
const addressInfo = document.getElementById('address');


const legend = document.getElementsByClassName('mapboxgl-ctrl-logo');
legend[0].remove();

async function show() {
   var ugbuildings = myjson.data.features;
   for (let i = 0; i < ugbuildings.length; i += 1) {
      const el = document.createElement('div');
      el.id = 'marker';
      el.style.backgroundImage = `url('/data/pics/${ugbuildings[i].properties.pic}.jpg')`;
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div id="popup" class="popup" style="z-index: 10;">
                <img src="/data/pics/${ugbuildings[i].properties.pic}.jpg">
                </div>`
      );
      const marker = new mapboxgl.Marker(el)
         .setLngLat(ugbuildings[i].geometry.coordinates)
         .setPopup(popup) // sets a popup on this marker
         .addTo(map);

      marker.getElement().addEventListener('click', () => {
         nameInfo.innerHTML = ugbuildings[i].properties.name;
         nbInfo.innerHTML = ugbuildings[i].properties.nb;
         facultyInfo.innerHTML = ugbuildings[i].properties.faculty;
         addressInfo.innerHTML = ugbuildings[i].properties.address;
      });
   }
}

show();


/*
async function fetchCoords(query) {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`,{
            method: 'GET'
        });
        const coords = await response.json();
        return coords;
    } catch (error) {
        console.error(error);
    }
}

async function fill() {
    for (i=0; i<ugbuildings.length; i+=1) {
        let res = await fetchCoords(ugbuildings[i].address);
        ugbuildings[i].coords = res.features[0].center;
    }
} */