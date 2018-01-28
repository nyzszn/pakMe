$(function () {
    $(".fromDate").datepicker({
        defaultDate: "0d",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat:'yy-mm-dd',
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
        dateFormat:'yy-mm-dd',
        onClose: function (selectedDate) {
        $(".fromDate").datepicker("option", "maxDate", selectedDate);
      // $(".toDate").datepicker.formatDate('yy-mm-dd', selectedDate);
        }
    });

    var branches = new Branches();
    branches.getAll();
    // filter branch income and Expenditure 
    $('#filterFormBranch').submit(function (e) {
        e.preventDefault();
        var dateFrom = $('#filterFormBranch .fromDate').val();
        var dateTo = $('#filterFormBranch .toDate').val();
        var branch_id = $(this).attr('data-id');

        var resultType = $('#filterFormBranch .resultType').val();

        var formdata = {
            "date_from": dateFrom,
            "date_to": dateTo
        };
        // alert(JSON.stringify(formdata));
        if (resultType == '1') {
            //alert('Income');
            branches.searchIncome(formdata, branch_id);
        } else if (resultType == '2') {
            //alert('Expense');
            branches.searchExpense(formdata, branch_id);
        }
        else {
            notify("Please specify Result type.", "warning")
            return false;
        }
        //var user = $('.filter-form .usersOptions').val();;

    });

    $('#addBranchForm').submit(function (e) {
        e.preventDefault();
        var branch_name = $('#addBranchForm .branch_name').val();
        var branch_location = $('#addBranchForm .branch_location').val();
        var formdata = {
            "branch_name": branch_name,
            "branch_location": branch_location,
        };
        branches.create(formdata);
    });

    //.sub-content .moreBranchDetails
    $(document.body).on('click', '.moreBranchDetails', function (e) {
        e.preventDefault();
        // alert("Helo");
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');
        var dataLocation = $(this).attr('data-location');

        // update in new panel
        $('.branch-large .branch_name').text(dataName);
        $('#editBranchForm .branch_name').val(dataName);
        $('.branch-large .branch_location').text(dataLocation);
        $('#editBranchForm .branch_location').val(dataLocation);
        $('#editBranchForm').attr("data-id", dataId);
        $('.branch-large .deleteBranch').attr("data-id", dataId);
        $('.filter-form').attr("data-id", dataId);
        $('.branch-large .deleteBranch').attr("data-name", dataName);
        branches.getIncome(dataId);
    });

    $(document.body).on('click', '.deleteBranch', function (e) {
        e.preventDefault();
        // alert("Helo");
        var dataId = $(this).attr('data-id');
        var dataName = $(this).attr('data-name');

        var branchToDelete = prompt("Type the name of the branch you want to delete to continue");
        if (branchToDelete == dataName) {
            notify(dataName + " branch is being deleted ", "success");
            branches.delete(dataId);
            return true;
        }
        else {
            notify("Branch name provided does not match ", "warning");
            return false;
        }

    });

    $('#editBranchForm').submit(function (e) {
        e.preventDefault();
        var branchId = $(this).attr('data-id');
        var branch_name = $('#editBranchForm .branch_name').val();
        var branch_location = $('#editBranchForm .branch_location').val();
        var formdata = {
            "branch_name": branch_name,
            "branch_location": branch_location,
        };
        branches.update(formdata, branchId);
    });
    $('.onlyAdmin').hide();

});
function curr_date(){
	var date = new Date();
	var year =date.getFullYear();
	var month =date.getMonth()+1;
	var day =date.getDate();
	if(month<10 || month.length<1){
  month = "0"+month;
  }
  if(day<10 || day.length<1){
  day = "0"+day;
  }
	var curr_date = year+"-"+month+"-"+day;
	var from_date = year+"-"+month+"-"+"01";
	var obj={};
	return obj ={
        "curr_date":curr_date,
        "from_date":from_date
    };
}

function Branches() {
    var branch = this;

    this.test = function () {
        //alert('Hello');
    }
    this.getAll = function () {
        var dateOBj = curr_date();
        var formDateData ={
            "date_from":dateOBj.from_date,
            "date_to":dateOBj.curr_date,
        }
        var formsSettings = {
            "type": "POST",
            "data":formDateData,
            "dataType": "json",
            "url": "api/branches"
        };

        $.ajax(formsSettings).success(function (response) {
            $(".sub-content").html("");
            if (response.status == 'failed' || response.status == 'error') {
                $(".sub-content").html("<div class='msg-show'>Cannot get branches</div>")
            } else if (response.status == 'success') {
                var appendData = "";
                //console.log(JSON.stringify(response));
                $.each(response.data, function (key, value) {
                    var tIncome=value.totalI;
                    if(tIncome==null){
                        tIncome=0;
                    }
                    var tExpense=value.totalE;
                    if(tExpense==null){
                        tExpense=0;
                    }
                    var profits=tIncome-tExpense;
                   // console.log(profits);
                    appendData += '<div class="branch">' +
                        '<div class="top">' +
                        '<span class="fa fa-university"></span>' +
                        '<button data-name="' + value.branch_name + '" data-location="' + value.branch_location + '" data-id="' + value.id + '" data-target="#moreBranch" data-toggle="modal" type="button" class="moreBranchDetails btn-xs btn btn-default">More</button>' +
                        '<p class="text-primary">' + value.branch_name + '</p>' +
                        '</div>' +
                        '<div class="bottom">' +
                        '<p class="ta bottom-divider"><span class="pull-left">Total amount </span></span> <span class="text-primary pull-right">UGX '+tIncome+'</span></p>' +
                        '<p class="ex bottom-divider"><span class="pull-left">Expenditure  </span><span class="text-danger pull-right">UGX '+tExpense+'</span></p>' +
                        '<p class="pr"><span class="pull-left">Profits </span><span class="text-success pull-right">UGX '+profits+'</span></p>' +
                        '</div>' +
                        '</div>';
                });
                $(".sub-content").html(appendData);
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            $(".sub-content").html("<div class='msg-show'>Cannot get branches</div>")
        });
    }
    this.getIncome = function (branch_id) {

        var formsSettings = {
            "type": "GET",
            "dataType": "json",
            "url": "api/branch/income/" + branch_id
        };

        //alert(JSON.stringify(formsSettings));

        $.ajax(formsSettings).success(function (response) {
            $(".ex-in-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Branch income data not available", "warning");
                //  $(".sub-content").html("<div class='msg-show'>Cannot get branches</div>")
            } else if (response.status == 'success') {
                console.log(JSON.stringify(response));
                var appendData = "";
                $.each(response.data, function (key, value) {
                    appendData += '<tr>' +
                        '<td>' + value.id + '</td>' +
                        '<td>' + value.date + '</td>' +
                        ' <td>' + value.income_amount + '</td>' +
                        ' <td>' + value.it_name + '</td>' +
                        '<td>' + value.income_description + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '</tr>';
                });
                $(".ex-in-list").html(appendData);
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get branch income data at the moment", "warning");
        });
    }
    this.searchIncome = function (formdata, branch_id) {

        var formsSettings = {
            "type": "POST",
            "data": formdata,
            "dataType": "json",

            "url": "api/branch/income/search/" + branch_id
        };

       // alert(JSON.stringify(formsSettings));

        $.ajax(formsSettings).success(function (response) {
            $(".ex-in-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Branch income data not available", "warning");
                //  $(".sub-content").html("<div class='msg-show'>Cannot get branches</div>")
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response));
                notify("Income data available", "success");
                var appendData = "";
                $.each(response.data, function (key, value) {
                    appendData += '<tr>' +
                        '<td>' + value.id + '</td>' +
                        '<td>' + value.date + '</td>' +
                        ' <td>' + value.income_amount + '</td>' +
                        ' <td>' + value.it_name + '</td>' +
                        '<td>' + value.income_description + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '</tr>';
                });
                $(".ex-in-list").html(appendData);
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get branch income data at the moment", "warning");
        });
    }

    this.searchExpense = function (formdata, branch_id) {

        var formsSettings = {
            "type": "POST",
            "data": formdata,
            "dataType": "json",

            "url": "api/branch/expense/search/" + branch_id
        };

        // alert(JSON.stringify(formsSettings));

        $.ajax(formsSettings).success(function (response) {
            $(".ex-in-list").html("");
            if (response.status == 'failed' || response.status == 'error') {
                notify("Branch Expense data not available", "warning");
                //  $(".sub-content").html("<div class='msg-show'>Cannot get branches</div>")
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response));
                notify("Expense data available", "success");
                /*
                                "id": "3",
            "ex_amount": "3000",
            "ex_description": "Rent and eother stuff",
            "date": "2017-09-21 14:53:38",
            "et_name": "Monthly Payment",
            "branch_name": "Nabbingo",
            "full_name": "Macon"
                */
                var appendData = "";
                $.each(response.data, function (key, value) {
                    appendData += '<tr>' +
                        '<td>' + value.id + '</td>' +
                        '<td>' + value.date + '</td>' +
                        ' <td>' + value.ex_amount + '</td>' +
                        ' <td>' + value.et_name + '</td>' +
                        '<td>' + value.ex_description + '</td>' +
                        '<td>' + value.full_name + '</td>' +
                        '</tr>';
                });
                $(".ex-in-list").html(appendData);
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get branch Expense data at the moment", "warning");
        });
    }

    this.create = function (formdata) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/branch"
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                branch.getAll();
                $('#addBranchForm')[0].reset();
                notify('Branch has been added', 'success');

                $(".modal").modal("hide");
            }

        }).error(function (response) {
            notify('Branch has not been added', 'error');

        });
    }
    this.update = function (formdata, branch_id) {
        var formSettings = {
            "type": "POST",
            //"dataType": "json",
            "data": formdata,
            "url": "api/branch/update/" + branch_id
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                branch.getAll();
                //update title and location
                $('.branch-large .branch_name').text(formdata.branch_name + " Branch");
                $('.branch-large .branch_location').text(formdata.branch_location);
                notify('Branch has been updated', 'success');
            }

        }).error(function (response) {
            notify('Branch has not been updated', 'error');

        });
    }

    this.delete = function (branch_id) {
        var formSettings = {
            "type": "DELETE",
            //"dataType": "json",
            //"data": formdata,
            "url": "api/branch/" + branch_id
        };

        $.ajax(formSettings).success(function (response) {
            if (response.status === "failed") {
                notify(response.message, "warning");

            } else {
                branch.getAll();
                //update title and location
                notify('Branch has been deleted', 'success');
                $('.modal').modal('hide');
            }

        }).error(function (response) {
            notify('Branch has not been deleted', 'error');

        });
    }
    this.getTotalIncome = function(formdata){
        var formsSettings = {
            "type": "POST",
            "data": formdata,
            "dataType": "json",

            "url": "api/income/total"
        };

       //console.log(JSON.stringify(formsSettings));

        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Branch Income data not available", "warning");
            } else if (response.status == 'success') {
               // console.log(JSON.stringify(response.data[0].totalI));
             //return response.data;
              
            }
        }).error(function (response) {
            console.log(JSON.stringify(response));
            notify("Cannot get branch Income data at the moment", "warning");
        });
    }
}