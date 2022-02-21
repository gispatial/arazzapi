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
include_once '../objects/patient_type.php';
 include_once '../token/validatetoken.php';
// instantiate database and patient_type object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$patient_type = new Patient_Type($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$patient_type->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$patient_type->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query patient_type
$stmt = $patient_type->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //patient_type array
    $patient_type_arr=array();
	$patient_type_arr["pageno"]=$patient_type->pageNo;
	$patient_type_arr["pagesize"]=$patient_type->no_of_records_per_page;
    $patient_type_arr["total_count"]=$patient_type->total_record_count();
    $patient_type_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $patient_type_item=array(
            
"patient_type_code" => $patient_type_code,
"name" => $name,
"min_age" => $min_age,
"max_age" => $max_age
        );
 
        array_push($patient_type_arr["records"], $patient_type_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show patient_type data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "patient_type found","document"=> $patient_type_arr));
    
}else{
 // no patient_type found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no patient_type found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No patient_type found.","document"=> ""));
    
}
 


