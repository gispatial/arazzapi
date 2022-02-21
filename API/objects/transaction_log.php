<?php
class Transaction_Log{
 
    // database connection and table name
    private $conn;
    private $table_name = "transaction_log";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $id;
public $trans_date;
public $activity;
public $username;
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
	
	// read transaction_log
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.id LIKE ? OR t.trans_date LIKE ?  OR t.activity LIKE ?  OR t.username LIKE ?  OR t.status LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
$this->trans_date = $row['trans_date'];
$this->activity = $row['activity'];
$this->username = $row['username'];
$this->status = $row['status'];
	}
	
	// create transaction_log
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET trans_date=:trans_date,activity=:activity,username=:username,status=:status";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->trans_date=htmlspecialchars(strip_tags($this->trans_date));
$this->activity=htmlspecialchars(strip_tags($this->activity));
$this->username=htmlspecialchars(strip_tags($this->username));
$this->status=htmlspecialchars(strip_tags($this->status));
	 
		// bind values
		
$stmt->bindParam(":trans_date", $this->trans_date);
$stmt->bindParam(":activity", $this->activity);
$stmt->bindParam(":username", $this->username);
$stmt->bindParam(":status", $this->status);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the transaction_log
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET trans_date=:trans_date,activity=:activity,username=:username,status=:status WHERE id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->trans_date=htmlspecialchars(strip_tags($this->trans_date));
$this->activity=htmlspecialchars(strip_tags($this->activity));
$this->username=htmlspecialchars(strip_tags($this->username));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		
$stmt->bindParam(":trans_date", $this->trans_date);
$stmt->bindParam(":activity", $this->activity);
$stmt->bindParam(":username", $this->username);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":id", $this->id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the transaction_log
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
