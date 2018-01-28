<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
</head>
<body style="border: solid thin #223; width: 70%; margin-left: 20%; border-radius: 30px;">
  <div style="text-align: center; font-family: Calibri;">
    <h1>USER PARKING DETAILS</h1>
  </div>
  <div style="margin-top: 10px; width: 40%; margin-left: 20%; font-family: Calibri;">
    <b><p>Name: <?php echo $_SESSION['pra-name']; ?></p>
    <p>Address: <?php echo $_SESSION['pra-address']; ?></p>
    <?php $ava = $_SESSION['pra-available'];?>
    <?php if($ava === 1 || $ava ==='1'){
      $ans = 'Parking is available';
    }else{
      $ans = 'Parking is not available';
    }?>
    <p class="state">Status: <?php echo $ans ; ?></p></b>
  </div>

<form>
  <p style="font-family: Calibri; text-align: center;"><b>Change The Availability Status: </b></p>
<div style="width: 20%; margin-left: 40%; text-align: center; margin-top: 20px;">  
<label class="switch">

    <input class="ava" type="checkbox" checked>
    <span class="slider round"></span>
  
</label>
</div>

<button class="saveBtn" data-id="<?php echo $_SESSION['pra-id']; ?>" style="padding: 10px 10px 10px 10px; margin-left: 43%; margin-top: 25px; margin-bottom: 5px; border-radius: 8px;"><b>UPDATE</b></button>
</form>
<script src="../js/jquery.min.js"></script>
<script>
  
  $('.ava').on('change', function(e){
    e.preventDefault();
   // alert('H');
  
   var chkbox =$('.ava');
   if(chkbox.is(':checked')){
    $('.state').text("Parking is availbale");
    vvv=1;
   }
   else{
    $('.state').text("Parking is not availbale");
    vvv=0;
   }
  });

  $('.saveBtn').click( function(e){
    e.preventDefault();
    var chkbox =$('.ava');
   if(chkbox.is(':checked')){
    $('.state').text("Parking is availbale");
    var vvv=1;
   }
   else{
    $('.state').text("Parking is not availbale");
    var vvv=0;
   }
    var id = $(this).attr('data-id');
   
    saveUpdates(id, vvv);
  });


  function saveUpdates(id, ddd){
    alert(ddd);
    //var url ="";
    if(ddd===1 || ddd==='1'){
      var url = "../api/parking/yes/"+id;
    }

    else if(ddd===0 || ddd==='0'){
      var url = "../api/parking/not/"+id;
    }

    var formsSettings = {
            "type": "GET",
            "url": url,
        };

        alert(JSON.stringify(formsSettings));
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                console.log("Cannot update "+response.message);
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                alert("Updated Saved");

                //$('#loginForm')[0].reset();
                //window.location.href="./user_home.php";

            }
            
        }).error(function(err){
            console.log("Error: "+JSON.stringify(err));
        });
    
}
  </script>
</body>
</html> 