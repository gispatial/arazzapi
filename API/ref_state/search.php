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
include_once '../objects/ref_state.php';
 include_once '../token/validatetoken.php';
// instantiate database and ref_state object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$ref_state = new Ref_State($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$ref_state->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$ref_state->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query ref_state
$stmt = $ref_state->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //ref_state array
    $ref_state_arr=array();
	$ref_state_arr["pageno"]=$ref_state->pageNo;
	$ref_state_arr["pagesize"]=$ref_state->no_of_records_per_page;
    $ref_state_arr["total_count"]=$ref_state->total_record_count();
    $ref_state_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $ref_state_item=array(
            
"state_code" => $state_code,
"state_name" => $state_name
        );
 
        array_push($ref_state_arr["records"], $ref_state_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show ref_state data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "ref_state found","document"=> $ref_state_arr));
    
}else{
 // no ref_state found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no ref_state found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No ref_state found.","document"=> ""));
    
}
 


