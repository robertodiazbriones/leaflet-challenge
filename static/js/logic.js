var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
  });
  
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
d3.json(link, function(data){
  marker(data);
});

function marker(data) {

  

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "<hr><p>Magnitude: " + feature.properties.mag + "</p>");
}

  // Creating a GeoJSON layer with the data
  L.geoJson(data, {

    onEachFeature: onEachFeature,
    // Bubble size
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag * 5,
            fillColor: magcolor(feature.properties.mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    }
  }).addTo(myMap);
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];
    
    div.innerHTML += '<strong>Earthquake Mag</strong><br>';
    div.innerHTML +='<hr>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + magcolor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    
    return div;
};

legend.addTo(myMap);

function magcolor(mag) {

  return mag >= 5 ? '#f50a18' :
         mag >= 4 ? '#f5720a' :
         mag >= 3 ? '#f39c1d' :
         mag >= 2 ? '#f0cc3d' :
         mag >= 1 ? '#aadb12' :
         mag >= 0 ? '#8cb709' :
                  'white';
}






