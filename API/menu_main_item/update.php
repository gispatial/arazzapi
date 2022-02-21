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
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/menu_main_item.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare menu_main_item object
$menu_main_item = new Menu_Main_Item($db);
 
// get id of menu_main_item to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of menu_main_item to be edited
$menu_main_item->main_id = $data->main_id;

if(
!empty($data->main_id)
&&!empty($data->item_id)
&&!empty($data->sort_id)
){
// set menu_main_item property values

$menu_main_item->main_id = $data->main_id;
$menu_main_item->item_id = $data->item_id;
$menu_main_item->sort_id = $data->sort_id;
 
// update the menu_main_item
if($menu_main_item->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the menu_main_item, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update menu_main_item","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update menu_main_item. Data is incomplete.","document"=> ""));
}
?>
