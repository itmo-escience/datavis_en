# PRACTICE 4

## Maps

There are two types of maps on which we can visualise a data. A choose of map type depends on what level of detail you need to display 
geo-position of an object:

- Data Map. A high abstract map which is usually includes only shapes of geo-areas(e.g. countries, states). 

- Street Map with data. A maps that supports multiple levels of details from world to roads & buildings.

### GeoJSON

The most of the JavaScript geo libraries(including `D3`) are designed to work with geospatial data in GeoJSON format. 
GeoJSON is based on JavaScript Object Notation (JSON). It defines several types of JSON objects 
and the manner in which they are combined to represent data about geographic features. The geometry intself represented in GeoJSON
as point or a set of points. 
Here are an example of GeoJSON object:

```JavaScript
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.87088507656375,
          35.21515162500578
        ]
      },
      "properties": {
        "name": "ABBOTT NEIGHBORHOOD PARK",
        "address": "1300  SPRUCE ST"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -80.72487831115721,
              35.26545403190955
            ],
            [
              -80.72135925292969,
              35.26727607954368
            ]
          ]
        ]
      },
      "properties": {
        "name": "Plaza Road Park"
      }
    }
  ]
}
```
And [here](https://codepen.io/anon/pen/boKBXB?editors=0010) are an examples of all types of objects in GeoJSON.

### Projections

The coordinates in GeoJSON are `[latitude, longitude]` which are spherical coordinates, so the first thing we'll need is to project it
to the shape we need.

`D3` includes a set of most common projection functions. All of them are presented [here](https://github.com/d3/d3-geo-projection#projections).

Here are the script to draw a projected geometry in svg:
```JavaScript
const width = 800;
const height = 600;

const svg = d3.select("svg").attr('width', width).attr('height', height);

        const projection = d3.geoAlbersUsa()  // a USA-specific projection (that deals with Hawaii / Alaska)
            .translate([width / 2, height / 2]) // this centers the map in center of SVG element
            .scale([700]);  // this specifies how much to zoom

        // Create a geoPath generator with a projection
        const path = d3.geoPath()
            .projection(projection);

        d3.json("https://raw.githubusercontent.com/avt00/dvcourse/master/us-states.json").then(function (json) {
            
            svg.append('g').selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path); // put each feature in geoPath generator
            
            // You can also add geoGraticule feature included in d3
            // let graticule = d3.geoGraticule();
            //d3.select("#mapLayer").append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');
        });
```
And [here](https://codepen.io/anon/pen/MEXJQP?editors=1000) you can see the result.

To draw other svg shapes on top of the base map you can use already learned techniques, but don't forget to apply `projection` transformation:
```JavaScript
d3.csv("https://raw.githubusercontent.com/avt00/dvcourse/master/us-cities.csv", function (data) {
      svg.append('g').selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", d =>  projection([d.lon, d.lat])[0] )
          .attr("cy", d => projection([d.lon, d.lat])[1] )
          .attr("r", d =>  Math.sqrt(parseInt(d.population) * 0.00004) )
          .style("fill", "steelblue")
          .style("opacity", 0.8);
});
```

### Street Maps

When it comes to using Street Maps `d3` is not really a go to. There are multiple APIs that provides a full functionality for
working with street maps including adding a layers of data. The most popular are [Mapbox](https://www.mapbox.com/maps/) and
[leaflet](https://leafletjs.com/).

But there is a way to use costume svg layer on top of `leaflet` map. In this case we'll use `leaflet`'s projection to transform coordinates:
```JavaScript
// Create leaflet map object inside #map
var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));
    
// Add svg as overlay
const svg = d3.select(map.getPanes().overlayPane).append("svg")
const g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("us-states.json").then(collection) {

  // define leaflet projection function
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }
  
  // define a path generator
  const transform = d3.geoTransform({point: projectPoint}),
  const path = d3.geoPath().projection(transform);
  
  // draw path
  var feature = g.selectAll("path")
    .data(collection.features)
    .enter().append("path")
    .attr("d", path);
});
```



