<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PRA</title>
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/style1.css">
</head>
<body>
    <div class="container-fluid">
        <div class="thumb"></div>
        <div id="map" class="screen map">

        </div>
        <div class="navigation">
            <button class="btn btn-primary homeScreenBtn"><i class="glyphicon glyphicon-home"></i></button>
        <button class="btn btn-primary listScreenBtn"><i class="glyphicon glyphicon-transfer"></i></button>
        <button class="btn btn-primary listFBScreen"><i class="glyphicon glyphicon-send"></i></button></div>
    </div>

    <div id="ParkingScreen" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3 class="modal-title p_title"></h3>
      </div>
      <div class="modal-body">
      <h4>Address</h4>
        <p class="address"></p>
    
        <h4>Contact</h4>
        <p class="contact"></p>

        <button class="btn btn-xl availablity"></button>
        <button class="btn btn-warning btn-xl getDirections"></button>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<div class="container-fluid screen listpalces">
    <h3>List of available parking spots</h3>
    <div class="allList"></div>
</div>
<div class="container-fluid screen fbplaces">
    <h3>List of recommended parking areas</h3>
    <div class="allListFb">
    </div>
</div>
    <script src="./js/jquery.min.js"></script>
    <script src="./js/main.js"></script>
    <script>
        $('.map').fadeIn();
        function initMap(){
            var parkingSpots ="";//listAllParkingsreturn();
            //alert(parkingSpots);
        listAllParkings();
        listAllFbParkings();
            var iconx ="./img/available.png";
            //0.323183, 32.576388
//console.log(JSON.stringify(parkingSpots[0].contact));
            var loglat = {lat: 0.323183, lng: 32.576388};
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: loglat,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

    var marker, i;
    if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    var markerx = new google.maps.Marker({
                        position:pos,
                        map:map,
                        zoom:20,
                        center:pos,
                        icon:'./img/me.png'
                  });
                   // infoWindow.setPosition(pos);
           // infoWindow.setContent('You are around this Location.');
          //  infoWindow.open(map);
            map.setCenter(pos);
            //directionsDisplay.setMap(pos);


                }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
            }else{
                var markerx = new google.maps.Marker({
                        position:loglat,
                        map:map,
                        zoom:20,
                        center:pos,
                        icon:'./img/me.png'
                  });
                alert("Your device does not support Geo location");
    }
    var iconNew="";
    
    var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/parkings"
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Parking list", "warning");
            } else if (response.status == 'success') {
               //console.log(JSON.stringify(response));
              // alert(JSON.stringify(response.data[0]));
              //response.data[0];
          var cc = response.data;
          console.log(JSON.stringify(cc));   
          
	for (i = 0; i < cc.length; i++) {
        console.log(cc.id);
        if(cc[i].available==1 || cc[i].available=='1'){
                iconNew=iconx;
            }else{
                iconNew='./img/notavailable.png';
        }   
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(cc[i].longtudes, cc[i].latitudes),
            map: map,
            icon:iconNew,      
            zoom:20,
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
                //console.log("Load details");
                $('#ParkingScreen').modal({show:true});
                loadParkingDetails(cc[i].id);
				infowindow.setContent(cc[i].name_of_place);
				infowindow.open(map, marker);
			}
        })(marker, i));
        
    }
}
        });
    
    directionsService.route({
        origin:loglat,
        destination: {lat: 0.313329, lng: 32.581562},
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });


           // infoWindow = new google.maps.InfoWindow;
            
            //infoWindow = new google.maps.InfoWindow;

    }
        function loadParkingDetails(id){
            $('#ParkingScreen .getDirections').hide();
            var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/parking/" + id
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Parking details", "warning");
            } else if (response.status == 'success') {
                // console.log(JSON.stringify(response));
                //console.log(JSON.stringify(response.data));
                //alert(response.data.contact);
                $('#ParkingScreen .p_title').text(response.data.name_of_place+" (UGX "+response.data.prices+" per hour)");
                $('#ParkingScreen .address').text(response.data.address);
                $('#ParkingScreen .contact').text(response.data.contact);
                if(response.data.available==0 || response.data.available=='0' ){
                    $('#ParkingScreen .availablity').removeClass('btn-success');
                    $('#ParkingScreen .availablity').addClass('btn-danger');
                    $('#ParkingScreen .availablity').text("No parking space available");
                }else{
                    $('#ParkingScreen .availablity').removeClass('btn-danger');
                    $('#ParkingScreen .availablity').addClass('btn-success');
                    $('#ParkingScreen .availablity').text("Parking is available");
                    $('#ParkingScreen .getDirections').show();
                    $('#ParkingScreen .getDirections').text("Get Directions");
                }
            }
        });
        }
        function listAllParkings(){
            var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/parkings"
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Parking list", "warning");
            } else if (response.status == 'success') {
                // console.log(JSON.stringify(response));
               // console.log(JSON.stringify(response.data));
                //alert(response.data.contact);
                var listy ="";
                $.each(response.data, function(key,value){
                 //   console.log(JSON.stringify(value));
                    listy+='<div class="place">'+
                    '<i class="glyphicon glyphicon-map-marker"></i>'+
                     '<h5>'+value.name_of_place+'(UGX'+value.prices+'per hour)</h5>'+
                    '<p>50 Mtr away</p>'+
                    '</div>';
                });
                $('.allList').html(listy);
               
            }
        });
        }
        function listAllFbParkings(){
                var formsSettings = {
                "type": "GET",
                "dataType": "json",
                "url": "https://graph.facebook.com/v2.11/search?type=place&q=parking&center=0.323183%2C32.576388&distance=1000&fields=name%2Ccheckins%2Cpicture&access_token=688470488209611%7CqVuCH6tFzl-xoSjollO5BO9Hztw"
            };
            $.ajax(formsSettings).success(function (response) {
                    // console.log(JSON.stringify(response));
                   // console.log(JSON.stringify(response));
                    //alert(response.data.contact);
                    var listy ="";
                    $.each(response.data, function(key,value){
                        //console.log(JSON.stringify(value));
                        listy+='<div data-id="" class="place">'+
                        '<img src="'+value.picture.data.url+'" />'+
                        '<h3>'+value.name+'</h3>'+
                        '<p>Checkins:'+value.checkins+'</p>'+
                    '</div>';
                    });
                    $('.allListFb').html(listy);
                
                
            });
        }
        $('.thumb').load('./menu/index.php');
        $('.homeScreenBtn').click( function(e){
            e.preventDefault();
            loadHome();
        });
        $('.listScreenBtn').click( function(e){
            e.preventDefault();
            loadListsinView();
        });
        $('.listFBScreen').click( function(e){
            e.preventDefault();
            loadPlaces();
        });
        function loadHome(){
            $('.screen').hide();
            $('.map').fadeIn();
        }
        function loadListsinView(){
            // /listpalces
            $('.screen').hide();
            $('.listpalces').fadeIn();
        }
        function loadPlaces(){
            $('.screen').hide();
            $('.fbplaces').fadeIn();
        }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGy8oKABLzT1zJluhQnvSTZAm2uuXb08k&callback=initMap">
    </script>
    <script async defer
    src="./js/bootstrap.min.js">
    </script>

</body>
</html>