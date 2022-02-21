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
include_once '../objects/patient_bak.php';
 include_once '../token/validatetoken.php';
// instantiate database and patient_bak object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$patient_bak = new Patient_Bak($db);

$patient_bak->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$patient_bak->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read patient_bak will be here

// query patient_bak
$stmt = $patient_bak->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //patient_bak array
    $patient_bak_arr=array();
	$patient_bak_arr["pageno"]=$patient_bak->pageNo;
	$patient_bak_arr["pagesize"]=$patient_bak->no_of_records_per_page;
    $patient_bak_arr["total_count"]=$patient_bak->total_record_count();
    $patient_bak_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $patient_bak_item=array(
            
"refno" => $refno,
"name" => html_entity_decode($name),
"age" => $age,
"ic_no" => $ic_no,
"email" => $email,
"mobile_no" => $mobile_no,
"gender" => $gender,
"type" => $type,
"address" => html_entity_decode($address),
"town" => $town,
"district" => html_entity_decode($district),
"postcode" => $postcode,
"state" => $state
        );
 
        array_push($patient_bak_arr["records"], $patient_bak_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show patient_bak data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "patient_bak found","document"=> $patient_bak_arr));
    
}else{
 // no patient_bak found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no patient_bak found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No patient_bak found.","document"=> ""));
    
}
 


