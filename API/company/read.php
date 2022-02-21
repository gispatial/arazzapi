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
include_once '../objects/company.php';
 include_once '../token/validatetoken.php';
// instantiate database and company object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$company = new Company($db);

$company->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$company->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
// read company will be here

// query company
$stmt = $company->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //company array
    $company_arr=array();
	$company_arr["pageno"]=$company->pageNo;
	$company_arr["pagesize"]=$company->no_of_records_per_page;
    $company_arr["total_count"]=$company->total_record_count();
    $company_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $company_item=array(
            
"co_id" => $co_id,
"co_reg_no" => $co_reg_no,
"name" => $name,
"address" => html_entity_decode($address),
"town" => html_entity_decode($town),
"district" => html_entity_decode($district),
"postcode" => $postcode,
"state" => $state,
"geocode" => $geocode,
"pic_url" => $pic_url,
"contact_no" => $contact_no,
"email" => $email
        );
 
        array_push($company_arr["records"], $company_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show company data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "company found","document"=> $company_arr));
    
}else{
 // no company found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no company found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No company found.","document"=> ""));
    
}
 


