//insert code here!

// leaflet side-by-side
var sliderMap;

//Explorable Leaflet map at the end.
var finalMap;

function createSliderMap(){
    /*
    map = L.map('map', {
        center:[39.83,-98.58],
        zoom: 4
    });
    */
    sliderMap = L.map('sliderMap',{
        scrollWheelZoom: false})
        .setView([39,-98],4);

    // mapbox layer 1
    var layer1 = L.tileLayer('https://api.mapbox.com/styles/v1/amclarke2/cl0g3m8oh000h14n0ok1oan43/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1jbGFya2UyIiwiYSI6ImNrczZtNjkwdjAwZngycW56YW56cHUxaGsifQ._Cc2V5nKC5p2zfrYqw7Aww', { 
        attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(sliderMap);

    // mapbox layer 2
    var layer2 = L.tileLayer('https:///api.mapbox.com/styles/v1/amclarke2/cl2dhi5fc003q14o3jz96d8dp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1jbGFya2UyIiwiYSI6ImNrczZtNjkwdjAwZngycW56YW56cHUxaGsifQ._Cc2V5nKC5p2zfrYqw7Aww', { 
        attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(sliderMap);

    // compare two layers on map
    L.control.sideBySide(layer1, layer2).addTo(sliderMap);
};


document.getElementById("buttonND").addEventListener("click", function () {
    sliderMap.flyTo([48.15, -103.62], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

document.getElementById("buttonTX").addEventListener("click", function () {
    sliderMap.flyTo([30.27, -97.74], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

//var pos = document.querySelector("#block1").getBoundingClientRect()

//console.log(pos)
var fly= [
    {
        id:"block1",
        location:[48.15, -103.62]
    },
    {
        id:"block2",
        location:[30.27, -97.74]
    }
]

function scroll(){
    fly.forEach(function(item){
        isInPosition(item.id, item.location)
    })
}

function isInPosition(id, location){
    
    var block1 = document.getElementById(id);
    var rect = block1.getBoundingClientRect();
    //var innerHeight = window.innerHeight;
    x = rect.left;
    y = rect.top;
    w = rect.width;
    h = rect.height;
    //console.log(y)
    //console.log(innerHeight)
    var position1 = y
    //console.log(position1)
    var scrollPos = document.querySelector("html").scrollTop,
        topMargin = window.innerHeight / 2;

    if ((y-topMargin) < 0 && y >0){
        sliderMap.flyTo(location, 10, {
            animate: true,
            duration: 2 // in seconds
        });
    }
}


/*
function scroll(){
    var pos = document.querySelector("#block1").getBoundingClientRect()
    console.log(pos)
    if (pos > 298){
        map.flyTo([48.15, -103.62], 10, {
            animate: true,
            duration: 2 // in seconds
        });
    }
}
*/

//Explorable Leaflet map

function createFinalMap(){
    //create the map
    finalMap = L.map('finalMap', {
        //map parameters
        center: [20, 40],
        zoom: 4,
        maxZoom: 7,
        minZoom: 4,
        //needed to get rid zoom in order to move it 
        zoomControl:false,
        //constrain pan to data
        maxBounds: [
            [65, -40],
            [-50, 120]
            ]
    });
    //adds zoom buttons back to top right
    L.control.zoom({position:'topright'}).addTo(map);

    //add the basemap.
    var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
    }).addTo(map);
};


document.addEventListener('DOMContentLoaded', createSliderMap, createFinalMap)
document.addEventListener('scroll', scroll)