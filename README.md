# An interactive 3D map of the University of Groningen Buildings

A 3D rendering of Groningen, where people can acquire information about the UG in context of the city. The map will include geospatial data, additional information, and links to relevant pages.

The motivation is to make our local surroundings more accessible and perhaps give prospective students an impression of the UG and Groningen.

## Technology Stack and Data Sources
- Mapbox (WebGL)
- Nodejs
- OpenStreetMaps

## Run
Run from root:

> npm install

> nodemon

Access via:

> localhost:8080

## DB data
Downlaoded from [3dbag](https://3dbag.nl/en/download):
> pg_restore --no-owner --no-privileges --format=directory --jobs=2 --port=5432 --username=postgres -d netherlands ./data