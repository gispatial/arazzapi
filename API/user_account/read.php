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
include_once '../objects/user_account.php';
 include_once '../token/validatetoken.php';
// instantiate database and user_account object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$user_account = new User_Account($db);

$user_account->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$user_account->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read user_account will be here

// query user_account
$stmt = $user_account->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //user_account array
    $user_account_arr=array();
	$user_account_arr["pageno"]=$user_account->pageNo;
	$user_account_arr["pagesize"]=$user_account->no_of_records_per_page;
    $user_account_arr["total_count"]=$user_account->total_record_count();
    $user_account_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $user_account_item=array(
            
"reg_no" => $reg_no,
"username" => $username,
"password" => $password,
"name" => html_entity_decode($name),
"ic_no" => $ic_no,
"email" => html_entity_decode($email),
"acc_type_code" => $acc_type_code,
"menu_owner" => $menu_owner,
"acc_status_code" => $acc_status_code,
"date_created" => $date_created,
"date_updated" => $date_updated,
"last_login" => $last_login
        );
 
        array_push($user_account_arr["records"], $user_account_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show user_account data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "user_account found","document"=> $user_account_arr));
    
}else{
 // no user_account found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no user_account found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No user_account found.","document"=> ""));
    
}
 


