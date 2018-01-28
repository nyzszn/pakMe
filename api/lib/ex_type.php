<?php
header('Content-type:application/json');

function addExType()
{
    $extype = R::dispense('extype');
    //require all needed elements
    $et_name = requiredInPost('et_name');
    $status = 1;//status


   // use redbean to set properties
    $extype->et_name = $et_name;
    $extype->status = $status;



    
    //store in a database table and return in id variable
    $created = R::store($extype);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Expenditure Type added'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Expenditure Type cannot be added'
        ));
        exit();
    }
}

function getAllExType()
{
    getAll('extype');
}

function getExTypeById($id = "")
{
    getById('extype', $id);
}



function updateExType($id = "")
{
    findIfRecordExists('extype', $id);
//require all needed elements
    $et_name = requiredInPost('et_name');
   
    $customQuery = "UPDATE extype SET et_name = '$et_name' WHERE id = '$id'";

    $update = R::exec($customQuery);
    if ($update) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Expenditure Type Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Expenditure Type has not been updated'
        ));
        exit();
    }
}

function deleteExType($id = "")
{
    deleteRecord('extype', $id);
}
