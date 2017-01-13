var mapView = {
	myMap: null,

    init: function() {
        this.map = document.getElementById('map');
        this.render();
    },

    render: function() {
        myMap = new Map();
		myMap.googleMap = new google.maps.Map(this.map, {
			zoom: 12,
			center: myMap.coords
		});
	},

	addMarker: function(fsVenue) {
		var self = this;
		var markerCoords = {
			lat : fsVenue.venue().venue.location.lat,
			lng : fsVenue.venue().venue.location.lng
		};
		var markerTitle = fsVenue.venue().venue.name;
		fsVenue.marker = new google.maps.Marker({
			position: markerCoords,
			map: myMap.googleMap
			});
		fsVenue.marker.addListener('click', function() {
			self.selectMarker(fsVenue);
		});
		myMap.googleMarkers.push(fsVenue);
	},

	selectMarker: function(fsVenue) {
		//animate marker for 3 seconds
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

	removeMarker: function(fsVenue) {
		fsVenue.marker.setMap(null);
	},

	showMarker: function(fsVenue) {
		fsVenue.marker.setMap(myMap.googleMap);
	}
};
