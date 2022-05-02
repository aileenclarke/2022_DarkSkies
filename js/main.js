//insert code here!

// locator map
var locationMap;

// leaflet side-by-side
var sliderMap;

//Explorable Leaflet map at the end.
var finalMap;

//IDA points layer
var IDApoints;

//LOCATION MAP

// create location map
function createLocationMap(){
    locationMap = L.map('locationMap',{
        scrollWheelZoom: false})
        .setView([39,-98],4); 

    //adds zoom buttons to top left
    //L.control.zoom({position:'topleft'}).addTo(locationMap);

    //add the basemap.
    L.tileLayer('https://api.mapbox.com/styles/v1/ajnovak/cl2grbrgj003o14mot9tnmwh1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWpub3ZhayIsImEiOiJja2dnMWJoYXkwd3hlMnlsN241MHU3aTdyIn0.YlwTqHjnT8sUrhr8vtkWjg', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
    }).addTo(locationMap);    
};

// get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
    };
};

function noLocation() { 
    var lat = 39;
    var long = 105;
    console.log(lat, long)
    createArray(lat,long);
    scrollLocation();
};

function saveLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat, long)
    createArray();
    scrollLocation();
}

// array containing locations
function createArray(){
    var locations = [
        {
            id: userLoc,
            location:[lat, long],
            zoom: 14
        },
        {
            id: userCity,
            location:[lat, long],
            zoom: 8
        },
        {
            id: US,
            location:[39,-98],
            zoom: 4,
        }
    ];
    return locations;
};

// function to trigger location prompt
function scrollLocation(){
    locations.forEach(function(item){
        locatorIsInPosition(item.id, item.location, item.zoom)
    })
}

function locatorIsInPosition(id, location, zoom){
    
    // get element and element's property 'top'
    var locText = document.getElementById(id);
    var rect = locText.getBoundingClientRect();
    y = rect.top;

    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight / 2;

    // call flyTo when top of element is halfway up innerHeight
    if ((y-topMargin) < 0 && y > 0){
        locationMap.flyTo(location, zoom, {
            animate: true,
            duration: 2 // in seconds
        });
    }
}

// SLIDER MAP

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

    var sliderLegend = L.Control.extend({
        options: {
            position: "bottomright"
        },
        onAdd:function(){
            var sliderContainer = L.DomUtil.create('div','legend-control-container');
            sliderContainer.innerHTML = '<p class="slideLegend">Legend</p>';
            var svg = '<svg id="attribute-legend" width="190px" height="25px"><style>.c{fill:url(#b);}</style><linearGradient id="b" x1="0" y1="9.38215" x2="187.18535" y2="9.38215" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0c1c2c"/><stop offset="1" stop-color="#f7f8e8"/></linearGradient></defs><rect class="c" width="187.18535" height="18.7643"/>';
            
            sliderContainer.insertAdjacentHTML('beforeend',svg)
            return sliderContainer;
        }
    });
    sliderMap.addControl(new sliderLegend());  
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

function IDAscroll(){
//code for IDA points
    document.querySelectorAll('.IDA-points').forEach(function(div){
    // get element and element's property 'top'
    var rect = div.getBoundingClientRect();
    y = rect.top;

    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight / 2;
     // call setStyle when top of element is halfway up innerHeight
     if ((y-topMargin) < 0 && y > 0){
        IDApoints.setStyle(function(feature){
            return style(feature, parseFloat(div.id))
        });
        document.querySelector('.yearLegend').innerHTML = div.id;
    }
    })

}

// IMAGE FADE

// function to trigger fade on scroll
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
        scrollWheelZoom: false,
        //needed to get rid zoom in order to move it 
        zoomControl:false,
        //constrain pan to data
        maxBounds: [
            [60, -155],
            [15, -45]
            ]
    });
    //adds zoom buttons back to top left
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
            IDApoints = L.geoJson(json,{
                onEachFeature:function(feature, layer){
                    var popupContent = createPopupContent(feature);
                    layer.bindPopup(popupContent)
                },
                pointToLayer: pointToLayer
                //first 'style' is property, second 'style' calls style function.
            }).addTo(finalMap);
            IDApoints.setStyle(style);
            createYearLegend();
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


function style(feature, divID){
    return {
        fillOpacity: opacityFilter(feature.properties, divID),
        //interactiveFilter(feature.properties)
    }
}

function opacityFilter(props, divID){
    if (parseFloat(props.Year) <= divID){
        return 1
    } else {
        return 0
    };
};

/*
function interactiveFilter(props){
    if (parseFloat(props.Year) > 2001){
        return false
    } else {
        return true
    };
};
*/
//function to convert markers to circle markers
function pointToLayer(feature, latlng){
   //create marker options
   //sort data into two colors based on status
       var options = {
           fillColor: "red",
           color: "#000",
           weight: 0,
           opacity: 1,
           fillOpacity: 0.7,
           radius: 5
       };

       //create circle marker layer   
       var layer = L.circleMarker(latlng, options);

       //return the circle marker to the L.geoJson pointToLayer option
       return layer;
   };

document.addEventListener('DOMContentLoaded', createLocationMap)
document.addEventListener('DOMContentLoaded', createSliderMap)
document.addEventListener('DOMContentLoaded', createFinalMap)
document.addEventListener('scroll', scroll)
//document.addEventListener('scroll', scrollFade)
document.addEventListener('scroll', IDAscroll)
//document.addEventListener('scroll', scrollLocation)