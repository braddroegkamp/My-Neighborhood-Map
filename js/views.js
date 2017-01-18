//the main Google Map view
var mapView = {
	myMap: null,


    init: function() {
        this.map = document.getElementById('map');
        this.render();
    },

    //render map from Google Maps API
    render: function() {
        myMap = new Map();
		myMap.googleMap = new google.maps.Map(this.map, {
			zoom: 12,
			center: myMap.coords
		});
	},

	//this loops through all venues and adds Google Markers to the map
	addMarker: function(fsVenue) {
		var self = this;

		//get marker coordinates from provided foursquare object
		var markerCoords = {
			lat : fsVenue.venue().venue.location.lat,
			lng : fsVenue.venue().venue.location.lng
		};

		var markerTitle = fsVenue.venue().venue.name;

		//generate new Google Maps Marker
		fsVenue.marker = new google.maps.Marker({
			position: markerCoords,
			map: myMap.googleMap
			});

		//call selectMarker when marker clicked
		fsVenue.marker.addListener('click', function() {
			self.selectMarker(fsVenue);
		});

		//add marker to array to later reference
		myMap.googleMarkers.push(fsVenue);
	},

	//when marker clicked, call this
	selectMarker: function(fsVenue) {
		//animate marker for 2 seconds
		fsVenue.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			fsVenue.marker.setAnimation(null);
		}, 2000);

		//enable infowindow and populate with FS info
		var htmlStr = '<h2>' + fsVenue.venue().venue.name + '</h2>' +
					  '<h3>' + fsVenue.venue().venue.location.address + ', ' + 
					  fsVenue.venue().venue.location.city + '</h3>' +
					  '<h3>Category: ' + fsVenue.venue().venue.categories[0].name + '</h3>' +
					  '<h3>Rating: ' + fsVenue.venue().venue.rating + '</h3>' +
					  (typeof(fsVenue.venue().venue.hours) != "undefined" && 
					  	fsVenue.venue().venue.hours.status != undefined ? 
					  	'<h3>' + fsVenue.venue().venue.hours.status + '</h3>':
					  	'') +
					  (typeof(fsVenue.venue().tips) != "undefined" ?
					   '<p>"' + fsVenue.venue().tips[0].text + '" --' + 
					   fsVenue.venue().tips[0].user.firstName + ' ' + 
					   fsVenue.venue().tips[0].user.lastName + '</p>':
					   '');
		myMap.infoWindow.setContent(htmlStr);
		myMap.infoWindow.open(myMap, fsVenue.marker)
	},

	//hide marker from map
	removeMarker: function(fsVenue) {
		fsVenue.marker.setVisible(false);
	},

	//show a previously hidden marker on map
	showMarker: function(fsVenue) {
		fsVenue.marker.setVisible(true);
	}
};
