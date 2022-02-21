<?php
// required headers
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("HTTP/1.1 200 OK");
die();
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../objects/registration_person.php';
 include_once '../token/validatetoken.php';
// instantiate database and registration_person object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$registration_person = new Registration_Person($db);

$registration_person->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$registration_person->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read registration_person will be here

// query registration_person
$stmt = $registration_person->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //registration_person array
    $registration_person_arr=array();
	$registration_person_arr["pageno"]=$registration_person->pageNo;
	$registration_person_arr["pagesize"]=$registration_person->no_of_records_per_page;
    $registration_person_arr["total_count"]=$registration_person->total_record_count();
    $registration_person_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $registration_person_item=array(
            
"reg_no" => $reg_no,
"ic_no" => $ic_no,
"username" => $username,
"person_type_code" => $person_type_code,
"admin_type" => $admin_type,
"patient_type_code" => $patient_type_code
        );
 
        array_push($registration_person_arr["records"], $registration_person_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show registration_person data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "registration_person found","document"=> $registration_person_arr));
    
}else{
 // no registration_person found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no registration_person found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No registration_person found.","document"=> ""));
    
}
 


