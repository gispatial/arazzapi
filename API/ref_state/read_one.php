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
include_once '../objects/ref_state.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare ref_state object
$ref_state = new Ref_State($db);
 
// set ID property of record to read
$ref_state->state_code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of ref_state to be edited
$ref_state->readOne();
 
if($ref_state->state_code!=null){
    // create array
    $ref_state_arr = array(
        
"state_code" => $ref_state->state_code,
"state_name" => $ref_state->state_name
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "ref_state found","document"=> $ref_state_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user ref_state does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "ref_state does not exist.","document"=> ""));
}
?>
