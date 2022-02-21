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
include_once '../objects/medication.php';
 include_once '../token/validatetoken.php';
// instantiate database and medication object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$medication = new Medication($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$medication->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$medication->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query medication
$stmt = $medication->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //medication array
    $medication_arr=array();
	$medication_arr["pageno"]=$medication->pageNo;
	$medication_arr["pagesize"]=$medication->no_of_records_per_page;
    $medication_arr["total_count"]=$medication->total_record_count();
    $medication_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $medication_item=array(
            
"id" => $id,
"name" => $name,
"details" => html_entity_decode($details),
"dosage" => html_entity_decode($dosage)
        );
 
        array_push($medication_arr["records"], $medication_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show medication data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "medication found","document"=> $medication_arr));
    
}else{
 // no medication found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no medication found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No medication found.","document"=> ""));
    
}
 


