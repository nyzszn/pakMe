$(function() {
    window.cooid = $('.cordinatorId').attr("st-id");
    getUnAssignedStudents("#academicAssignForm .UnAssignedStudents", "a");
    getUnAssignedStudents("#fieldAssignForm .UnAssignedStudents", "f");
    getSupervisors("#academicAssignForm .supervisorList", 1);
    getSupervisors("#fieldAssignForm .supervisorList", 2);
    getSs(".assignmentTable");


    $('#addSupervisorForm').submit(function(e) {
        e.preventDefault();
        notify("Adding Supervisor...", "success");
        addSupervisor();
    });

        $('#academicAssignForm').submit(function(e) {
        e.preventDefault();
        notify("Assigning...", "success");
        assignSupervisor("#academicAssignForm", "ac");
    });

        $('#fieldAssignForm').submit(function(e) {
        e.preventDefault();
        notify("Assigning...", "success");
      assignSupervisor("#fieldAssignForm", "f");
    });



});





//add supervisors
function addSupervisor() {
   // console.log(window.cooid);

    var username = $('#addSupervisorForm .username').val();
    var fullname = $('#addSupervisorForm .fullname').val();
    var type = $('#addSupervisorForm .type').val();
    var department = $('#addSupervisorForm .department').val();
    var tel = $('#addSupervisorForm .tel').val();
    var email = $('#addSupervisorForm .email').val();
    var password = $('#addSupervisorForm .password').val();

    var formdata = {
        "username": username,
        "fullname": fullname,
        "type": type,
        "department": department,
        "tel": tel,
        "email": email,
        "password": password
    };

    var formSettings = {
        "type": "POST",
        //"dataType": "json",
        "data": formdata,
        "url": "api/supervisor/add",
    };

    $.ajax(formSettings).success(function(response) {

        if (response.status == 'failed' || response.status == 'error') {
           // console.log(JSON.stringify(response));
            notify("Supervisor not added Please check your submited details", "warning");
        } else if (response.status == 'success') {
            //$('.addActivityForm')[0].reset();
           // console.log(JSON.stringify(response));
            notify("Supervisor added", "success");

            setTimeout(function() {
               window.location.reload();
            }, 5000);

            //getDaysOfStudent(student_id);

        } else {

        }

    });


}

//delete supervisor

//update supervisor

//list unassigned students
function getUnAssignedStudents(location = "", type="") {
    var formsSettings = {
        "type": "GET",
        "dataType": "json",
        "url": "api/student/unassigned/"+type
    };


    $.ajax(formsSettings).success(function(response) {
        $(location).html("");

        if (response.status == 'failed' || response.status == 'error') {

            notify("No Student available", "warning");

        } else if (response.status == 'success') {
            //  console.log(JSON.stringify(response));
            var elementV = response.data;
            var appendData = "";
            $.each(elementV, function(key, value) {
                appendData +='<option value="' + value.id + '">' + value.name + '</option>';
        });
            $(location).html(appendData);

        }



    });

}

//list supervisors{

function getSupervisors(location = "", type = "") {
    var formsSettings = {
        "type": "GET",
        "dataType": "json",
        "url": "api/supervisor/type/" + type
    };


    $.ajax(formsSettings).success(function(response) {
        $(location).html("");

        if (response.status == 'failed' || response.status == 'error') {

            notify("No Supervisor available", "warning");

        } else if (response.status == 'success') {
            //console.log(JSON.stringify(response));
            var elementV = response.data;
            var appendData = "";
            $.each(elementV, function(key, value) {
               appendData +='<option value="' + value.id + '">' + value.fullname + '</option>';
            });
            $(location).html(appendData);

        }



    });
}

//list all superivors and assigned students

//assign supervisor to students
function assignSupervisor(elemento="", type="") {

    //supervisorToEnroll
    //studentToEnroll



	

    var student_id = $(elemento +' .UnAssignedStudents').val();
    var supervisor_id = $(elemento +' .supervisorList').val();



    
    var formdata = {
        "student_id": student_id,
        "supervisor_id": supervisor_id,
    };


    var formSettings = {
        "type": "POST",
        //"dataType": "json",
        "data": formdata,
        "url": "api/assign/"+type,
    };

    $.ajax(formSettings).success(function(response) {
        if (response.status == 'failed' || response.status == 'error') {
            console.log(JSON.stringify(response));
            notify("Assignment Did not Complete", "warning");
        } else if (response.status == 'success') {
            console.log(JSON.stringify(response));
            notify("Assignment Completed", "success");
            setTimeout(function() {
                window.location.reload();
            }, 5000);

        } else {

        }

    });


}

function getSs(locationc = "") {
    var formsSettings = {
        "type": "GET",
        "dataType": "json",
        "url": "api/gals"
    };


    $.ajax(formsSettings).success(function(response) {
        $(locationc).html("");

        if (response.status == 'failed' || response.status == 'error') {

            notify("No Assignments available", "warning");

        } else if (response.status == 'success') {
            //console.log(JSON.stringify(response));
            var elementV = response.data;
            var appendData = "";
            $.each(elementV, function(key, value) {
                var stype="Unknown";
                if(value.type=='1'){
                    stype='Academic';
                }
                else if(value.type=='2'){
                     stype='Field';
                }
               appendData +='<tr><td>'+value.name+'</td><td>'+value.fullname+'</td><td>'+stype+'</td><td><button stu="'+value[2]+'" data-id="'+value[0]+'" sup-type="'+value.type+'" class="unassignBtn btn btn-default">&times</button></td></tr>';
               
            });


            $(locationc).html(appendData);
$('.unassignBtn').click( function(e){
    var elementor=$(this);
                e.preventDefault();
                var cc=confirm("Do you want to Unassign!");
                if(cc==true){
                    elementor.parent().parent().remove();
                    var student_id=$(this).attr('stu');
                    //student_id
                    var sType=$(this).attr('sup-type');
                    //type
                    var dataId=$(this).attr('data-id');
                    //assignment_id

                    if(sType=='1'){
                            unassignA(dataId, student_id);

                    }
                    else if(sType=='2'){
                            unAssignF(dataId, student_id);
                    }
                }else{
                    location.reload();
                }


        
 });

        }



    });
}

//unassign students from supervisor

function  unassignA(dataId, student_id){
        var formsSettings = {
        "type": "GET",
        "dataType": "json",
        "url": "api/assigna/delete/"+dataId+"/"+student_id
    };
    $.ajax(formsSettings).success(function(response) {
        if (response.status == 'failed' || response.status == 'error') {
            notify("Failed to remove assignmnet", "warning");
        } else if (response.status == 'success') {
            notify("Assignment removed", "success");
        setTimeout(function() {
             window.location.reload();
        }, 5000);
       }
   });
}

function  unAssignF(dataId, student_id){
        var formsSettings = {
        "type": "GET",
        "dataType": "json",
        "url": "api/assignf/delete/"+dataId+"/"+student_id
    };
    $.ajax(formsSettings).success(function(response) {
        if (response.status == 'failed' || response.status == 'error') {
            notify("Failed to remove assignmnet", "warning");
        } else if (response.status == 'success') {
            notify("Assignment removed", "success");
        setTimeout(function() {
             window.location.reload();
        }, 5000);
       }
   });
}