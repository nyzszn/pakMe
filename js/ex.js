$(function () {

    var current_user_id = $('#topVar').attr('data-user');
    var expense = new Expense();
    expense.getAll();
    expense.getAllExTypeList();
    expense.getUserById(current_user_id);
    // add Expense type
    $('#addExTypeForm').submit(function (e) {
        e.preventDefault();
        var et_name = $('#addExTypeForm .et_name').val();

        // form data 
        var formdata = {
            "et_name": et_name,
        };
        expense.exTypeCreate(formdata);
    });

    // add Expense
    $('#addExForm').submit(function (e) {
        e.preventDefault();
        var ex_type = $('.ex-add-form .et-list').val();
        var ex_amount = $('.ex-add-form .ex_amount').val();
        var ex_description = $('.ex-add-form .ex_description').val();

        var activeBranch = $('.ex-add-form .branch-option').attr('data-id');
        var activeUser = $('.ex-add-form .full_name').attr('data-id');
        // form data 
        var formdata = {
            "ex_type": ex_type,
            "ex_amount": ex_amount,
            "ex_description": ex_description,
            "branch": activeBranch,
            "user": activeUser
        };
        // alert(JSON.stringify(formdata));
        expense.create(formdata);
    });

    $('.exTypes').click(function () {
        expense.getAllExType();
    });

    //prepare ET for Editing
    $('#content').on('click', '.editETBtn', function () {
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');
        $('#editExTypeForm').attr('data-id', dataId);
        $('#editExTypeForm .et_name').val(dataName);
    });
    //prepare ET for Expense
    $('#content').on('click', '.editBtn', function () {
        var dataId = $(this).attr('data-id');
        expense.getById(dataId);
    });

    //EDIT AND UPDATE IT TYPE
    $('#editExTypeForm').submit(function (e) {
        e.preventDefault();
        var et_name = $('#editExTypeForm .et_name').val();
        var dataId = $(this).attr('data-id');

        // form data 
        var formdata = {
            "et_name": et_name,
        };
        expense.exTypeUpdate(formdata, dataId);

    });

    //EDIT AND UPDATE Expense
    $('#editExForm').submit(function (e) {
        e.preventDefault();
        var ex_amount = $('#editExForm .ex_amount').val();
        var ex_description = $('#editExForm .ex_description').val();
        var dataId = $(this).attr('data-id');
        var dataEt = $(this).attr('data-et');

        // form data 
        var formdata = {
            "ex_amount": ex_amount,
            "ex_description": ex_description,
            "ex_type": dataEt

        };
        //alert(JSON.stringify(formdata));
        expense.update(formdata, dataId);
    });

    //delete IT
    $('#content').on('click', '.deleteET', function (e) {
        e.preventDefault();
        // alert("Helo");
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');
        ''
        var toDelete = prompt("Type the expense type you want to delete to continue");
        if (toDelete == dataName) {
            notify(dataName + " is being deleted ", "success");
            expense.deleteET(dataId);
            return true;
        } else {
            notify("Expense type provided does not match the one selected ", "warning");
            return false;
        }

    });

    //delete Expense
    $('#content').on('click', '.deleteExpense', function (e) {
        e.preventDefault();
        // alert("Helo");
        var dataId = $(this).attr('data-id');
        var toDelete = "";
        toDelete = confirm("Are you sure do you want to delete this expense");
        if (toDelete) {
            notify("Expense is being deleted ", "success");
            expense.delete(dataId);
            return true;
        } else {

            return false;
        }

    });

    //get filter
    expense.getUserList();
    $(".fromDate").datepicker({
        defaultDate: "0d",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: 'yy-mm-dd',
        onClose: function (selectedDate) {
            $(".toDate").datepicker("option", "minDate", selectedDate);
            //$(".fromDate").datepicker.formatDate('yy-mm-dd', selectedDate);
            //formatDate: function (format, date, settings)
        }

    });

    $(".toDate").datepicker({
        defaultDate: "0d",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: 'yy-mm-dd',
        onClose: function (selectedDate) {
            $(".fromDate").datepicker("option", "maxDate", selectedDate);
            // $(".toDate").datepicker.formatDate('yy-mm-dd', selectedDate);
        }
    });

    //searchExpense
    $('#filterFormExpense').submit(function (e) {
        e.preventDefault();
        var dateFrom = $('#filterFormExpense .fromDate').val();
        var dateTo = $('#filterFormExpense .toDate').val();
        var user = $('#filterFormExpense .u-list').val();

        var formdata = {
            "date_from": dateFrom,
            "date_to": dateTo,
            "user":user
        };
        expense.searchExpense(formdata);
    });
    $('.onlyAdmin').hide();
});

// custom functions
function Expense() {
    var expense = this;
    this.getUserList = function (user_id) {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/users"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".u-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get users", "warning");
            } else if (response.status == 'success') {
                var appendData = "";
                $.each(response.data, function (key, value) {
                    //console.log(JSON.stringify(value));
                    appendData += ' <option value="' + value.id + '">' + value.full_name + '</option>';
                });
                $(".u-list").html(appendData);
                $(".u-list").prepend("<option selected value='0'>Select User</option>");

            }
        });
    }
    this.getUserById = function (user_id) {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/user/" + user_id
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get users", "warning");
            } else if (response.status == 'success') {
                //alert(JSON.stringify(response));
                $('.ex-add-form .branch-option').text(response.data[0].branch_name);
                $('.ex-add-form .branch-option').attr('data-id', response.data[0].branch);
                $('.ex-add-form .full_name').text(response.data[0].full_name);
                $('.ex-add-form .full_name').attr("data-id", response.data[0].id);
                //alert(response.data.contact);
            }
        });
    }
    this.getById = function (ex_id) {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/expenditure/" + ex_id
        };
        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Expense data", "warning");
            } else if (response.status == 'success') {
                // console.log(JSON.stringify(response));
                $('#editExForm .ex_description').val(response.data.ex_description);
                $('#editExForm .ex_amount').val(response.data.ex_amount);
                $('#editExForm').attr('data-id', response.data.id);
                $('#editExForm').attr('data-et', response.data.ex_type);
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify("Cannot get Expense data", "warning");
        });
    }
    this.getAll = function () {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/expenditure"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".ex-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Expense data", "warning");
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    // console.log(JSON.stringify(value));
                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.et_name + '</td>' +
                        '<td>' + value.ex_amount + '</td>' +
                        '<td>' + value.ex_description + '</td>' +
                        '<td>' + value.date + '</td>' +
                        '<td>' + value.branch_name + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-target="#editExpense" class="editBtn btn btn-default btn-xs"><i class="fa fa-pencil"></i></button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" class="deleteExpense btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></td>' +
                        '</tr>';
                });
                $(".ex-list").html(appendData);
                $('.onlyAdmin').hide();
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify("Cannot get Expense data", "warning");
        });
    }
    this.searchExpense = function (formdata) {
        var formsSettings = {
            "type": "POST",
            "data": formdata,
            "dataType": "json",
            "url": "api/expense/search"
        };
       // alert(JSON.stringify(formsSettings));
        $.ajax(formsSettings).success(function (response) {
            $(".ex-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Expense data", "warning");
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    // console.log(JSON.stringify(value));
                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.et_name + '</td>' +
                        '<td>' + value.ex_amount + '</td>' +
                        '<td>' + value.ex_description + '</td>' +
                        '<td>' + value.date + '</td>' +
                        '<td>' + value.branch_name + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-target="#editExpense" class="editBtn btn btn-default btn-xs"><i class="fa fa-pencil"></i></button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" class="deleteExpense btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></td>' +
                        '</tr>';
                });
                $(".ex-list").html(appendData);
                $('.modal').modal('hide');
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify("Cannot get Expense data", "warning");
        });
    }
    this.create = function (formdata) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/expenditure"
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                expense.getAll();
                //console.log(JSON.stringify(response));
                $('#addExForm')[0].reset();
                notify('Expense has been added', 'success');

            }

        }).error(function (response) {
            notify('Expense has not been added', 'error');

        });
    }
    this.exTypeCreate = function (formdata) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/exType"
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                expense.getAllExType();
                //console.log(JSON.stringify(response));
                $('#addExTypeForm')[0].reset();
                notify('Expense type has been added', 'success');

                $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Expense type has not been added', 'error');

        });
    }
    this.getAllExType = function () {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/exType"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".ex-types-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Expense types data", "warning");
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    //console.log(JSON.stringify(value));
                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.et_name + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-name="' + value.et_name + '" data-target="#editExType" class="editETBtn btn btn-default btn-xs"><i class="fa fa-pencil"> </i> Edit</button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" data-name="' + value.et_name + '" class="deleteET btn btn-danger btn-xs"><i class="fa fa-trash"> </i> Delete</button></td>' +
                        '</tr>';
                });
                $(".ex-types-list").html(appendData);
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify("Cannot get Expense types data", "warning");
        });
    }

    this.getAllExTypeList = function () {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/exType"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".et-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Expense types data", "warning");
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    // console.log(JSON.stringify(value));
                    appendData += ' <option value="' + value.id + '">' + value.et_name + '</option>';
                });
                $(".et-list").html(appendData);
                $(".et-list").prepend("<option selected value='0'>Select Expense Type</option>");
            }
        }).error(function (response) {
            //console.log(JSON.stringify(response));
            notify("Cannot get Expense types Data", "warning");
        });
    }
    this.exTypeUpdate = function (formdata, it_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/exType/update/" + it_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                expense.getAllExType();
                notify('Expense type has been updated', 'success');

                // $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Expense type has not been updated', 'error');

        });
    }

    this.update = function (formdata, ex_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/expenditure/update/" + ex_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                expense.getAll();

                notify('Expense  has been updated', 'success');

                // $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Expense has not been updated', 'error');

        });
    }
    this.deleteET = function (et_id) {
        var formSettings = {
            "type": "DELETE",
            //"dataType": "json",
            //"data": formdata,
            "url": "api/exType/" + et_id
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                // user.getAll();
                expense.getAllExType();
                notify('Expense type has been deleted', 'success');
                // $('.modal').modal('hide');
            }

        }).error(function (response) {
            notify('Expense type has not been deleted', 'error');

        });
    }

    this.delete = function (ex_id) {
        var formSettings = {
            "type": "DELETE",
            //"dataType": "json",
            //"data": formdata,
            "url": "api/expenditure/" + ex_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                // user.getAll();
                expense.getAll();
                notify('Expense has been deleted', 'success');
                // $('.modal').modal('hide');
            }

        }).error(function (response) {
            notify('Expense has not been deleted', 'error');

        });
    }
}