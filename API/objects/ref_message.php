<?php
class Ref_Message{
 
    // database connection and table name
    private $conn;
    private $table_name = "ref_message";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $message_type_code;
public $message_type_desc;
    
 
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
	
	// read ref_message
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_type_code LIKE ? OR t.message_type_desc LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_type_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->message_type_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->message_type_code = $row['message_type_code'];
$this->message_type_desc = $row['message_type_desc'];
	}
	
	// create ref_message
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET message_type_code=:message_type_code,message_type_desc=:message_type_desc";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
$this->message_type_desc=htmlspecialchars(strip_tags($this->message_type_desc));
	 
		// bind values
		
$stmt->bindParam(":message_type_code", $this->message_type_code);
$stmt->bindParam(":message_type_desc", $this->message_type_desc);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the ref_message
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET message_type_code=:message_type_code,message_type_desc=:message_type_desc WHERE message_type_code = :message_type_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
$this->message_type_desc=htmlspecialchars(strip_tags($this->message_type_desc));
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
	 
		// bind new values
		
$stmt->bindParam(":message_type_code", $this->message_type_code);
$stmt->bindParam(":message_type_desc", $this->message_type_desc);
$stmt->bindParam(":message_type_code", $this->message_type_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the ref_message
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE message_type_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->message_type_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
