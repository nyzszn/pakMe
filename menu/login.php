<?php session_start(); ?>
<!DOCTYPE html>
<html >
<head>
  <!-- Site made with Mobirise Website Builder v4.6.3, https://mobirise.com -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="generator" content="Mobirise v4.6.3, mobirise.com">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <link rel="shortcut icon" href="assets/images/logo4.png" type="image/x-icon">
  <meta name="description" content="">
  <title>Home</title>
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
  <link rel="stylesheet" href="assets/tether/tether.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
  <link rel="stylesheet" href="assets/theme/css/style.css">
  <link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">
  
  
  
</head>
<body>
  <section class="cid-qHVG0K8soK mbr-fullscreen mbr-parallax-background" id="header15-i">

    

    <div class="mbr-overlay"></div>

    <div class="container align-right">
            <span ><img style="border-radius: 40px; margin-bottom: 25px;" src="assets/images/logo.png"></span>
<div class="row">
    <div class="mbr-white col-lg-8 col-md-7 content-container">
        <h1 class="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-1" style="font-size: 75px;">Login</h1>
        <p class="mbr-text pb-3 mbr-fonts-style display-5"></p>
    </div>
    <div class="col-lg-4 col-md-5">
    <div class="form-container">
        <div class="media-container-column" data-form-type="formoid">
            <div data-form-alert="" hidden="" class="align-center">Thanks for filling out the form!</div>
            <form id="loginForm" class="mbr-form">
                <div data-for="username">
                    <div class="form-group">
                        <input type="text" class="form-control px-3" name="username" data-form-field="UserName" placeholder="Username" required="" id="username-header15-i">
                    </div>
                </div>
                
                <div data-for="password">
                    <div class="form-group">
                        <input type="password" class="form-control px-3" name="password" data-form-field="Password" placeholder="Password" id="password-header15-i">
                    </div>
                </div>
                
                <span class="input-group-btn"><button href="" type="submit" class="btn btn-form btn-primary-outline display-4">Login</button></span>
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
$('#loginForm').submit(function(e){
   login();
});

function login(){
    console.log("Logining in");
    var username = $('#loginForm #username-header15-i').val();
    var password = $('#loginForm #password-header15-i').val();
    var formsSettings = {
            "type": "POST",
            "url": "../api/parking/login",
            "data":{
                "username":username,
                "password":password
            }
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                console.log("Cannot login "+response.message);
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                alert(JSON.stringify(response));

                $('#loginForm')[0].reset();
                window.location.href="./user_home.php";

            }
            
        }).error(function(err){
            console.log("Error: "+JSON.stringify(err));
        });
    
}
</script>

  <section class="engine"><a href="https://mobirise.ws/m">drag and drop website maker</a></section><script src="assets/web/assets/jquery/jquery.min.js"></script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/parallax/jarallax.min.js"></script>
  <script src="assets/theme/js/script.js"></script>
  <script src="assets/formoid/formoid.min.js"></script>
  
  
</body>
</html>