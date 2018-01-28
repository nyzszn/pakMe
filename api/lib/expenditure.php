<?php
header('Content-type:application/json');

function addExpenditure()
{
    $expenditure = R::dispense('expenditure');
    //require all needed elements
    $ex_type = requiredInPost('ex_type');
    $ex_amount = requiredInPost('ex_amount');
    $ex_description = requiredInPost('ex_description');
    date_default_timezone_set('Africa/Kampala');
    $dateCreated = date('Y-m-d H:i:s'); //date
    $branch = requiredInPost('branch');
    $user = requiredInPost('user');
    $status = 1;//status


   // use redbean to set properties
    $expenditure->ex_type = $ex_type;
    $expenditure->ex_amount = $ex_amount;
    $expenditure->ex_description = $ex_description;
    $expenditure->date = $dateCreated;
    $expenditure->branch = $branch;
    $expenditure->user = $user;
    $expenditure->status = $status;



    
    //store in a database table and return in id variable
    $created = R::store($expenditure);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Expenditure added'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Expenditure cannot be added'
        ));
        exit();
    }
}

function getAllExpenditure()
{
    //getAll('expenditure');
    $result = R::getAll("SELECT e.id, e.ex_amount, e.ex_description, e.date, t.et_name, b.branch_name, u.full_name FROM expenditure e LEFT JOIN extype t ON e.ex_type= t.id LEFT JOIN branches b ON b.id = e.branch LEFT JOIN users u ON u.id = e.user WHERE e.status = '1'");
    
            if (count($result) > 0) {
                echo json_encode(array(
                    'status' => 'success',
                    'data' => array_reverse($result)
                ));
                exit();
            }
            else {
                echo json_encode(array(
                    'status' => 'failed',
                    'message' => 'Expense data is not available'
                ));
                exit();
            }
}

function getExpenditureById($id = "")
{
    getById('expenditure', $id);
}



function updateExpenditure($id = "")
{
    findIfRecordExists('expenditure', $id);
//require all needed elements
    $ex_amount = requiredInPost('ex_amount');
    $ex_description = requiredInPost('ex_description');
    $ex_type = requiredInPost('ex_type');

    $customQuery = "UPDATE expenditure SET ex_type = '$ex_type', ex_amount = '$ex_amount', ex_description = '$ex_description' WHERE id = '$id'";

    $update = R::exec($customQuery);
    if ($update) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Expenditure Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Expenditure has not been updated'
        ));
        exit();
    }
}

function deleteExpenditure($id = "")
{
    deleteRecord('expenditure', $id);
}

function searchExpense()
{
    if (isset($_POST['user']) && $_POST['user'] !=0){
        $user = "= ".$_POST['user'];
    }else{
        $user ='!=0';
    }


        $date1 = requiredInPost('date_from');
        $date2 = requiredInPost('date_to');

        $date2 = $date2.' 23:59:59.999999';
 

    $query ="SELECT  e.id, e.ex_amount, e.ex_description, e.date, t.et_name, b.branch_name, u.full_name FROM expenditure e INNER JOIN extype t ON e.ex_type= t.id INNER JOIN branches b ON b.id = e.branch INNER JOIN users u ON u.id = e.user ";
    $query .= "WHERE ";
    $query .= "e.user  $user AND ";
    $query .= "e.date  BETWEEN '$date1' AND '$date2' AND ";
    $query .= "e.status='1'";

    $result = R::getAll($query);
    
    if (count($result) > 0) {
        echo json_encode(array(
        'status' => 'success',
        'data' => array_reverse($result)
        ));
        exit();
    } else {
        echo json_encode(array(
        'status' => 'failed',
        'message' => 'Expense data is not available'
        ));
        exit();
    }
}

function totalExpenseByBranch()
{

        $date1 = requiredInPost('date_from');
        $date2 = requiredInPost('date_to');
        $branch = requiredInPost('branch');

        $date2 = $date2.' 23:59:59.999999';
 

    $query ="SELECT  SUM(e.ex_amount) AS totalX FROM expenditure e INNER JOIN extype t ON e.ex_type= t.id INNER JOIN branches b ON b.id = e.branch INNER JOIN users u ON u.id = e.user ";
    $query .= "WHERE ";
    $query .="e.branch = '$branch' AND ";
    $query .= "e.date  BETWEEN '$date1' AND '$date2' AND ";
    $query .= "e.status='1'";

    $result = R::getAll($query);
    
    if (count($result) > 0) {
        echo json_encode(array(
        'status' => 'success',
        'data' => array_reverse($result)
        ));
        exit();
    } else {
        echo json_encode(array(
        'status' => 'failed',
        'message' => 'Expense data is not available'
        ));
        exit();
    }
}


?>