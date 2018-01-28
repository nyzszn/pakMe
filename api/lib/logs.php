<?php
header('Content-type:application/json');

function createLog()
{
    $shift = R::dispense('shifts');
    //require all needed elements
    $shift_name = requiredInPost('shift_name');
    $status = 1;//status


   // use redbean to set properties
    $shift->shift_name = $shift_name;
    $shift->status = $status;



    
    //store in a database table and return in id variable
    $created = R::store($shift);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Shift created'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Shift cannot be created'
        ));
        exit();
    }
}

function getAllShifts(){
    getAll('shifts');
}

function getShiftById($id = "")
{
    getById('shifts', $id);
}



function updateShift($id = "")
{
    findIfRecordExists('shifts', $id);
    $shift_name = requiredInPost('shift_name');

    $customQuery = "UPDATE shifts SET shift_name = '$shift_name' WHERE id = '$id'";

    $update = R::exec($customQuery);
    if ($update) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Shift Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Shift has not been updated'
        ));
        exit();
    }
}

function deleteShift($id=""){
    deleteRecord('shifts', $id);
}


?>