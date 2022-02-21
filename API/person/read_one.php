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
include_once '../objects/person.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare person object
$person = new Person($db);
 
// set ID property of record to read
$person->ic_no = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of person to be edited
$person->readOne();
 
if($person->ic_no!=null){
    // create array
    $person_arr = array(
        
"reg_no" => $person->reg_no,
"name" => html_entity_decode($person->name),
"age" => $person->age,
"ic_no" => $person->ic_no,
"email" => $person->email,
"mobile_no" => $person->mobile_no,
"gender" => $person->gender,
"patient_type_code" => $person->patient_type_code,
"address" => html_entity_decode($person->address),
"town" => $person->town,
"district" => html_entity_decode($person->district),
"postcode" => $person->postcode,
"state" => $person->state,
"photo_path" => html_entity_decode($person->photo_path),
"relationship" => $person->relationship
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "person found","document"=> $person_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user person does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "person does not exist.","document"=> ""));
}
?>
