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
    var layer1 = L.tileLayer('https://api.mapbox.com/styles/v1/ajnovak/cl2mu2v9u004615mz0p7u40yu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWpub3ZhayIsImEiOiJja2dnMWJoYXkwd3hlMnlsN241MHU3aTdyIn0.YlwTqHjnT8sUrhr8vtkWjg', { 
        attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(sliderMap);

    // mapbox layer 2
    var layer2 = L.tileLayer('https://api.mapbox.com/styles/v1/ajnovak/cl2grbrgj003o14mot9tnmwh1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWpub3ZhayIsImEiOiJja2dnMWJoYXkwd3hlMnlsN241MHU3aTdyIn0.YlwTqHjnT8sUrhr8vtkWjg', { 
        attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(sliderMap);

    // compare two layers on map
    L.control.sideBySide(layer1, layer2).addTo(sliderMap);
};

// create array containing flyTo locations
var fly= [
    {
        id:"start",
        location:[39,-98],
        zoom: 4
    },
    {
        id:"block1",
        location:[48.15, -103.62],
        zoom: 8
    },
    {
        id:"block2",
        location:[30.27, -97.74],
        zoom: 8
    }
]

// function to trigger flyTo on scroll
function scroll(){
    fly.forEach(function(item){
        isInPosition(item.id, item.location, item.zoom)
    })
}

function isInPosition(id, location, zoom){
    
    // get element and element's property 'top'
    var block1 = document.getElementById(id);
    var rect = block1.getBoundingClientRect();
    y = rect.top;

    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight / 2;

    // call flyTo when top of element is halfway up innerHeight
    if ((y-topMargin) < 0 && y > 0){
        sliderMap.flyTo(location, zoom, {
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
    L.tileLayer('https://api.mapbox.com/styles/v1/ajnovak/cl2grbrgj003o14mot9tnmwh1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWpub3ZhayIsImEiOiJja2dnMWJoYXkwd3hlMnlsN241MHU3aTdyIn0.YlwTqHjnT8sUrhr8vtkWjg', {
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
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json,{
                onEachFeature:function(feature, layer){
                    var popupContent = createPopupContent(feature);
                    layer.bindPopup(popupContent)
                }
            }).addTo(finalMap);
            createYearLegend();
            //sequencePoints(json);
        });
};

function createPopupContent(feature){
    var popupContent = "<p><b>Name:</b> " + feature.properties.Name + 
        "</p><p><b>Year designated:</b> " + feature.properties.Year + 
        "</p><p><b>Type:</b> " + feature.properties.Type;
    return popupContent
};

function createYearLegend(){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        onAdd: function () {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-year');
            
            //legend title
            container.innerHTML = '<p class="yearLegend">2007</span></p>';

            return container;
        }
    });
    finalMap.addControl(new LegendControl());
};

/*
function sequencePoints(data){
    finalMap.eachLayer(function(layer){
        layer.filter(function(){
            if (data.properties.Year == 2001){
                return true;
            }
        })
    });
};
*/

document.addEventListener('DOMContentLoaded', createSliderMap)
document.addEventListener('DOMContentLoaded', createFinalMap)
document.addEventListener('scroll', scroll)
document.addEventListener('scroll', scrollFade)