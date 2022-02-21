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
include_once '../objects/add_on_services.php';
 include_once '../token/validatetoken.php';
// instantiate database and add_on_services object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$add_on_services = new Add_On_Services($db);

$add_on_services->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$add_on_services->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read add_on_services will be here

// query add_on_services
$stmt = $add_on_services->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //add_on_services array
    $add_on_services_arr=array();
	$add_on_services_arr["pageno"]=$add_on_services->pageNo;
	$add_on_services_arr["pagesize"]=$add_on_services->no_of_records_per_page;
    $add_on_services_arr["total_count"]=$add_on_services->total_record_count();
    $add_on_services_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $add_on_services_item=array(
            
"add_on_code" => $add_on_code,
"name" => $name,
"price" => $price,
"unit" => $unit,
"unit_decimal" => $unit_decimal,
"remark" => html_entity_decode($remark),
"status" => $status,
"patient_type_code" => $patient_type_code,
"no_of_patient" => $no_of_patient
        );
 
        array_push($add_on_services_arr["records"], $add_on_services_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show add_on_services data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "add_on_services found","document"=> $add_on_services_arr));
    
}else{
 // no add_on_services found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no add_on_services found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No add_on_services found.","document"=> ""));
    
}
 


