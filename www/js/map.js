var map, infoWindow, mypos;
      var directionsService;
      var directionsDisplay;
        
function CenterControl(controlDiv, map) {
		/*
		<div class="blurbmap">
                 <div class="map white"><p>To 807 N Comanche St, San Marcos, TX 78666
                 <br>
                 Yes! We have a route that<br> 
                     delivers to your area.</p></div>
                  <div class="circlearrow"><a href="questionnaire.html"><img src="images/arrowrightwhite.png"></a>
             </div>
    
        </div>
		*/
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
		controlUI.className = "blurbmap";
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
		controlText.className = "map white";
        controlText.innerHTML = 'ggg';
        controlUI.appendChild(controlText);
		/*
		var controlNext = document.createElement('div');
		controlNext.className = "circlearrow";
		
		var img = document.createElement('img');
		img.src = "images/arrowrightwhite.png";
		controlNext.appendChild(img);
        controlUI.appendChild(controlNext);

        // Setup the click event listeners: simply set the map to Chicago.
        controlNext.addEventListener('click', function() {
          location = "questionnaire.html";
        });
		*/
		
      }
        
      function initMap() {
          //default center on San Marcos, TX
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 29.89, lng: -97.91},
          zoom: 15,
            });
        
		var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
		
          var rendererOptions = {
              map: map
          };
          directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
          
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
              

            map.setCenter(pos);
            addPositionToMap(pos);
            mypos = pos;
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
		
		foodbanklocation = { lat: 29.8747495, lng: -97.9433863 };
          addPositionToMap(foodbanklocation,"Hays County Food Bank");
      }
        
        
        function clearMapKeepPosition() {
            map = new google.maps.Map(document.getElementById('map'), {
          center: mypos,
          zoom: 15,
            });
          var rendererOptions = {
            map: map  
          };
          directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
            addPositionToMap(mypos);
        }
      function addPositionToMap(newlocation,locationInfo) {
        var mymarker;
          if (newlocation == null) {
              mymarker = new google.maps.Marker({ position: mypos });
          }
          else {
              mymarker = new google.maps.Marker({ position: newlocation });
          }
          mymarker.setMap(map);
          if (locationInfo != null) {
              var infowindow = new google.maps.InfoWindow({
                  content: locationInfo
              });
              infowindow.open(map,mymarker);
          }
      }
	  
	  function addPositionToMapWithLabel(newlocation, label) {
		  var mymarker;
          if (newlocation == null) {
              mymarker = new google.maps.Marker({ position: mypos, 
												  title: label});
          }
          else {
              mymarker = new google.maps.Marker({ position: newlocation,
												  title: label});
          }
          mymarker.setMap(map);
      }
        
      function calcRoute(destinationLocation,intermediateStops) {
          
          directionsService = new google.maps.DirectionsService();
          
          if (intermediateStops != null) {
              var waypoints = [];
                for (var i = 0; i < intermediateStops.length; i++) {
                var address = intermediateStops[i];
                if (address !== "") {
                    waypoints.push({
                        location: address,
                        stopover: true
                    });
                }
                }
              var request = {
                  origin: mypos,
                  destination: destinationLocation,
                  waypoints: waypoints,
                  optimizeWaypoints: true,
                  travelMode: "DRIVING"
              };
          }
          else {
              var request  = {
                  origin: mypos,
                  destination: destinationLocation,
                  travelMode: "DRIVING"
              };
          }
          directionsService.route(request, function(result,status) {
              if (status == "OK") {
                  directionsDisplay.setDirections(result);
              }
          });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }