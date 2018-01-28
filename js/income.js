$(function () {
    //alert("Hello");
    var current_user_id = $('#topVar').attr('data-user');
    //alert(current_user_id);
    var income = new Income();

    income.getAll();
    income.getUserById(current_user_id);
    income.getAllIncomeTypeList();
    // add income type
    $('#addIncomeTypeForm').submit(function (e) {
        e.preventDefault();
        var it_name = $('#editIncomeTypeForm .it_name').val();

        // form data 
        var formdata = {
            "it_name": it_name,
        };
        income.incomeTypeCreate(formdata);
    });

    // add income
        $('#addIncomeForm').submit(function (e) {
        e.preventDefault();
        var income_type = $('.income-add-form .it-list').val();
        var income_amount = $('.income-add-form .income_amount').val();
        var income_description = $('.income-add-form .income_description').val();

        var activeBranch = $('.income-add-form .branch-option').attr('data-id');
        var activeUser = $('.income-add-form .full_name').attr('data-id');
        // form data 
        var formdata = {
            "income_type": income_type,
            "income_amount":income_amount,
            "income_description":income_description,
            "branch":activeBranch,
            "user":activeUser
        };
       // alert(JSON.stringify(formdata));
       income.create(formdata);
    });

    $('.itTypes').click(function () {
        income.getAllIncomeType();
    });

    //prepare IT for Editing
    $(document.body).on('click', '.editITBtn', function () {
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');
        $('#editIncomeTypeForm').attr('data-id', dataId);
        $('#editIncomeTypeForm .it_name').val(dataName);
    });
    //prepare IT for Income
    $(document.body).on('click', '.editBtn', function () {
        var dataId = $(this).attr('data-id');
        income.getById(dataId);
    });

    //EDIT AND UPDATE IT TYPE
    $('#editIncomeTypeForm').submit(function (e) {
        e.preventDefault();
        var it_name = $('#editIncomeTypeForm .it_name').val();
        var dataId = $(this).attr('data-id');

        // form data 
        var formdata = {
            "it_name": it_name,
        };
        income.incomeTypeUpdate(formdata, dataId);
    });

        //EDIT AND UPDATE Income
        $('#editIncomeForm').submit(function (e) {
            e.preventDefault();
            var income_amount = $('#editIncomeForm .income_amount').val();
            var income_description = $('#editIncomeForm .income_description').val();
            var dataId = $(this).attr('data-id');
            var dataIt = $(this).attr('data-it');
    
            // form data 
            var formdata = {
                "income_amount": income_amount,
                "income_description": income_description,
                "income_type":dataIt

            };
            //alert(JSON.stringify(formdata));
           income.update(formdata, dataId);
        });

    //delete IT
    $(document.body).on('click', '.deleteIT', function (e) {
        e.preventDefault();
        // alert("Helo");
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');
        ''
        var toDelete = prompt("Type the Income type you want to delete to continue");
        if (toDelete == dataName) {
            notify(dataName + " is being deleted ", "success");
            income.deleteIT(dataId);
            return true;
        } else {
            notify("Income type provided does not match the one selected ", "warning");
            return false;
        }

    });

        //delete Income
        $(document.body).on('click', '.deleteIncome', function (e) {
            e.preventDefault();
            // alert("Helo");
            var dataId = $(this).attr('data-id');
            var toDelete = confirm("Are you sure do you want to delete this Income");
            if (toDelete) {
                notify("Income is being deleted ", "success");
                income.delete(dataId);
                return true;
            } else {
                //notify("Income provided does not match the one selected ", "warning");
                return false;
            }
    
        });
            //searchExpense
              //get filter
    income.getUserList();
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
    $('#filterFormIncome').submit(function (e) {
        e.preventDefault();
        var dateFrom = $('#filterFormIncome .fromDate').val();
        var dateTo = $('#filterFormIncome .toDate').val();
        var user = $('#filterFormIncome .u-list').val();

        var formdata = {
            "date_from": dateFrom,
            "date_to": dateTo,
            "user":user
        };
        income.searchIncome(formdata);
    });
    $('.onlyAdmin').hide();
});
// custom functions
function Income() {
    var income = this;
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
                $(".u-list").prepend("<option selected>Select User</option>");

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
                $('.income-add-form .branch-option').text(response.data[0].branch_name);
                $('.income-add-form .branch-option').attr('data-id', response.data[0].branch);
                $('.income-add-form .full_name').text(response.data[0].full_name);
                $('.income-add-form .full_name').attr("data-id", response.data[0].id);
                //alert(response.data.contact);
            }
        });
    }
    this.getById = function (income_id){
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/income/"+income_id
        };
        $.ajax(formsSettings).success(function (response) {
            //$("#editIncomeForm")[0].reset();
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get users", "warning");
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                //var activeIT = $('#editIncomeForm .it-list').find("option").attr('value');
                $('#editIncomeForm .income_description').val(response.data.income_description);
                $('#editIncomeForm .income_amount').val(response.data.income_amount);
                $('#editIncomeForm').attr('data-id', response.data.id);
                $('#editIncomeForm').attr('data-it', response.data.income_type);
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get users", "warning");
        });
    }
    this.getAll = function () {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/income"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".income-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get users", "warning");
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    console.log(JSON.stringify(value));
                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.it_name + '</td>' +
                        '<td>' + value.income_amount + '</td>' +
                        '<td>' + value.income_description + '</td>' +
                        '<td>' + value.date + '</td>' +
                        '<td>' + value.branch_name + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-target="#editIncome" class="editBtn btn btn-default btn-xs"><i class="fa fa-pencil"></i></button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" class="deleteIncome btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></td>' +
                        '</tr>';
                });
                $(".income-list").html(appendData);
                $('.onlyAdmin').hide();
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get users", "warning");
        });
    }
    this.searchIncome = function (formdata) {
        var formsSettings = {
            "type": "POST",
            "data":formdata,
            "dataType": "json",
            "url": "api/income/search"
        };
       // alert(JSON.stringify(formsSettings));
        $.ajax(formsSettings).success(function (response) {
            $(".income-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Income data", "warning");
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    console.log(JSON.stringify(value));
                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.it_name + '</td>' +
                        '<td>' + value.income_amount + '</td>' +
                        '<td>' + value.income_description + '</td>' +
                        '<td>' + value.date + '</td>' +
                        '<td>' + value.branch_name + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-target="#editIncome" class="editBtn btn btn-default btn-xs"><i class="fa fa-pencil"></i></button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" class="deleteIncome btn btn-danger btn-xs"><i class="fa fa-trash"></i></button></td>' +
                        '</tr>';
                });
                $(".income-list").html(appendData);
                $('.modal').modal('hide');
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get Income data", "warning");
        });
    }
    this.create = function (formdata) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/income"
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                income.getAll();
                console.log(JSON.stringify(response));
                $('#addIncomeForm')[0].reset();
                notify('Income has been added', 'success');

            }

        }).error(function (response) {
            notify('Income has not been added', 'error');

        });
    }
    this.incomeTypeCreate = function (formdata) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/incomeType"
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                income.getAllIncomeType();
                console.log(JSON.stringify(response));
                $('#addIncomeTypeForm')[0].reset();
                notify('Income type has been added', 'success');

                $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Income type has not been added', 'error');

        });
    }
    this.getAllIncomeType = function () {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/incomeType"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".income-types-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get income types", "warning");
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    var keyList = parseInt(key);
                    var num = keyList + 1;
                    console.log(JSON.stringify(value));
                    appendData += ' <tr>' +
                        '<td>' + num + '</td>' +
                        '<td>' + value.it_name + '</td>' +
                        '<td><button data-id="' + value.id + '" data-toggle="modal" data-name="' + value.it_name + '" data-target="#editIncomeType" class="editITBtn btn btn-default btn-xs"><i class="fa fa-pencil"> </i> Edit</button> &nbsp; &nbsp;' +
                        ' <button data-id="' + value.id + '" data-name="' + value.it_name + '" class="deleteIT btn btn-danger btn-xs"><i class="fa fa-trash"> </i> Delete</button></td>' +
                        '</tr>';
                });
                $(".income-types-list").html(appendData);
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get Income types", "warning");
        });
    }

    this.getAllIncomeTypeList = function () {
        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/incomeType"
        };
        $.ajax(formsSettings).success(function (response) {
            $(".it-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get income types", "warning");
            } else if (response.status == 'success') {
               // console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    //console.log(JSON.stringify(value));
                    appendData += ' <option value="'+ value.id +'">' + value.it_name + '</option>';
                });
                $(".it-list").html(appendData);
                $(".it-list").prepend("<option selected value='0'>Select Income Type</option>");
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get Income types", "warning");
        });
    }
    this.incomeTypeUpdate = function (formdata, it_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/incomeType/update/" + it_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                income.getAllIncomeType();
                //console.log(JSON.stringify(response));
                //$('#addIncomeTypeForm')[0].reset();
                notify('Income type has been updated', 'success');

                // $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Income type has not been updated', 'error');

        });
    }

    this.update = function (formdata, income_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/income/update/" + income_id
        };
        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed" || response.status === "error") {
                notify(response.message, "warning");

            } else {
                income.getAll();
                //income.getById();
                //console.log(JSON.stringify(response));
                //$('#addIncomeTypeForm')[0].reset();
                notify('Income has been updated', 'success');

                // $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Income has not been updated', 'error');

        });
    }
    this.deleteIT = function (it_id) {
        var formSettings = {
            "type": "DELETE",
            //"dataType": "json",
            //"data": formdata,
            "url": "api/incomeType/" + it_id
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
               // user.getAll();
                income.getAllIncomeType();
                notify('Income type has been deleted', 'success');
                // $('.modal').modal('hide');
            }

        }).error(function (response) {
            notify('Income type has not been deleted', 'error');

        });
    }

    this.delete = function (income_id) {
        var formSettings = {
            "type": "DELETE",
            //"dataType": "json",
            //"data": formdata,
            "url": "api/income/" + income_id
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
               // user.getAll();
                income.getAll();
                notify('Income has been deleted', 'success');
                // $('.modal').modal('hide');
            }

        }).error(function (response) {
            notify('Income has not been deleted', 'error');

        });
    }
}