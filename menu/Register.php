<!DOCTYPE html>
<html >
<head>
  <!-- Site made with Mobirise Website Builder v4.6.3, https://mobirise.com -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="generator" content="Mobirise v4.6.3, mobirise.com">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <link rel="shortcut icon" href="assets/images/logo4.png" type="image/x-icon">
  <meta name="description" content="Website Builder Description">
  <title>Register</title>
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
  <link rel="stylesheet" href="assets/tether/tether.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
  <link rel="stylesheet" href="assets/theme/css/style.css">
  <link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">

  <style type="text/css">
    
.success {
    background-color: #ddffdd;
    border-left: 6px solid #4CAF50;
}

.warning {
    background-color: #ffffcc;
    border-left: 6px solid #ffeb3b;
}

  </style>
  
</head>
<body>
  <section class="cid-qHVLh4svWY mbr-fullscreen mbr-parallax-background" id="header15-j">

    

    <div class="mbr-overlay"></div>
    
    <div class="container align-right">
    <span ><img style="border-radius: 40px; margin-bottom: 25px;" src="assets/images/logo.png"></span>
<div class="row">
    <div class="mbr-white col-lg-8 col-md-7 content-container">
        <h1 class="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-1" style="font-size: 75px;">Register</h1>
        <p class="mbr-text pb-3 mbr-fonts-style display-5"></p>
    </div>
    <div class="col-lg-4 col-md-5">
    <div class="form-container">
        <div class="media-container-column" data-form-type="formoid">
            <div data-form-alert="" hidden="" class="align-center">Thanks for filling out the form!</div>
<div style="border:solid thin grey; border-radius: 5px;">
  <div class="warning">
  <p style="font-family: Calibri; font-size: 14px;"><strong>Warning!</strong> Click the button to get your coordinates.<br>Make sure you are at the parking Location!</p>
</div>

    <button style="padding: 5px 5px 5px 5px; color: grey; font-family: Calibri; border-radius: 10px;" onclick="getLocation()">GET COORDINATES</button><br>

      <p id="demo"></p>

        <script>
          var x = document.getElementById("demo");

            function getLocation() {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
               x.innerHTML = "Geolocation is not supported by this browser.";
            }
          }

            function showPosition(position) {
               x.innerHTML = "<div class='success'><p><strong>Success!</strong> Coordinates Inserted!</div>";
                var longitude = document.getElementById("longitude-header15-j");
                longitude.value = position.coords.longitude;

                var latitude = document.getElementById("latitude-header15-j");
                latitude.value = position.coords.latitude;
          }
        </script>
  </div>
            <br><form id="registerForm" class="mbr-form" method="">
                <div data-for="name">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="name" data-form-field="Name" placeholder="Name of Parking" required="" id="name-header15-j">
                    </div>
                </div>
                <div data-for="adress">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="adress" data-form-field="adress" placeholder="Adress" required="" id="adress-header15-j">
                    </div>
                </div>
                <div data-for="contact">
                    <div class="form-group">
                        <input type="tel" class="form-control px-3" name="contact" data-form-field="Contact" placeholder="Contact" id="phone-header15-j">
                    </div>
                </div>
                <div data-for="username">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="username" data-form-field="Username" placeholder="Username" id="username-header15-j">
                    </div>
                </div>
                <div data-for="password">
                    <div class="form-group">
                        <input type="password" class="form-control px-3" name="password" data-form-field="Password" placeholder="Password" id="password-header15-j">
                    </div>
                </div>
                <div data-for="logitude">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="longitude" data-form-field="logitide" placeholder="Longitude" id="longitude-header15-j">
                    </div>
                </div>
                <div data-for="latitude">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="latitude" data-form-field="latitude" placeholder="Latitude" id="latitude-header15-j">
                    </div>
                </div>
                <div data-for="price">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="price" data-form-field="price" placeholder="price" id="price-header15-j">
                    </div>
                </div>
                
                <span class="input-group-btn"><button href="" type="submit" class="btn btn-form btn-primary-outline display-4">Register</button></span>
            </form>
        </div>
    </div>
    </div>
</div>
    </div>
    <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
        <a href="#next">
            <i class="mbri-down mbr-iconfont"></i>
        </a>
    </div>
</section>
<script src="../js/jquery.min.js"></script>
<script>
    console.log('js');
$('#registerForm').submit(function(e){
   register();
});

function register(){
    console.log("Registering");
    var name_of_place = $('#registerForm #name-header15-j').val();
    var address = $('#registerForm #adress-header15-j').val();
    var contact = $('#registerForm #phone-header15-j').val();
    var username = $('#registerForm #username-header15-j').val();
    var password = $('#registerForm #password-header15-j').val();
    var longtude = $('#registerForm #longitude-header15-j').val();
    var latitude = $('#registerForm #latitude-header15-j').val();
    var price = $('#registerForm #price-header15-j').val();

    var formsSettings = {
            "type": "POST",
            "url": "../api/parking/create",
            "data":{
                "name_of_place":name_of_place,
                "address":address,
                "contact":contact,
                "username":username,
                "password":password,
                "longtudes":longtude,
                "latitudes":latitude,
                "prices":price
            }
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                console.log("Cannot register Parking details "+response.message);
            } else if (response.status == 'success') {
                // console.log(JSON.stringify(response));
                alert(response.message);
                console.log(response.message);
                $('#registerForm')[0].reset();
                window.location.href="./login.html"
            }
            
        }).error(function(err){
            console.log("Error: "+JSON.stringify(err));
        });
    
}

</script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/parallax/jarallax.min.js"></script>
  <script src="assets/theme/js/script.js"></script>
  <script src="assets/formoid/formoid.min.js"></script>
  
  
</body>
</html>