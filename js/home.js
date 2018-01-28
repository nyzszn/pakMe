$(function () {
    var app = new App();
    app.init();
});

function App() {
    this.init = function () {
        var branch = new Branch();
        var user = new User();
        branch.getIE();
        user.getIE();
        
    }

}
//custom functions
function Branch() {
    var branch = this;
    this.getIE = function () {
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
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get Branch Data", "warning");
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response.data));
                
                var branchLabel=[];
                var dataSetData=[];
                var ds =[];
                var gg="";
                var gg2="";
                var color=[];
                var color2=[];
                var dsd =[];
                var dsd2 =[];
                var totalBranches =[];
                $.each(response.data, function(key, value){
                   totalBranches.push(key);
                    branchLabel.push(value.branch_name);
                    //(139, 195, 74, 0.73)
                   // var opacity =key+1;
                   // var cc = parseInt(opacity-key);
                    color.push("rgba(139, 195, 74, 0.5)");
                    color2.push("rgba(240, 99, 36, 0.5)");
                    var xx = parseInt(value.totalI);
                    var xx2 = parseInt(value.totalE);
                    dsd.push(xx);
                    dsd2.push(xx2);
                    gg={
                        label:'Income',
                        data:dsd,
                        //type: 'line',
                        backgroundColor:color
                    }
                    gg2={
                        label:'Expense',
                        data:dsd2,
                        //type: 'line',
                        backgroundColor:color2
                    }

                });
                var totalIncome= dsd.reduce(getSum);
                var totalExpense= dsd2.reduce(getSum);
                var tBN = totalBranches.length;
                //alert(tBN);
                $('.nob').text(tBN+" Branch(es)");
                $('.ttBIncome').text("UGX "+totalIncome.toLocaleString());
                $('.ttBExpense').text("UGX "+totalExpense.toLocaleString());
                $('.ttBProfit').text("UGX "+(totalIncome-totalExpense).toLocaleString());
               // alert(totalBranches);
                function getSum(total, num){
                    return total+num;
                }
                ds.push(gg,gg2);
              // console.log(JSON.stringify(ds));
                branch.chart(branchLabel, ds);
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify("Cannot get Branch Data", "warning");
        });
    }
    /*
        {
		"branch_name": "Bitfle",
		"totalI": "1836000",
		"totalE": "902000"
	}
    */
    this.chart = function (bLabel, dataSetData) {
        //labels of branches
        //amount income of this month
        //amount expense of this month
        var data = {
            labels: bLabel,
            datasets: dataSetData
        }
        var options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
        
            title:{
                display:true,
                text:'Income and Expenditure Per Branch'
            },
            legend:{
                position:'right',
                display:'true',
                labels:{

                },
                layout:{
                    
                },
                tooltips:{

                }
            }
        }
        var branchLG = document.getElementById("biec").getContext('2d');
        
        var lineChart = new Chart(branchLG, {
            type: 'line', // line, horizonal, pie, and many more
            data,
            options
        });
    }
}
function User() {
    var user = this;
    this.getIE = function () {
        var dateOBj = curr_date();
        var formDateData = {
            "date_from": dateOBj.from_date,
            "date_to": dateOBj.curr_date,
        }
        var formsSettings = {
            "type": "POST",
            "data": formDateData,
            "dataType": "json",
            "url": "api/income/user"
        };

        $.ajax(formsSettings).success(function (response) {
            if (response.status == 'failed' || response.status == 'error') {
                notify("Cannot get User Data", "warning");
            } else if (response.status == 'success') {
                //console.log(JSON.stringify(response.data));
                
                var userLabel=[];
                var dataSetData=[];
                var ds =[];
                var gg="";
                var gg2="";
                var color=[];
                var color2=[];
                var dsd =[];
                var dsd2 =[];
                var totalUsers =[];
                //var eom =[];
                $.each(response.data, function(key, value){

                    totalUsers.push(key);
                    userLabel.push(value.full_name);
                    //(139, 195, 74, 0.73)
                   // var opacity =key+1;
                   // var cc = parseInt(opacity-key);
                    color.push("rgba(139, 195, 74, 0.5)");
                    color2.push("rgba(240, 99, 36, 0.5)");
                    var xx = parseInt(value.totalI);
                    var xx2 = parseInt(value.totalE);
                    dsd.push(xx);
                    dsd2.push(xx2);
                    gg={
                        label:'Income',
                        data:dsd,
                        backgroundColor:color
                    }
                    gg2={
                        label:'Expense',
                        data:dsd2,
                        backgroundColor:color2
                        
                    }

                });
               // var totalIncome= dsd.reduce(getSum);
               // var totalExpense= dsd2.reduce(getSum);
                var tBN = totalUsers.length;
                $('.nou').text(tBN+" User(s)");
                $('.eom').html("");
               $('.eom').html(userLabel[0]+" <i class='icon-large fa fa-check-circle'> </i>");
               // $('.ttBExpense').text("UGX "+totalExpense.toLocaleString());
               // $('.ttBProfit').text("UGX "+(totalIncome-totalExpense).toLocaleString());
               // alert(totalBranches);
                function getSum(total, num){
                    return total+num;
                }
                ds.push(gg,gg2);
                //console.log("This one ::::: "+JSON.stringify(ds));
                user.chart(userLabel, ds);
            }
        }).error(function (response) {
            // console.log(JSON.stringify(response));
            notify("Cannot get User Data", "warning");
        });
    }
    /*
        {
		"branch_name": "Bitfle",
		"totalI": "1836000",
		"totalE": "902000"
	}
    */
    this.chart = function (bLabel, dataSetData) {
        //labels of branches
        //amount income of this month
        //amount expense of this month
        var data = {
            labels: bLabel,
            datasets: dataSetData
        }
        var options = {
            title:{
                display:true,
                text:'Income and Expenditure Per User'
            },
            legend:{
                position:'right',
                display:'true',
                labels:{

                },
                layout:{
                    
                },
                tooltips:{

                }
            }
        }
        var branchLG = document.getElementById("uiec").getContext('2d');
        //        scaleBeginAtZero : true
        var lineChart = new Chart(branchLG, {
            type: 'bar', // line, horizonal, pie, and many more
            data,
            options
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
