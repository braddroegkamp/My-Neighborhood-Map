//coordinates of Green Bay, WI
var COORDINATES = {
	lat: 44.5192,
	lng: -88.0198
};


//foursquare api call details
fsClientId = 'MXGP44Q2K41ILWCF12CJ1U0WJCDGKEAQMFOBDRZ40SGKSIG1';
fsClientSecret = 'RT2LEAYLOE2BSWZTLXLC0FF1BBDS2UBRSNFAPPRSR1AXIFD0';
fsCategory = 'food';
fsVsn = '20160110';
fsApiCall = 'https://api.foursquare.com/v2/venues/explore?client_id=' +
				fsClientId + '&client_secret=' + fsClientSecret + 
				'&ll=' + COORDINATES.lat + ',' + COORDINATES.lng + '&section=' + 
				fsCategory + '&v=' + fsVsn + '&m=foursquare';


//google map api details
var Map = function() {
	this.coords = COORDINATES;
	this.googleMap = null;
	this.googleMarkers = [];
	this.infoWindow = new google.maps.InfoWindow();
};


//venue object.  includes all Foursquare data along with Google marker data
var FrSqVenue = function(data) {
	this.venue = ko.observable(data);
	this.googleMarker = null;
	this.show = ko.observable(true);
};