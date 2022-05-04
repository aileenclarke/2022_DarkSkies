//insert code here!

// locator map
var locationMap;

// leaflet side-by-side
var sliderMap;

//Explorable Leaflet map at the end.
var finalMap;

//IDA points layer
var IDApoints;

// location data for locator map
var locations;

//LOCATION MAP

// create location map
function createLocationMap(){
    locationMap = L.map('locationMap',{
        center: [39,-96],
        zoom: 5,
        maxZoom: 12,
        minZoom: 4,
        scrollWheelZoom: false,
        zoomControl: false});

    //add the basemap.
    L.tileLayer('https://api.mapbox.com/styles/v1/ajnovak/cl2grbrgj003o14mot9tnmwh1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWpub3ZhayIsImEiOiJja2dnMWJoYXkwd3hlMnlsN241MHU3aTdyIn0.YlwTqHjnT8sUrhr8vtkWjg', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
    }).addTo(locationMap);   
    
    var zoomHome = L.Control.zoomHome({position:'bottomright'});
    zoomHome.addTo(locationMap);
};

// get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
    };
};

// set lat long if user denies location access
function noLocation() { 
    var lat = 39.71;
    var long = -105.06;
    locations = createArray(lat, long);
    //scrollLocation(null, locations);
};

// set lat long if user allows location access
function saveLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    locations = createArray(lat, long);
    scrollLocation(null, locations);
}

// array containing locations
function createArray(lat,long){
    var temp = [
        {
            id: "userLoc",
            location:[lat, long],
            zoom: 13
        },
        {
            id: "userCity",
            location:[lat, long],
            zoom: 9
        },
        {
            id: "US",
            location:[39,-96],
            zoom: 5,
        }
    ];
    return temp;
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
        center: [39,-96],
        zoom: 5,
        maxZoom: 12,
        minZoom: 4,
        scrollWheelZoom: false,
        zoomControl: false});

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
    
    var zoomHome = L.Control.zoomHome({position:'bottomright'});
    zoomHome.addTo(sliderMap);

    var sliderLegend = L.Control.extend({
        options: {
            position: "bottomleft"
        },
        onAdd:function(){
            var sliderContainer = L.DomUtil.create('div','legend-control-container');
            sliderContainer.innerHTML = '<p class="slideLegend">More Stars</p>';
            var svg = '<svg id="attribute-legend" width="250" height="25"><style>.c{fill:url(#b);}</style><linearGradient id="b" x1="0" y1="9.38215" x2="187.18535" y2="9.38215" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0c1c2c"/><stop offset="1" stop-color="#f7f8e8"/></linearGradient></defs><rect class="c" width="187.18535" height="18.7643"/>';
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
        location:[39,-96],
        zoom: 5
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
    var topMargin = window.innerHeight;
     // call setStyle when top of element is halfway up innerHeight
     if ((y-topMargin) < 0 && y > 0){
        IDApoints.setStyle(function(feature){
            return style(feature, parseFloat(div.id))
        });
        document.querySelector('.yearLegend').innerHTML = div.id;
    }
    })
}
// CONSTELLATION IMAGE FADE
<<<<<<< Updated upstream
function constScroll(){
    //code for first imamge
        document.querySelectorAll('#constfade1').forEach(function(div){
        // get element and element's property 'top'
        var rect = div.getBoundingClientRect();
        y = rect.top;
=======

function scrollConst(){
    // get element and element's property 'top'
    var textRise = document.getElementById('fade1');
    var imageFade = document.getElementById('constfade1');
    var rect = textRise.getBoundingClientRect();
    y = rect.top;
>>>>>>> Stashed changes
    
    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight;

    // element height
    var elementHeight = textRise.offsetHeight;

    // number of px the element is scrolled vertically
    var scrollTop = document.documentElement.scrollTop;
    
    //initialize opacity
    var opacity = 0;
    
    // if scrollTop > topMargin, start fading out
    if ((y-topMargin) < 0 && y > 0){
          opacity = 0 + (scrollTop + topMargin) / elementHeight;
      }
    if (opacity <= 1) {
        imageFade.style.opacity = opacity;
      }
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
        center: [39,-96],
        zoom: 5,
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
    //L.control.zoom({position:'topleft'}).addTo(finalMap);
    
    // add zoom with home button
    var zoomHome = L.Control.zoomHome({position:'bottomright'});
    zoomHome.addTo(finalMap);

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
                //creates IDA pop ups
                onEachFeature:function(feature, layer){
                    var popupContent = createPopupContent(feature);
                    layer.bindPopup(popupContent)
                },
                //convert the IDA data from points to layers to give us more symbology control
                pointToLayer: pointToLayer
            }).addTo(finalMap);
            //call the style function within the Leaflet setStyle funciton, dynamically changing the IDA point style based on where the user is in the page
            IDApoints.setStyle(style);
            //create a year legend
            createYearLegend();
        });
};

//create IDApoint pop up
function createPopupContent(feature){
    var popupContent = "<p><b>Name:</b> " + feature.properties.Name + 
        "</p><p><b>Year designated:</b> " + feature.properties.Year + 
        "</p><p><b>Type:</b> " + feature.properties.Type;
    return popupContent
};

//create final map legend
function createYearLegend(){
    var LegendControl = L.Control.extend({
        options: {
            position: 'topleft'
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

//dynamically change IDA point style
function style(feature, divID){
    return {
        //having issues with interactive option atm
        interactive: true,
        //interactive: interactiveFilter(feature.properties, divID),
        fillOpacity: opacityFilter(feature.properties, divID),
        fillColor: colorFilter(feature.properties, divID)
    }
}

//change IDA point opacity based on year
function opacityFilter(props, divID){
    if (parseFloat(props.Year) <= divID){
        return 1
    } else {
        return 0
    };
};

function interactiveFilter(props, divID){
    return true
    
    /*if (parseFloat(props.Year) <= divID){
        return true
    } else {
        return false
    };*/
};


//change IDApoint color based on type of IDA place
function colorFilter(props, divID){
    if (props.Type === "Park" || props.Type === "Sanctuary" || props.Type === "Reserve") {
        return "#FAE450"
    } else if (props.Type === "Community") {
        return "#f8961e"
    } else {
        return "#f94144"
    };
};


//function to convert markers to circle markers
function pointToLayer(feature, latlng){
   //create marker options
   //sort data into two colors based on status
       var options = {
           fillColor: "#FF544B",
           color: "#000",
           weight: 0,
           opacity: 1,
           fillOpacity: 0.7,
           radius: 5,
           interactive: false
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