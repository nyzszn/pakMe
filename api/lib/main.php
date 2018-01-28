<?php
header('Content-type:application/json');
function test()
{
	echo json_encode(array(
		'status' => 'success',
		'message' => 'Welcome, The PRA Api is up and running '
	));
	exit();
}
function isescape($elem = '')
{
	$conn = connect_db();
	if (isset($_POST[$elem]) && !empty($_POST[$elem]))
		{
		$elem = mysqli_real_escape_string($conn, $_POST[$elem]);
		return $elem;
	}
	else
		{
		echo json_encode(array(
			'status' => 'error',
			'message' => $elem . ' is not provided'
		));
		exit();
	}
}
function requiredInPost($elem = '')
{
	if (isset($_POST[$elem]) && !empty($_POST[$elem]))
		{
		$elem = $_POST[$elem];
		return $elem;
	}
	else
		{
		echo json_encode(array(
			'status' => 'error',
			'message' => $elem . ' is required'
		));
		exit();
	}
}


function uploadPhoto($file = '', $upload_dir = '')
{

	$check = getimagesize($_FILES[$file]["tmp_name"]);
	if ($check !== false)
		{

		$tmp_file = $_FILES[$file]['tmp_name'];
		$target_file = basename($_FILES[$file]['name']);

		$location = "";
		if (file_exists($upload_dir . "/" . $target_file))
			{
			$random_digits = rand(0000, 9999);
			$target_file = basename($random_digits . $target_file);
			if (copy($tmp_file, $upload_dir . "/" . $target_file))
				{
				$location = $target_file;
				return $location;
			}
		}
		else
			{
					//moving uploaded file
			if (move_uploaded_file($tmp_file, $upload_dir . "/" . $target_file))
				{
				$location = $target_file;

				return $location;
			}


		}



	}
	else
		{
		echo json_encode(array(
			'status' => 'error',
			'message' => 'Image can\'t be uploaded'
		));
		exit();
	}
}

function uploadDocument($file = '', $upload_dir = '')
{

	$check = filesize($_FILES[$file]["tmp_name"]);
	if ($check !== false)
		{

		$tmp_file = $_FILES[$file]['tmp_name'];
		$target_file = basename($_FILES[$file]['name']);

		$location = "";
		if (file_exists($upload_dir . "/" . $target_file))
			{
			$random_digits = rand(0000, 9999);
			$target_file = basename($random_digits . $target_file);
			if (copy($tmp_file, $upload_dir . "/" . $target_file))
				{
				$location = $target_file;
				return $location;
			}
		}
		else
			{
					//moving uploaded file
			if (move_uploaded_file($tmp_file, $upload_dir . "/" . $target_file))
				{
				$location = $target_file;

				return $location;
			}


		}



	}
	else
		{
		echo json_encode(array(
			'status' => 'error',
			'message' => 'File can\'t be uploaded'
		));
		exit();
	}
}


function val_dob($dob)
{
	$val_dob = explode('/', $dob);
	if (count($val_dob) == 3)
		{
		if (!checkdate($val_dob[0], $val_dob[1], $val_dob[2]))
			{
			$errors['date'] = "Invalid date,Please provide a valid date";
		}

		else
			{
			$dob = date('Y-m-d', strtotime(str_replace('-', '/', $dob)));
			return $dob;
		}
	}
}

function getAll($table = "")
{

	$result = R::findAll($table);

	//	$customQuery = "SELECT * FROM  $table WHERE status = '1'  ORDER BY id DESC ";

	//$result = R::exec($customQuery);
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
			'message' => $table . 's are not available'
		));
		exit();
	}
}
function getAllA($table = "")
{
	$query = "SELECT * FROM parking WHERE available='1'";
	$result = R::findAll($query);

	//$qry = "SELECT * FROM  $table WHERE available = '1'  ORDER BY id DESC ";

	//$result = R::exec($qry);
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
			'message' => $table . 's are not available'
		));
		exit();
	}
}

function getById($table = "", $id = "")
{
	$result = R::findOne($table, ' id = ? ', [$id]);
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
			'message' => $table . ' is not Found '
		));
		exit();
	}
}

function findIfRecordExists($table = "", $id = "")
{
	$result = R::find($table, 'id=?', [$id]);

	if (count($result) == 0 || count($result) < 0) {
		echo json_encode(array(
			'status' => 'failed',
			'message' => $table . ' is not found'
		));
		exit();
	}
}

function deleteRecord($table = "", $id = "")
{
	findIfRecordExists($table, $id);


	$customQuery = "UPDATE $table SET status = '0'  WHERE id = '$id'";

	$updated = R::exec($customQuery);
	if ($updated) {
		echo json_encode(array(
			'status' => 'success',
			'message' => $table . ' is deleted'
		));
		exit();
	}
	else {
		echo json_encode(array(
			'status' => 'failed',
			'message' => 'Failed to delete ' . $table
		));
		exit();
	}
}

?>