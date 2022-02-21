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
include_once '../objects/medication_prescription.php';
 include_once '../token/validatetoken.php';
// instantiate database and medication_prescription object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$medication_prescription = new Medication_Prescription($db);

$medication_prescription->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$medication_prescription->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read medication_prescription will be here

// query medication_prescription
$stmt = $medication_prescription->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //medication_prescription array
    $medication_prescription_arr=array();
	$medication_prescription_arr["pageno"]=$medication_prescription->pageNo;
	$medication_prescription_arr["pagesize"]=$medication_prescription->no_of_records_per_page;
    $medication_prescription_arr["total_count"]=$medication_prescription->total_record_count();
    $medication_prescription_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $medication_prescription_item=array(
            
"medication_id" => $medication_id,
"doctor_id" => $doctor_id,
"patient_id" => $patient_id,
"no" => $no,
"date" => $date
        );
 
        array_push($medication_prescription_arr["records"], $medication_prescription_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show medication_prescription data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "medication_prescription found","document"=> $medication_prescription_arr));
    
}else{
 // no medication_prescription found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no medication_prescription found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No medication_prescription found.","document"=> ""));
    
}
 


