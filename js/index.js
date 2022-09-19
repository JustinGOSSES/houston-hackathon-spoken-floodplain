/////////////////////////////////


//// An initial position point for the map set as a global variable. 
//// It might be changed by other JavaScript.
var dataGlobal = [-95.498,29.7604]
var polygons = ""
var isLocationWithinOneFloodplainPolygon = false
var introductionSpeechSaid = false
var timeIntervalTriggered = false
var locationState = "noLocationKnownYet" //// outsideFloodplain, floodplain500yr, floodplain100yr, floodway
var interval = ""
var sayLocationInLatLong = false
var withinFloodplainSpeak = "none"
var notWithinFloodplainSpeak = "none"
var speechTool = window.speechSynthesis
var sayEveryMeasurement = true
var showPositionPoints = ""
var counter = 0;

// config map
let config = {
    minZoom: 2,
    maxZoom: 18,
  };
  // magnification with which the map will start
  const zoom = 10;
  // co-ordinates 29.7604, -95.498
  const lat = dataGlobal[1]
  const lng = dataGlobal[0] //-95.38;
  
  // calling map
  const map = L.map("map", config).setView([lat, lng], zoom);
  
  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  
  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.ZONE_SUBTY);
  }
  
  // adding geojson by fetch
  // of course you can use jquery, axios etc.
  //fetch("./data/created_data/FEMA_FIRM_FloodPolygons_forDisplay_fromNFHL_exported2022_09.geojson", {
  fetch("./data/FEMA_FIRM_FloodPolygons.json", {
    
    headers : { 
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json'
     }

  })
    .then(function (response) {
      console.log('response message:', response); 
      var data = response.json()
      //console.log('data early, json :', data);
      // await addFeatureToMap(data) 
      // setTimeout(function(data) {
      //   return addFeatureToMap(data) ;
      // }, 10000);
      return data;
    })
    .then(function (data) {
      // use geoJSON
      polygons = data
      console.log('data', data); 
      L.geoJSON(data, {
        onEachFeature: onEachFeature,
      }).addTo(map);
    });

function addFeatureToMap(data){
  console.log('data', data); 
      L.geoJSON(data, {
        onEachFeature: onEachFeature,
      }).addTo(map);
}


function getLocation() {
  if (navigator.geolocation) {
    // $('#trigger').trigger('click')
    //// This calls the function showPosition with an argument of the position of the device.
    //// We'll assume that the geojson polygons is already loaded.
    console.log("got into getLocation function before checking if introductionSpeechSaid == false")
    // withinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is within the floodplain."); 
    // notWithinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is outside the floodplain."); 
    while(introductionSpeechSaid == false){
      speechTool = window.speechSynthesis
      console.log("got into getLocation function and introductionSpeechSaid == false")     
      let introSpeak= new SpeechSynthesisUtterance("Location based services activated."); //If you do not want to be asked again, be sure to click the remember this decision checkmark. 
      
      //startCheckingLocationEveryInterval()
      console.log("startCheckingLocationEveryInterval() on line above")
      console.log("timeIntervalTriggered is set to:",timeIntervalTriggered)
      timeIntervalTriggered = true
      console.log("timeIntervalTriggered is set to:",timeIntervalTriggered)
      window.speechSynthesis.speak(introSpeak);
      insideLoopFunction()
      introductionSpeechSaid = true
    }
    // else{
      console.log("got into getLocation function and introductionSpeechSaid != false.")
      // if(timeIntervalTriggered != false){
        //navigator.geolocation.getCurrentPosition(showPosition);
        //console.log("IN FUNCTION getLocation, returnedResult",returnedResult)
        interval = setInterval(function() {
          insideLoopFunction();
        }, 10000)
      // }
      // else{
      //   console.log("got here? shouldn't get here")
      // }
    //}
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function insideLoopFunction(){
  //var position = navigator.geolocation.watchPosition(showPosition);
  var position = navigator.geolocation.getCurrentPosition(showPosition);
//   console.log("navigator value in insideLoopFunction",position)
//   console.log('test global variable showPositionPoints',showPositionPoints)
// //////////////
//   // console.log("turfPoint",turfPoints)
//   turfPoints = showPositionPoints
//   console.log("Polygons",polygons)
//   // var dataGlobal = [-95.498,29.7604]
//   // var temp_point_in_floodplain = []
//   var numberPolygons = polygons.features.length
//   console.log("number of polygons",numberPolygons)
//   console.log('Polygons.features 0',polygons.features[0])
//   var newLocationState = "unknown"
//   for (let i = 0; i < numberPolygons; i++) {
//     var searchWithin = turf.polygon(polygons.features[0].geometry.coordinates);
//     var ptsWithin = turf.pointsWithinPolygon(turfPoints, searchWithin);
//     if(ptsWithin.features.length == 0){
//       newLocationState = "outside"
      
//       //console.log("new location is within this polyon",ptsWithin);
//       //// This calls the text to speech capabilities of the browser and says a user is within the floodplain
//     }
//     else{
//       newLocationState = "inside"
//       // console.log("new location is within this polyon",ptsWithin);
//       console.log("new location is within this polyon",ptsWithin);
//     }
//   }
//   // checkLocationStateAndUpdate(newLocationState)
// //////////////

//   // checks if current state and past state are different.
//   // console.log("comparison",isLocationWithinOneFloodplainPolygon.localeCompare(newLocationState))
//   if(newLocationState == isLocationWithinOneFloodplainPolygon){
//     //// if states are same, do nothing
//    console.log("In function checkLocationStateAndUpdate(), newLocationState == isLocationWithinOneFloodplainPolygon")
//    console.log("This means no change in location state, which is: ",isLocationWithinOneFloodplainPolygon, "floodplain")
//    if(sayEveryMeasurement){
//      if(newLocationState == "outside"){
//       let notWithinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is still outside the floodplain."); 
//       console.log("type notWithinFloodplainSpeak",typeof(notWithinFloodplainSpeak))
//       speechTool.speak(notWithinFloodplainSpeak);

       
//      }
//      else{
//       let withinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is still within the floodplain."); 
//        speechTool.speak(withinFloodplainSpeak);
//      }
//    }
//  }
//  //// if states different
//   else{
    
//     ///// then say new location state
//     if(newLocationState == "inside"){
//         let withinFloodplainSpeak = new SpeechSynthesisUtterance("Note, you are within the floodplain."); 
//         speechTool.speak(withinFloodplainSpeak);
//     }
//     else{
//         console.log("newLocationState ",newLocationState )
//         console.log("isLocationWithinOneFloodplainPolygon ",isLocationWithinOneFloodplainPolygon )
//         let notWithinFloodplainSpeak = new SpeechSynthesisUtterance("You are not in the floodplain."); 
//         console.log("type notWithinFloodplainSpeak",typeof(notWithinFloodplainSpeak))
//         speechTool.speak(notWithinFloodplainSpeak);
//     }
    
//     ///// then update new state in variablew location state
//   }
//   isLocationWithinOneFloodplainPolygon = newLocationState
}

function stopSpeechUtteranceAndLoop(){
  clearInterval(interval)
  console.log("used stopSpeechUtteranceAndLoop() function to cleare interval")
  timeIntervalTriggered = false
  introductionSpeechSaid = false
  console.log("used stopSpeechUtteranceAndLoop() function to set timeIntervalTriggered = false and introductionSpeechSaid = false")
  speechSynthesis.cancel()
  console.log("used stopSpeechUtteranceAndLoop() function to call speechSynthesis.cancel()")
  locationState = "noLocationKnownYet"
  console.log("used stopSpeechUtteranceAndLoop() function to set locationState = noLocationKnownYet")
}

function showPosition(position) {
  console.log("showPosition(position)",position)
  //// This resets the center of the map based on the location position from the device.
  var localLat = position.coords.latitude+0.005*counter
  var localLong = position.coords.longitude
  map.setView([localLat,localLong], 15)
  //// Creates a turf point from the position location coordinates.
  turfPoints = turf.points([[localLong,localLat]]);
  console.log("longitude",localLong)
  //// This calls the text to speech capabilities of the browser and says the location
  if(sayLocationInLatLong){
    let currentLocationSpeak = new SpeechSynthesisUtterance("Your location is "+Math.trunc(localLat)+" latitude and"+Math.trunc(localLong)+" longitudes"); 
    window.speechSynthesis.speak(currentLocationSpeak);
  }
  //// This updates the position on the HTML page.
  document.getElementById("location").innerHTML = "Latitude: " + localLat + "<br>Longitude: " + localLong;
  //// Add marker for location point onto map:
  const marker1 = L.marker([localLat, localLong]).addTo(map);
  ////
  showPositionPoints = turfPoints
  console.log("In function showPosition showPositionPoints =",showPositionPoints)
  counter = counter + 1
   //// Call function to see if location in polygons
   searchWithinPolygonsForPoint(polygons,turfPoints)
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

////////// TURF CODE

//var turfPoint = turf.point([-95.498,29.7604]);

function searchWithinPolygonsForPoint(polygons,turfPoints){ ///isLocationWithinOneFloodplainPolygon
  console.log("turfPoint",turfPoints)
  console.log("polygons",polygons)
  // var dataGlobal = [-95.498,29.7604]
  // var temp_point_in_floodplain = []
  var numberPolygons = polygons.features.length
  console.log("number of polygons",numberPolygons)
  console.log('Polygons.features 0',polygons.features[0])
  // var newLocationState = "unknown"
  newLocationState = "outside"
  for (let i = 0; i < numberPolygons; i++) {
    console.log("turfPoints",turfPoints)
    var searchWithin = turf.polygon(polygons.features[0].geometry.coordinates);
    var ptsWithin = turf.pointsWithinPolygon(turfPoints, searchWithin);
    console.log("ptsWithin",ptsWithin)
    console.log("ptsWithin.features.length",ptsWithin.features.length)
    if(ptsWithin.features.length != 0){
      newLocationState = "inside"
      console.log("new location is within this polyon",ptsWithin);
      //// This calls the text to speech capabilities of the browser and says a user is within the floodplain
    }
    else{
      //newLocationState = "outside"
      // console.log("new location is within this polyon",ptsWithin);
    }
  }
  checkLocationStateAndUpdate(newLocationState)
}

function checkLocationStateAndUpdate(newLocationState){
  //// checks if current state and past state are different.
  //console.log("comparison",isLocationWithinOneFloodplainPolygon.localeCompare(newLocationState))
  if(newLocationState == isLocationWithinOneFloodplainPolygon){
     //// if states are same, do nothing
    console.log("In function checkLocationStateAndUpdate(), newLocationState == isLocationWithinOneFloodplainPolygon")
    console.log("This means no change in location state, which is: ",isLocationWithinOneFloodplainPolygon, "the floodplain")
    if(sayEveryMeasurement){
      if(newLocationState == "inside"){
        let withinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is still within the floodplain."); 
        speechTool.speak(withinFloodplainSpeak);
      }
      else{
        let notWithinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is still outside the floodplain."); 
        console.log("type notWithinFloodplainSpeak",typeof(notWithinFloodplainSpeak))
        speechTool.speak(notWithinFloodplainSpeak);
      }
    }
  }
  //// if states different
  else{
    
    ///// then say new location state
    if(newLocationState == "inside"){
        let withinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is within the floodplain."); 
        speechTool.speak(withinFloodplainSpeak);
    }
    else{
        console.log("newLocationState ",newLocationState )
        console.log("isLocationWithinOneFloodplainPolygon ",isLocationWithinOneFloodplainPolygon )
        let notWithinFloodplainSpeak = new SpeechSynthesisUtterance("Your recently measured location is outside the floodplain."); 
        console.log("type notWithinFloodplainSpeak",typeof(notWithinFloodplainSpeak))
        speechTool.speak(notWithinFloodplainSpeak);
    }
    ///// then update new state in variablew location state
  }
  isLocationWithinOneFloodplainPolygon = newLocationState
}

function startCheckingLocationEveryInterval(){
  insideLoopFunction()
  // interval = setInterval(function() {insideLoopFunction();}, 20000)
}

