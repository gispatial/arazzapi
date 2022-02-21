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
include_once '../objects/menu_item.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare menu_item object
$menu_item = new Menu_Item($db);
 
// get id of menu_item to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of menu_item to be edited
$menu_item->item_id = $data->item_id;

if(
!empty($data->name)
&&!empty($data->path)
&&!empty($data->page)
&&!empty($data->enabled)
){
// set menu_item property values

$menu_item->name = $data->name;
$menu_item->path = $data->path;
$menu_item->page = $data->page;
$menu_item->enabled = $data->enabled;
 
// update the menu_item
if($menu_item->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the menu_item, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update menu_item","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update menu_item. Data is incomplete.","document"=> ""));
}
?>
