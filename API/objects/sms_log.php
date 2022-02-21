<?php
class Sms_Log{
 
    // database connection and table name
    private $conn;
    private $table_name = "sms_log";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $id;
public $date_sent;
public $mobile_no;
public $message;
public $status;
    
 
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
	
	// read sms_log
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.id LIKE ? OR t.date_sent LIKE ?  OR t.mobile_no LIKE ?  OR t.message LIKE ?  OR t.status LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->id = $row['id'];
$this->date_sent = $row['date_sent'];
$this->mobile_no = $row['mobile_no'];
$this->message = $row['message'];
$this->status = $row['status'];
	}
	
	// create sms_log
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET date_sent=:date_sent,mobile_no=:mobile_no,message=:message,status=:status";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
$this->message=htmlspecialchars(strip_tags($this->message));
$this->status=htmlspecialchars(strip_tags($this->status));
	 
		// bind values
		
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":mobile_no", $this->mobile_no);
$stmt->bindParam(":message", $this->message);
$stmt->bindParam(":status", $this->status);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the sms_log
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET date_sent=:date_sent,mobile_no=:mobile_no,message=:message,status=:status WHERE id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
$this->message=htmlspecialchars(strip_tags($this->message));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":mobile_no", $this->mobile_no);
$stmt->bindParam(":message", $this->message);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":id", $this->id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the sms_log
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
