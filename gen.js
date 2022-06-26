const ACCESS_TOKEN = 'pk.eyJ1IjoiZGVydGllciIsImEiOiJja3kxcG00ZXEwOHgxMm9ueTR1emRiZjNtIn0.kPUIiRVbZUg43ivsy8GfHg';

const request = require('request');
  
async function save(res,i) {
    ugbuildings[i].coords = res.coords
    ugbuildings[i].address = res.address
    console.log(ugbuildings[i],",")
}

const forwardGeocoding = function (address,save,i) {
  
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
            + encodeURIComponent(address) + '.json?access_token='
            + ACCESS_TOKEN + '&limit=1';
  
    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback('Unable to connect to Geocode API', undefined);
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try to '
                     + 'search another location.');
        } else {
  
            var longitude = response.body.features[0].center[0];
            var latitude = response.body.features[0].center[1];
            var location = response.body.features[0].place_name;
            //console.log(response.body.features[0].text)
            save({
                "coords":[latitude, longitude],
                "address": location
            },i);
        }
    })
}

async function fill() {
    for (i=0; i<ugbuildings.length; i+=1) {
        await forwardGeocoding(ugbuildings[i].address,save,i);
    }
}

fill()