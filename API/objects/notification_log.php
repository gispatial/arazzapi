<?php
class Notification_Log{
 
    // database connection and table name
    private $conn;
    private $table_name = "notification_log";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $notification_id;
public $person_id;
public $date_send;
    
 
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
	
	// read notification_log
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.notification_id LIKE ? OR t.person_id LIKE ?  OR t.date_send LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.ERROR_NOPRIMARYKEYFOUND = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->notification_id = $row['notification_id'];
$this->person_id = $row['person_id'];
$this->date_send = $row['date_send'];
	}
	
	// create notification_log
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET notification_id=:notification_id,person_id=:person_id,date_send=:date_send";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->notification_id=htmlspecialchars(strip_tags($this->notification_id));
$this->person_id=htmlspecialchars(strip_tags($this->person_id));
$this->date_send=htmlspecialchars(strip_tags($this->date_send));
	 
		// bind values
		
$stmt->bindParam(":notification_id", $this->notification_id);
$stmt->bindParam(":person_id", $this->person_id);
$stmt->bindParam(":date_send", $this->date_send);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the notification_log
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET notification_id=:notification_id,person_id=:person_id,date_send=:date_send WHERE ERROR_NOPRIMARYKEYFOUND = :ERROR_NOPRIMARYKEYFOUND";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->notification_id=htmlspecialchars(strip_tags($this->notification_id));
$this->person_id=htmlspecialchars(strip_tags($this->person_id));
$this->date_send=htmlspecialchars(strip_tags($this->date_send));
$this->ERROR_NOPRIMARYKEYFOUND=htmlspecialchars(strip_tags($this->ERROR_NOPRIMARYKEYFOUND));
	 
		// bind new values
		
$stmt->bindParam(":notification_id", $this->notification_id);
$stmt->bindParam(":person_id", $this->person_id);
$stmt->bindParam(":date_send", $this->date_send);
$stmt->bindParam(":ERROR_NOPRIMARYKEYFOUND", $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the notification_log
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE ERROR_NOPRIMARYKEYFOUND = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->ERROR_NOPRIMARYKEYFOUND=htmlspecialchars(strip_tags($this->ERROR_NOPRIMARYKEYFOUND));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->ERROR_NOPRIMARYKEYFOUND);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
