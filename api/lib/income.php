<?php
header('Content-type:application/json');

function addIncome()
{
    $income = R::dispense('income');
    //require all needed elements
    $income_type = requiredInPost('income_type');
    $income_amount = requiredInPost('income_amount');
    $income_description = requiredInPost('income_description');
    date_default_timezone_set('Africa/Kampala');
    $dateCreated = date('Y-m-d H:i:s'); //date
    $branch = requiredInPost('branch');
    $user = requiredInPost('user');
    $status = 1;//status


   // use redbean to set properties
    $income->income_type = $income_type;
    $income->income_amount = $income_amount;
    $income->income_description = $income_description;
    $income->date = $dateCreated;
    $income->branch = $branch;
    $income->user = $user;
    $income->status = $status;



    
    //store in a database table and return in id variable
    $created = R::store($income);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Income added'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Income cannot be added'
        ));
        exit();
    }
}

function getAllIncome()
{
    //getAll('income');


    $result = R::getAll("SELECT i.id, i.income_amount, i.income_description, i.date, t.it_name, b.branch_name, u.full_name FROM income i INNER JOIN incometype t ON i.income_type= t.id INNER JOIN branches b ON b.id = i.branch INNER JOIN users u ON u.id = i.user WHERE i.status='1' ORDER BY i.id DESC");

    if (count($result) > 0) {
        echo json_encode(array(
            'status' => 'success',
            'data' => $result
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'income data is not available'
        ));
        exit();
    }
}

function getIncomeById($id = "")
{
    getById('income', $id);
}



function updateIncome($id = "")
{
    findIfRecordExists('income', $id);
//require all needed elements
    $income_type = requiredInPost('income_type');
    $income_amount = requiredInPost('income_amount');
    $income_description = requiredInPost('income_description');
    $customQuery = "UPDATE income SET income_type = '$income_type', income_amount = '$income_amount', income_description = '$income_description' WHERE id = '$id'";

    $update = R::exec($customQuery);
    if ($update) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Income Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Income has not been updated'
        ));
        exit();
    }
}

function deleteIncome($id = "")
{
    deleteRecord('income', $id);
}

function totalIcomeByBranch()
{
    $date1 = requiredInPost('date_from');
    $date2 = requiredInPost('date_to');
    $branch = requiredInPost('branch');
    $date2 = $date2 . ' 23:59:59.999999';


    $query = "SELECT SUM(i.income_amount) AS totalI FROM income i INNER JOIN incometype t ON i.income_type= t.id INNER JOIN branches b ON b.id = i.branch INNER JOIN users u ON u.id = i.user ";
    $query .= "WHERE ";
    $query .="i.branch = '$branch' AND ";
    $query .= "i.date  BETWEEN '$date1' AND '$date2' AND ";
    $query .= "i.status='1'";

    $result = R::getAll($query);

    if (count($result) > 0) {
        echo json_encode(array(
            'status' => 'success',
            'data' => $result
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'income data is not available'
        ));
        exit();
    }
}
// filter income by type
function searchIncome($branch_id)
{
    if (isset($_POST['user']) && $_POST['user'] != 0) {
        $user = "= " . $_POST['user'];
    }
    else {
        $user = '!=0';
    }


    $date1 = requiredInPost('date_from');
    $date2 = requiredInPost('date_to');

    $date2 = $date2 . ' 23:59:59.999999';


    $query = "SELECT i.id, i.income_amount, i.income_description, i.date, t.it_name, b.branch_name, u.full_name FROM income i INNER JOIN incometype t ON i.income_type= t.id INNER JOIN branches b ON b.id = i.branch INNER JOIN users u ON u.id = i.user ";
    $query .= "WHERE ";
    $query .= "i.user  $user AND ";
    $query .= "i.date  BETWEEN '$date1' AND '$date2' AND ";
    $query .= "i.status='1'";

    $result = R::getAll($query);

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
            'message' => 'income data is not available'
        ));
        exit();
    }
}

?>