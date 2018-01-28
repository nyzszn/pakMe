/// set new user password
$(function () {
    //alert("Hello");
    var users = new Users();

    users.getAll();

    //adding a user
    $('#addUserForm').submit(function (e) {
        e.preventDefault();
        var full_name = $('#addUserForm .full_name').val();
        var user_name = $('#addUserForm .user_name').val();
        var contact = $('#addUserForm .contact').val();
        var password = $('#addUserForm .password').val();

        // form data 
        var formdata = {
            "full_name": full_name,
            "user_name": user_name,
            "contact": contact,
            "password": password
        };
        users.create(formdata);
    });

    //edit user
    //editUserBtn
    $(document.body).on('click', '.editUserBtn', function (e) {
        e.preventDefault();
        var userId = $(this).attr('data-id');
        users.getById(userId);
        users.getAllBranches();
    });

    //edit a user
    $('#editUserForm').submit(function (e) {
        e.preventDefault();
        var full_name = $('#editUserForm .full_name').val();
        var user_name = $('#editUserForm .user_name').val();
        var contact = $('#editUserForm .contact').val();
        var password = $('#editUserForm .password').val();
        var userId = $(this).attr("data-id");
        // form data 
        var formdata = {
            "full_name": full_name,
            "user_name": user_name,
            "contact": contact,
            "password": password
        };
        users.update(formdata, userId);
    });

    //delete user
    $(document.body).on('click', '.deleteUser', function (e) {
        e.preventDefault();
        // alert("Helo");
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');
        ''
        var toDelete = prompt("Type the username of the user you want to delete to continue");
        if (toDelete == dataName) {
            notify(dataName + " is being deleted ", "success");
            users.delete(dataId);
            return true;
        } else {
            notify("Username provided does not match ", "warning");
            return false;
        }

    });

    //assignBranch

    $('.assignBranch').submit(function (e) {
        e.preventDefault();
        var branch_id = $('.assignBranch .assignBranchOption').val();
        var user_id = $('#editUserForm').attr("data-id");
        var formdata = {
            "branch": branch_id,
        };
        users.assignBranch(formdata, user_id);
    });

});

function Users() {
    var user = this;

    this.getById = function (user_id) {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/user/" + user_id
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get users", "warning");
            } else if (response.status == 'success') {
                // console.log(JSON.stringify(response));
                $('#editUserForm .full_name').val(response.data[0].full_name);
                $('#editUserForm .user_name').val(response.data[0].user_name);
                $('#editUserForm .contact').val(response.data[0].contact);
                $('#editUserForm').attr("data-id", user_id);
                //alert(response.data.contact);
            }
        });
    }
    this.getAll = function () {

        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/users"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".users-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get users", "warning");
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    // console.log(JSON.stringify(value));
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    var branchAssigned = value.branch_name;

                    //var baf = toString(branchAssigned);
                    if (branchAssigned ==null) {
                        branchAssigned = "Not assiged";

                    }

                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.user_name + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '<td>' + value.contact + '</td>' +
                        '<td>' + branchAssigned + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-target="#editUser" class="editUserBtn btn btn-default btn-xs"><i class="fa fa-pencil"> </i> Edit</button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" data-name="' + value.user_name + '" class="deleteUser btn btn-danger btn-xs"><i class="fa fa-trash"> </i> Delete</button></td>' +
                        '</tr>';
                });
                $(".users-list").html(appendData);
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get users", "warning");
        });
    }

    this.create = function (formdata) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/user"
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                user.getAll();
                $('#addUserForm')[0].reset();
                notify('User has been added', 'success');

                $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('User has not been added', 'error');

        });
    }
    this.update = function (formdata, user_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/user/update/" + user_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                user.getAll();
                notify('User has been updated', 'success');
            }

        }).error(function (response) {
            notify('User has not been updated', 'error');

        });
    }
    this.assignBranch = function (formdata, user_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/user/branch/" + user_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                user.getAll();
                notify('User has been Assigned', 'success');
                // alert(JSON.stringify(response));
            }

        }).error(function (response) {
            notify('User has not been Assigned', 'error');

        });
    }

    this.delete = function (user_id) {
        var formSettings = {
            "type": "DELETE",
            //"dataType": "json",
            //"data": formdata,
            "url": "api/user/" + user_id
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                user.getAll();
                //update title and location
                notify('User has been deleted', 'success');
                $('.modal').modal('hide');
            }

        }).error(function (response) {
            notify('User has not been deleted', 'error');

        });
    }
    this.getAllBranches = function () {

        var dateOBj = curr_date();
        var formDateData = {
            "date_from": dateOBj.from_date,
            "date_to": dateOBj.curr_date,
        }
        var formsSettings = {
            "type": "POST",
            "data": formDateData,
            "dataType": "json",
            "url": "api/branches"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".assignBranch .assignBranchOption").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify(response.message, "warning");
            } else if (response.status == 'success') {
                //  console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    //console.log(JSON.stringify(value));
                    appendData += '<option value="' + value.id + '">' + value.branch_name + '</option>';
                });
                $(".assignBranch .assignBranchOption").html(appendData);
                $(".assignBranch .assignBranchOption").prepend("<option value='0' selected>Select branch</option>");
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify('Cannot get branches', 'warning');
        });
    }
}
function curr_date() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10 || month.length < 1) {
        month = "0" + month;
    }
    if (day < 10 || day.length < 1) {
        day = "0" + day;
    }
    var curr_date = year + "-" + month + "-" + day;
    var from_date = year + "-" + month + "-" + "01";
    var obj = {};
    return obj = {
        "curr_date": curr_date,
        "from_date": from_date
    };
}