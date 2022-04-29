//insert code here!

// leaflet side-by-side
var sliderMap;

//Explorable Leaflet map at the end.
var finalMap;

// function to create Slider map
function createSliderMap(){

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

// create array containing flyTo locations
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

// function to trigger flyTo on scroll
function scroll(){
    fly.forEach(function(item){
        isInPosition(item.id, item.location)
    })
}

function isInPosition(id, location){
    
    // get element and element's property 'top'
    var block1 = document.getElementById(id);
    var rect = block1.getBoundingClientRect();
    y = rect.top;

    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight / 2;

    // call flyTo when top of element is halfway up innerHeight
    if ((y-topMargin) < 0 && y > 0){
        sliderMap.flyTo(location, 10, {
            animate: true,
            duration: 2 // in seconds
        });
    }
}

// first attempt at function to trigger fade on scroll
function scrollFade(){
    
    // get element and element's property 'top'
    var imageFade = document.getElementById("imageFade");
    var rect = imageFade.getBoundingClientRect();
    y = rect.top;
    
    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight / 4;

    // element height
    var elementHeight = imageFade.offsetHeight;

    // number of px the element is scrolled vertically
    var scrollTop = document.documentElement.scrollTop;
    
    //initialize opacity
    var opacity = 1;
    
    // if scrollTop > topMargin, start fading out
    if (scrollTop > topMargin) {
          opacity = 1 - (scrollTop - topMargin) / elementHeight;
      }
    if (opacity >= 0) {
        imageFade.style.opacity = opacity;
      }
}


//Explorable Leaflet map

function createFinalMap(){
    //create the map
    finalMap = L.map('finalMap', {
        //map parameters
        center: [39,-98],
        zoom: 4,
        maxZoom: 12,
        minZoom: 4,
        //needed to get rid zoom in order to move it 
        zoomControl:false,
        //constrain pan to data
        maxBounds: [
            [60, -155],
            [15, -45]
            ]
    });
    //adds zoom buttons back to top right
    L.control.zoom({position:'topleft'}).addTo(finalMap);

    //add the basemap.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
    }).addTo(finalMap);

    //call getData function
    getData();
};

//function to retrieve the data
function getData(){
    //adds the IDA points layer
    fetch("data/IDApointsNA.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            loadRange(json)
    });
};

//add the data to the map
function loadRange(data){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
       color: "#000",
       weight: 0,
       opacity: 1,
    }).addTo(finalMap);
};



document.addEventListener('DOMContentLoaded', createSliderMap)
document.addEventListener('DOMContentLoaded', createFinalMap)
document.addEventListener('scroll', scroll)
document.addEventListener('scroll', scrollFade)