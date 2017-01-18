//initialize Google map
mapView.init();

//main ViewModel function used with Knockout
var ViewModel = function() {
	var self = this;

	this.placesList = ko.observableArray([]);
	this.search = ko.observable();
	this.error_message = ko.observable();

	//error function if Foursquare API ajax call doesn't return a result
	var fsRequestTimeout = setTimeout(function(){
		self.error_message('Failed to get FourSquare resources');
    }, 5000);

	//Foursquare API call to get Green Bay restaurants and add to a ko.observableArray referenced in index.html
	$.ajax({
		url: fs_api_call,
		dataType: 'jsonp',
		success: function(obj) {
	       	var rawPlacesList = obj.response.groups[0].items;
			for (var i = 0; i < rawPlacesList.length; i++) {
				self.placesList.push( new FrSqVenue(rawPlacesList[i]) );
				
				// add initial markers to map
				mapView.addMarker(self.placesList()[i]);
	        };

	    clearTimeout(fsRequestTimeout);
		}		
   	}); 

	//called when marker is clicked from sidebar list
	this.setMarker = function(clickedVenue) {
		mapView.selectMarker(clickedVenue);
	};

	//search bar functionality.  On value change, this will run and update sidebar list and map markers
	this.search.subscribe(function(searchValue) {
		for (var i = 0; i < self.placesList().length; i++){
			if (self.placesList()[i].venue().venue.name.toUpperCase().includes(searchValue.toUpperCase())){
				self.placesList()[i].show(true);
				mapView.showMarker(self.placesList()[i]);
			}else{
				self.placesList()[i].show(false);
				mapView.removeMarker(self.placesList()[i]);
			}
		}

	});

};

ko.applyBindings(new ViewModel());



//js to manage window responsiveness
$( '#cross' ).hide();

$( '#hamburger' ).click(function() {
	$( '#sidebar' ).slideToggle( 'slow', function() {
		$( '#hamburger' ).hide();
		$( '#cross' ).show();
		document.getElementById('map').style.left = '26%';
		document.getElementById('map').style.width = '75%';
	});
});

$( '#cross' ).click(function() {
	$( '#sidebar' ).slideToggle( 'slow', function() {
		$( '#cross' ).hide();
		$( '#hamburger' ).show();
		document.getElementById('map').style.left = '0%';
		document.getElementById('map').style.width = '100%';
	});
});

$(window).resize(function(){
	if($(window).width() >= 680){
		document.getElementById('hamburger').style.visibility = 'hidden';
		document.getElementById('sidebar').style.display = 'block';
		document.getElementById('map').style.left = '26%';
		document.getElementById('map').style.width = '75%';
	}
	if($(window).width() < 680){
		document.getElementById('hamburger').style.visibility = 'visible';
		document.getElementById('sidebar').style.display = 'none';
		document.getElementById('map').style.left = '0%';
		document.getElementById('map').style.width = '100%';
	}
});
