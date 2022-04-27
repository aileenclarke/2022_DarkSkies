//insert code here!

// leaflet side-by-side
var map;

function createMap(){
    /*
    map = L.map('map', {
        center:[39.83,-98.58],
        zoom: 4
    });
    */
    map = L.map('map',{
        scrollWheelZoom: false})
        .setView([39,-98],4);

    // mapbox layer 1
    var layer1 = L.tileLayer('https://api.mapbox.com/styles/v1/amclarke2/cl0g3m8oh000h14n0ok1oan43/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1jbGFya2UyIiwiYSI6ImNrczZtNjkwdjAwZngycW56YW56cHUxaGsifQ._Cc2V5nKC5p2zfrYqw7Aww', { 
        attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // mapbox layer 2
    var layer2 = L.tileLayer('https:///api.mapbox.com/styles/v1/amclarke2/cl2dhi5fc003q14o3jz96d8dp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1jbGFya2UyIiwiYSI6ImNrczZtNjkwdjAwZngycW56YW56cHUxaGsifQ._Cc2V5nKC5p2zfrYqw7Aww', { 
        attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // compare two layers on map
    L.control.sideBySide(layer1, layer2).addTo(map);
};


document.getElementById("buttonND").addEventListener("click", function () {
    map.flyTo([48.15, -103.62], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

document.getElementById("buttonTX").addEventListener("click", function () {
    map.flyTo([30.27, -97.74], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

function scroll(){
    console.log("hello")
}


document.addEventListener('DOMContentLoaded',createMap)
document.addEventListener('scroll',scroll)