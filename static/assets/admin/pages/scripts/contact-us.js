var ContactUs = function () {

    return {
        //main function to initiate the module
        init: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
				lat: 42.338053,
				lng: -71.105440
			  });
			   var marker = map.addMarker({
		            lat: 42.338053,
					lng: -71.105440,
		            title: 'Boston Children\'s Hospital',
		            infoWindow: {
		                content: "<b>Stem Cell Program, Division of Hematology/Oncology, Boston Children's Hospital<b>",
						maxWidth: 300
		            }
		        });

			   marker.infoWindow.open(map, marker);
			});
        }
    };

}();