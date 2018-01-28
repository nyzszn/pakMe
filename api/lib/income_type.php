<?php
header('Content-type:application/json');

function addIncomeType()
{
    $incometype = R::dispense('incometype');
    //require all needed elements
    $it_name = requiredInPost('it_name');
    $status = 1;//status


   // use redbean to set properties
    $incometype->it_name = $it_name;
    $incometype->status = $status;



    
    //store in a database table and return in id variable
    $created = R::store($incometype);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Income Type added'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Income Type cannot be added'
        ));
        exit();
    }
}

function getAllIncomeType()
{
    getAll('incometype');
}

function getIncomeTypeById($id = "")
{
    getById('incometype', $id);
}



function updateIncomeType($id = "")
{
    findIfRecordExists('incometype', $id);
//require all needed elements
    $it_name = requiredInPost('it_name');
   
    $customQuery = "UPDATE incometype SET it_name = '$it_name' WHERE id = '$id'";

    $update = R::exec($customQuery);
    if ($update) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Income Type Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Income Type has not been updated'
        ));
        exit();
    }
}

function deleteIncomeType($id = "")
{
    deleteRecord('incometype', $id);
}
