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
include_once '../objects/company.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare company object
$company = new Company($db);
 
// set ID property of record to read
$company->co_id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of company to be edited
$company->readOne();
 
if($company->co_id!=null){
    // create array
    $company_arr = array(
        
"co_id" => $company->co_id,
"co_reg_no" => $company->co_reg_no,
"name" => $company->name,
"address" => html_entity_decode($company->address),
"town" => html_entity_decode($company->town),
"district" => html_entity_decode($company->district),
"postcode" => $company->postcode,
"state" => $company->state,
"geocode" => $company->geocode,
"pic_url" => $company->pic_url,
"contact_no" => $company->contact_no,
"email" => $company->email
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "company found","document"=> $company_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user company does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "company does not exist.","document"=> ""));
}
?>
