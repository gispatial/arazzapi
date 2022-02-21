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
include_once '../objects/pre_registration.php';
 include_once '../token/validatetoken.php';
// instantiate database and pre_registration object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$pre_registration = new Pre_Registration($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$pre_registration->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$pre_registration->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query pre_registration
$stmt = $pre_registration->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //pre_registration array
    $pre_registration_arr=array();
	$pre_registration_arr["pageno"]=$pre_registration->pageNo;
	$pre_registration_arr["pagesize"]=$pre_registration->no_of_records_per_page;
    $pre_registration_arr["total_count"]=$pre_registration->total_record_count();
    $pre_registration_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $pre_registration_item=array(
            
"seq_reg_no" => $seq_reg_no,
"reg_no" => $reg_no,
"ic_no" => $ic_no,
"name" => $name,
"mobile_no" => $mobile_no,
"email" => $email,
"package_code" => $package_code,
"center_code" => $center_code,
"amount_paid" => $amount_paid,
"payment_no" => $payment_no,
"payment_date" => $payment_date,
"payment_method" => $payment_method,
"date_registered" => $date_registered,
"date_expired" => $date_expired,
"status" => $status,
"company_reg_no" => $company_reg_no
        );
 
        array_push($pre_registration_arr["records"], $pre_registration_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show pre_registration data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "pre_registration found","document"=> $pre_registration_arr));
    
}else{
 // no pre_registration found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no pre_registration found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No pre_registration found.","document"=> ""));
    
}
 


