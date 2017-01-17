//coordinates of Green Bay, WI
var COORDINATES = {
	lat: 44.5192,
	lng: -88.0198
};


//foursquare api call details
fs_client_id = 'MXGP44Q2K41ILWCF12CJ1U0WJCDGKEAQMFOBDRZ40SGKSIG1';
fs_client_secret = 'RT2LEAYLOE2BSWZTLXLC0FF1BBDS2UBRSNFAPPRSR1AXIFD0';
fs_category = 'food';
fs_vsn = '20160110';
fs_api_call = 'https://api.foursquare.com/v2/venues/explore?client_id=' +
				fs_client_id + '&client_secret=' + fs_client_secret + 
				'&ll=' + COORDINATES.lat + ',' + COORDINATES.lng + '&section=' + 
				fs_category + '&v=' + fs_vsn + '&m=foursquare';


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