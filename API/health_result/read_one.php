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
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/health_result.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare health_result object
$health_result = new Health_Result($db);
 
// set ID property of record to read
$health_result->refno = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of health_result to be edited
$health_result->readOne();
 
if($health_result->refno!=null){
    // create array
    $health_result_arr = array(
        
"refno" => $health_result->refno,
"result_name" => $health_result->result_name,
"result_value" => $health_result->result_value,
"month" => $health_result->month
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "health_result found","document"=> $health_result_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user health_result does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "health_result does not exist.","document"=> ""));
}
?>
