import fs from 'fs';
import fetch from 'node-fetch';

fetch('https://saturnus.geodan.nl/mapbox-viewer/styles/freetilehosting/positron.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    fs.writeFile('./test.json', JSON.stringify(json), (err) => {
      if (err) {
        throw new Error('Something went wrong.')
      }
      console.log('JSON written to file. Contents:');
      console.log(fs.readFileSync('test.json', 'utf-8'))
    })
  })