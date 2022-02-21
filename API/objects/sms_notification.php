<?php
class Sms_Notification{
 
    // database connection and table name
    private $conn;
    private $table_name = "sms_notification";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $code;
public $message;
public $params;
public $response_msg_success;
public $response_msg_failed;
    
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

	function total_record_count() {
	$query = "select count(1) as total from ". $this->table_name ."";
	$stmt = $this->conn->prepare($query);
	$stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	return $row['total'];
	}
	
	// read sms_notification
	function read(){
		if(isset($_GET["pageNo"])){
		$this->pageNo=$_GET["pageNo"];
		}
		$offset = ($this->pageNo-1) * $this->no_of_records_per_page; 
		// select all query
		$query = "SELECT  t.* FROM ". $this->table_name ." t  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	//Search table
	function search($searchKey){
		if(isset($_GET["pageNo"])){
		$this->pageNo=$_GET["pageNo"];
		}
		$offset = ($this->pageNo-1) * $this->no_of_records_per_page; 

		// select all query
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.code LIKE ? OR t.message LIKE ?  OR t.params LIKE ?  OR t.response_msg_success LIKE ?  OR t.response_msg_failed LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->code = $row['code'];
$this->message = $row['message'];
$this->params = $row['params'];
$this->response_msg_success = $row['response_msg_success'];
$this->response_msg_failed = $row['response_msg_failed'];
	}
	
	// create sms_notification
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET code=:code,message=:message,params=:params,response_msg_success=:response_msg_success,response_msg_failed=:response_msg_failed";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->code=htmlspecialchars(strip_tags($this->code));
$this->message=htmlspecialchars(strip_tags($this->message));
$this->params=htmlspecialchars(strip_tags($this->params));
$this->response_msg_success=htmlspecialchars(strip_tags($this->response_msg_success));
$this->response_msg_failed=htmlspecialchars(strip_tags($this->response_msg_failed));
	 
		// bind values
		
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":message", $this->message);
$stmt->bindParam(":params", $this->params);
$stmt->bindParam(":response_msg_success", $this->response_msg_success);
$stmt->bindParam(":response_msg_failed", $this->response_msg_failed);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the sms_notification
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET code=:code,message=:message,params=:params,response_msg_success=:response_msg_success,response_msg_failed=:response_msg_failed WHERE code = :code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->code=htmlspecialchars(strip_tags($this->code));
$this->message=htmlspecialchars(strip_tags($this->message));
$this->params=htmlspecialchars(strip_tags($this->params));
$this->response_msg_success=htmlspecialchars(strip_tags($this->response_msg_success));
$this->response_msg_failed=htmlspecialchars(strip_tags($this->response_msg_failed));
$this->code=htmlspecialchars(strip_tags($this->code));
	 
		// bind new values
		
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":message", $this->message);
$stmt->bindParam(":params", $this->params);
$stmt->bindParam(":response_msg_success", $this->response_msg_success);
$stmt->bindParam(":response_msg_failed", $this->response_msg_failed);
$stmt->bindParam(":code", $this->code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the sms_notification
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->code=htmlspecialchars(strip_tags($this->code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
