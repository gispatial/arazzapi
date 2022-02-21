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
include_once '../objects/registration.php';
 include_once '../token/validatetoken.php';
// instantiate database and registration object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$registration = new Registration($db);

$registration->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$registration->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read registration will be here

// query registration
$stmt = $registration->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //registration array
    $registration_arr=array();
	$registration_arr["pageno"]=$registration->pageNo;
	$registration_arr["pagesize"]=$registration->no_of_records_per_page;
    $registration_arr["total_count"]=$registration->total_record_count();
    $registration_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $registration_item=array(
            
"package_code" => $package_code,
"amount_fee" => $amount_fee,
"main_account_id" => $main_account_id,
"date_registered" => $date_registered,
"date_expired" => $date_expired
        );
 
        array_push($registration_arr["records"], $registration_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show registration data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "registration found","document"=> $registration_arr));
    
}else{
 // no registration found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no registration found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No registration found.","document"=> ""));
    
}
 


