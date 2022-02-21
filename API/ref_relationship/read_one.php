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
include_once '../objects/ref_relationship.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare ref_relationship object
$ref_relationship = new Ref_Relationship($db);
 
// set ID property of record to read
$ref_relationship->code = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of ref_relationship to be edited
$ref_relationship->readOne();
 
if($ref_relationship->code!=null){
    // create array
    $ref_relationship_arr = array(
        
"code" => $ref_relationship->code,
"description" => html_entity_decode($ref_relationship->description)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "ref_relationship found","document"=> $ref_relationship_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user ref_relationship does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "ref_relationship does not exist.","document"=> ""));
}
?>
