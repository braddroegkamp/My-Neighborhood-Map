mapView.init();

var ViewModel = function() {
	var self = this;

	this.placesList = ko.observableArray([]);
	this.search = ko.observable();

	var fsRequestTimeout = setTimeout(function(){
        $('sidebar').append = 'failed to get FourSquare resources'; //where to put this???
    }, 5000);

	$.ajax({
		url: fs_api_call,
		dataType: "jsonp",
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

	this.setMarker = function(clickedVenue) {
		mapView.selectMarker(clickedVenue);
	};

	this.search.subscribe(function(searchValue) {
		for (var i = 0; i < self.placesList().length; i++){
			if (self.placesList()[i].venue().venue.name.startsWith(searchValue)){
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

// TODO:
// 3	add FS icon/reference to infoWindow
// 3.5  fix error handling
// 5.	css - notably list selection hover, full bar, no bullet points
// 	a.	including mobile rendering (hb menu)
// 6.	readMe, add comments, citations