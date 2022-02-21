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
include_once '../objects/package_patient.php';
 include_once '../token/validatetoken.php';
// instantiate database and package_patient object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$package_patient = new Package_Patient($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$package_patient->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$package_patient->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query package_patient
$stmt = $package_patient->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //package_patient array
    $package_patient_arr=array();
	$package_patient_arr["pageno"]=$package_patient->pageNo;
	$package_patient_arr["pagesize"]=$package_patient->no_of_records_per_page;
    $package_patient_arr["total_count"]=$package_patient->total_record_count();
    $package_patient_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $package_patient_item=array(
            
"package_code" => $package_code,
"patient_type_code" => $patient_type_code,
"total_patient" => $total_patient,
"doc_required" => html_entity_decode($doc_required)
        );
 
        array_push($package_patient_arr["records"], $package_patient_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show package_patient data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "package_patient found","document"=> $package_patient_arr));
    
}else{
 // no package_patient found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no package_patient found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No package_patient found.","document"=> ""));
    
}
 


