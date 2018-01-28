<?php
session_start();
header('Content-type:application/json');

function createParking()
{
    $parking = R::dispense('parking');
    //require all needed elements
    $name_of_place = requiredInPost('name_of_place'); //contact
    $address = requiredInPost('address'); //date
    $password = requiredInPost('password'); //password
    $contact = requiredInPost('contact');
    $longtudes = requiredInPost('longtudes');
    $latitudes = requiredInPost('latitudes');
    $username = requiredInPost('username'); //user_name
    $prices = requiredInPost('prices'); //user_name
    $available = 1; //full_name

    //refined password
    $rehashed = password_hash($password, PASSWORD_DEFAULT);

    findDuplicateUserName($username);
    findDuplicateContact($contact);
    // use redbean to set properties
    $parking->name_of_place = $name_of_place;
    $parking->address = $address;
    $parking->contact = $contact;
    $parking->longtudes = $longtudes;
    $parking->password = $rehashed;
    $parking->latitudes = $latitudes;
    $parking->username = $username;
    $parking->available = $available;
    $parking->prices = $prices;

    
    //store in a database table and return in id variable
    $created = R::store($parking);

    if ($created) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Parking has been registered'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Parking has not been registered'
        ));
        exit();
    }
}

function findDuplicateUserName($username = "")
{
    $parking = R::find('parking', 'username=?', [$username]);

    if (count($parking) > 0) {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Username alreay Exists'
        ));
        exit();
    }
}

function findDuplicateContact($contact = "")
{
    $parking = R::find('parking', 'contact=?', [$contact]);

    if (count($users) > 0) {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Contact alreay Exists'
        ));
        exit();
    }
}

function listParkings()
{
    getAll('parking');
    //$query = "";
    
}
function listParkingsA()
{
    getAllA('parking');
    
}

function getParkingDetails($id = "")
{
    getById('parking', $id);
   
}

function findIfUserExists($id = "")
{
    $parking = R::find('parking', 'id=?', [$id]);

    if (count($parking) == 0 || count($parking) < 0) {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Parking Does not Exist'
        ));
        exit();
    }
}

function updateParkingAvailability($id = '')
{
    findIfUserExists($id);
    $available = 1;


    //findDuplicateUserName($user_name);
    //findDuplicateContact($contact);
    $customQuery = "UPDATE parking SET available = '$available' WHERE id = '$id'";

    $availableUpdated = R::exec($customQuery);
    if ($availableUpdated) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Parking now Available'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Parking status not updated'
        ));
        exit();
    }
}
function updateParkingAvailabilityno($id = '')
{
    findIfUserExists($id);
    $available = 0;


    //findDuplicateUserName($user_name);
    //findDuplicateContact($contact);
    $customQuery = "UPDATE parking SET available = '$available' WHERE id = '$id'";

    $availableUpdated = R::exec($customQuery);
    if ($availableUpdated) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'Parking not Available'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Parking status not updated'
        ));
        exit();
    }
}

function deleteUser($id = "")
{
    $users = R::find('users', 'id=?', [$id]);

    if (count($users) > 0) {
        $customQuery = "UPDATE users SET status = '0'  WHERE id = '$id'";

        $userUpdated = R::exec($customQuery);

        echo json_encode(array(
            'status' => 'success',
            'message' => 'User is Removed'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Failed to delete user'
        ));
        exit();
    }
}


function setPassword($id = '')
{
    findIfUserExists($id);
    $password = requiredInPost('password'); //contact

    $rehashed = password_hash($password, PASSWORD_DEFAULT);

    $customQuery = "UPDATE users SET password = '$rehashed' WHERE id = '$id'";

    $userUpdated = R::exec($customQuery);
    if ($userUpdated) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'User Password Updated'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'User cannot updated user password'
        ));
        exit();
    }
}

function assignBranch($id = '')
{
    findIfUserExists($id);
    $branch = requiredInPost('branch'); //contact

    $customQuery = "UPDATE users SET branch = '$branch' WHERE id = '$id'";

    $userUpdated = R::exec($customQuery);
    if ($userUpdated) {
        echo json_encode(array(
            'status' => 'success',
            'message' => 'User Branch Assigned'
        ));
        exit();
    }
    else {
        echo json_encode(array(
            'status' => 'failed',
            'message' => 'User cannot be assigned branch at the moment'
        ));
        exit();
    }
}

function login()
{
    $username = requiredInPost('username');
    $userpassword = requiredInPost('password');

   // $loginSql = "SELECT * FROM users WHERE user_name ='$user_name' LIMIT 1";
    $result = R::findOne('parking', ' username = ?', [$username]);

    if (!$result) {
        echo json_encode(array(
            'status' => 'error',
            'message' => 'Failed to login'
        ));
        exit();
    }
    else if (count($result) > 0) {

       // $user = $result->fetch_array(MYSQLI_ASSOC);


        if (password_verify($userpassword, $result['password'])) {
            $_SESSION['pra-id'] = $result['id'];
            $_SESSION['pra-username'] = $result['username'];
            $_SESSION['pra-name'] = $result['name_of_place'];
            $_SESSION['pra-address'] = $result['address'];
            $_SESSION['pra-available'] = $result['available'];
            $_SESSION['pra-user_account'] = '1';

            echo json_encode(array(
                'status' => 'success',
                'data' => 'Loggen in as ' . $_SESSION['pra-username']
            ));
            exit();
        }
        else {

            echo json_encode(array(
                'status' => 'failed',
                'message' => 'Password combination or Username do not match'
            ));
            exit();

        }
    }
    else {

        echo json_encode(array(
            'status' => 'failed',
            'message' => 'Username cannot be found'
        ));
        exit();

    }
}








function logout($conn)
{

    $_SESSION = array();
    session_destroy();

    echo json_encode(array(
        'status' => 'success',
        'message' => 'Logged out successfully'
    ));
    exit();



}
?>