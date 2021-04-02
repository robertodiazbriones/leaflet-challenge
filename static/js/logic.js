var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  // Adding tile layer
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap);

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
  }).addTo(myMap);
  
  // Link to GeoJSON
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    //var earthquake_loc = [];

    for (var i = 0; i < data.features.length; i++) {
        var location=data.features[i].geometry.coordinates;
        var magnitud=data.features[i].properties.mag;
        var place=data.features[i].properties.place;

        if (location) {
            var earthquake_loc= [location[1], location[0]];
        }

        console.log(earthquake_loc);
        console.log(place);
        console.log(magnitud);

        L.circle(earthquake_loc, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "green",
            // Adjust radius
            radius: magnitud * 30000
            }).bindPopup("<h1>" + place + "</h1> <hr> <h3>Points: " + magnitud + "</h3>").addTo(myMap);
    }
  });
  
