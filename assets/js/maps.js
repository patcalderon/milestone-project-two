var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': [] };
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');


/*-------List of countries, map location and zoom-------*/


var countries = {
 
 'br': {
  center: { lat: -14.2, lng: -51.9 },
  zoom: 3
 },
 'fr': {
  center: { lat: 46.2, lng: 2.2 },
  zoom: 5
 },
 'mx': {
  center: { lat: 23.6, lng: -102.5 },
  zoom: 4
 },
 'nz': {
  center: { lat: -40.9, lng: 174.9 },
  zoom: 5
 },
 'it': {
  center: { lat: 41.9, lng: 12.6 },
  zoom: 5
 },
 'es': {
  center: { lat: 40.5, lng: -3.7 },
  zoom: 5
 },
 'us': {
  center: { lat: 37.1, lng: -95.7 },
  zoom: 3
 },
 'uk': {
  center: { lat: 54.8, lng: -4.6 },
  zoom: 5
 }
};


/*-------Resets map and all input fields-------*/


function reset() {
 clearResults();
 clearMarkers();
 $('#country')[0].selectedIndex = 0;
 $("#autocomplete").val("");
 $('#results-heading').innerHTML("");
 map.setZoom(2);
 map.setCenter(countries["uk"].center);
 map.componentRestrictions = { 'country': [] };
 place = "";

}

  function initMap() {
   $("#accomodationRadio").prop("checked", true);
   map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: countries['uk'].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
    componentRestrictions: countryRestrict

   });

 infoWindow = new google.maps.InfoWindow({
  content: document.getElementById('info-content')
 });


/*-------Creates the autocomplete object and associate it with UI input control. Restricts the search to default country-------*/
 
 
 autocomplete = new google.maps.places.Autocomplete(
  /** @type {!HTMLInputElement} */
  (
   document.getElementById('autocomplete')), {
   types: ['(cities)'],
   componentRestrictions: countryRestrict
  }); places = new google.maps.places.PlacesService(map);

 autocomplete.addListener('place_changed', onPlaceChanged); 
 document.getElementById('foodRadio').addEventListener('change', onPlaceChanged); 
 document.getElementById('accomodationRadio').addEventListener('change', onPlaceChanged); 
 document.getElementById('touristRadio').addEventListener('change', onPlaceChanged);
 // Add a DOM event listener to react when the user selects a country.
 document.getElementById('country').addEventListener('change', setAutocompleteCountry); 
 document.getElementById('reset-button').addEventListener("click", setAutocompleteCountry);

}


/*-------When a city is selected, it gets the details of the chosen option. Zooms in the map on the chosen city-------*/


function onPlaceChanged() {
 if ($("#accomodationRadio").is(':checked')) {
  var place = autocomplete.getPlace();
  if (place.geometry) {
   map.panTo(place.geometry.location);
   map.setZoom(15);
   searchHotel();
  }
  else {
   $('#autocomplete').attr("placeholder","Enter a city");
  }
 }
 else if ($("#foodRadio").is(':checked')) {
  var place = autocomplete.getPlace();
  if (place.geometry) {
   map.panTo(place.geometry.location);
   map.setZoom(15);
   searchRestaurant();
  }
  else {
   $('#autocomplete').attr("placeholder","Enter a city");
  }
 }
 else if ($("#touristRadio").is(':checked')) {
  var place = autocomplete.getPlace();
  if (place.geometry) {
   map.panTo(place.geometry.location);
   map.setZoom(15);
   searchAttractions();
  }
  else {
   $('#autocomplete').attr("placeholder","Enter a city");
  }
 }

}


/*-------Looks for hotels in the city selected, within the map viewport-------*/


function searchHotel() {
 var search = {
  bounds: map.getBounds(),
  types: ['lodging']
 };

 places.nearbySearch(search, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
   clearResults();
   clearMarkers();
   document.getElementById('results-heading').innerHTML = "Results";
   
   /*-------Creates a marker for hotels found and assigns a letter to each marker in alphabetic order-------*/
    
   for (var i = 0; i < results.length; i++) {
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';
    
    /*-------Uses marker animation to drop the icons on the map-------*/
    
    markers[i] = new google.maps.Marker({
     position: results[i].geometry.location,
     animation: google.maps.Animation.DROP,
     icon: markerIcon
    });
    
    /*-------If the user clicks on a hotel marker, show the details of that hotel in a window-------*/
  
    markers[i].placeResult = results[i];
    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
    setTimeout(dropMarker(i), i * 100);
    addResult(results[i], i);
   }
  }
 });
}

/*-------Search for restaurants in the selected city within the viewport of the map-------*/

function searchRestaurant() {
 var search = {
  bounds: map.getBounds(),
  types: ['restaurant', 'bar']
 };

 places.nearbySearch(search, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
   clearResults();
   clearMarkers();
   document.getElementById('results-heading').innerHTML = "Results";
   
   /*-------Create a marker for each restaurant found, and add letter-------*/
   
   for (var i = 0; i < results.length; i++) {
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';
    // Use animation to drop the icons incrementally on the map.
    markers[i] = new google.maps.Marker({
     position: results[i].geometry.location,
     animation: google.maps.Animation.DROP,
     icon: markerIcon
    });
    
    /*-------If the user clicks a resteraunt marker, show the details of that hotel in a window.-------*/
    
    markers[i].placeResult = results[i];
    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
    setTimeout(dropMarker(i), i * 100);
    addResult(results[i], i);
   }
  }
 });
}

/*-------Search for attractions in the selected city within the map viewport-------*/

function searchAttractions() {
 var search = {
  bounds: map.getBounds(),
  types: ['museum', 'art_gallery', 'park']
 };

 places.nearbySearch(search, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
   clearResults();
   clearMarkers();
   document.getElementById('results-heading').innerHTML = "Results";
   
   /*-------Creates a marker for attractions found and assigns a letter to each marker in alphabetic order-------*/
   
   for (var i = 0; i < results.length; i++) {
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';
    
    /*-------Uses marker animation to drop the icons on the map-------*/
    
    markers[i] = new google.maps.Marker({
     position: results[i].geometry.location,
     animation: google.maps.Animation.DROP,
     icon: markerIcon
    });
    
    /*-------If the user clicks a attraction marker, show the details of that hotel in a window.-------*/
    
    markers[i].placeResult = results[i];
    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
    setTimeout(dropMarker(i), i * 100);
    addResult(results[i], i);
   }
  }
 });
}

function clearMarkers() {
 for (var i = 0; i < markers.length; i++) {
  if (markers[i]) {
   markers[i].setMap(null);
  }
 }
 markers = [];
}

/*-------Set the country restriction based on user input. Also zoom the map on the selected country.-------*/

function setAutocompleteCountry() {
 var country = $('#country').val();
 if (country == 'all') {
  autocomplete.setComponentRestrictions({ 'country': [] });
  map.setCenter({ lat: 15, lng: 0 });
  map.setZoom(2);
 }
 else {
  autocomplete.setComponentRestrictions({ 'country': country });
  map.setCenter(countries[country].center);
  map.setZoom(countries[country].zoom);
 }
 clearResults();
 clearMarkers();
}

function dropMarker(i) {
 return function() {
  markers[i].setMap(map);
 };
}

/*-------Adds results to table below the map-------*/

function addResult(result, i) {
 var results = document.getElementById('results');
 var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
 var markerIcon = MARKER_PATH + markerLetter + '.png';

 var tr = document.createElement('tr');
 
 /*-------Creates stripe effect making every odd line darker-------*/

 tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
 tr.onclick = function() {
  google.maps.event.trigger(markers[i], 'click');
 };

 var iconTd = document.createElement('td');
 var nameTd = document.createElement('td');
 var icon = document.createElement('img');
 icon.src = markerIcon;
 icon.setAttribute('class', 'placeIcon');
 icon.setAttribute('className', 'placeIcon');
 var name = document.createTextNode(result.name);
 iconTd.appendChild(icon);
 nameTd.appendChild(name);
 tr.appendChild(iconTd);
 tr.appendChild(nameTd);
 results.appendChild(tr);
}

function clearResults() {
 var results = document.getElementById('results');
 while (results.childNodes[0]) {
  results.removeChild(results.childNodes[0]);
 }
}

/*-------Get the details for selected hotel, restaurant or attraction. Display information in a window on the marker for the selected option-------*/

function showInfoWindow() {
 var marker = this;
 places.getDetails({ placeId: marker.placeResult.place_id },
  function(place, status) {
   if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
   }
   infoWindow.open(map, marker);
   buildIWContent(place);

  });
}

/*-------Loads place information into the HTML elements used by the info window-------*/

function buildIWContent(place) {

 document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
  'src="' + place.icon + '"/>';
 document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
  '">' + place.name + '</a></b>';
 document.getElementById('iw-address').textContent = place.vicinity;

 if (place.formatted_phone_number) {
  document.getElementById('iw-phone-row').style.display = '';
  document.getElementById('iw-phone').textContent =
   place.formatted_phone_number;
 }
 else {
  document.getElementById('iw-phone-row').style.display = 'none';
 }

/*-------Assign a five-star rating to the place to indicate the rating of the selected place and a white star icons-------*/
 
 if (place.rating) {
  var ratingHtml = '';
  for (var i = 0; i < 5; i++) {
   if (place.rating < (i + 0.5)) {
    ratingHtml += '&#10025;';
   }
   else {
    ratingHtml += '&#10029;';
   }
   document.getElementById('iw-rating-row').style.display = '';
   document.getElementById('iw-rating').innerHTML = ratingHtml;
  }
 }
 else {
  document.getElementById('iw-rating-row').style.display = 'none';
 }

 if (place.website) {
  var fullUrl = place.website;
  var website = hostnameRegexp.exec(place.website);
  if (website === null) {
   website = 'http://' + place.website + '/';
   fullUrl = website;
  }
  document.getElementById('iw-website-row').style.display = '';
  document.getElementById('iw-website').textContent = website;
 }
 else {
  document.getElementById('iw-website-row').style.display = 'none';
 }
}