<?php
class Notification{
 
    // database connection and table name
    private $conn;
    private $table_name = "notification";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $id;
public $email_title;
public $email_content;
public $sms_content;
    
 
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
	
	// read notification
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.id LIKE ? OR t.email_title LIKE ?  OR t.email_content LIKE ?  OR t.sms_content LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
	 
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
$this->email_title = $row['email_title'];
$this->email_content = $row['email_content'];
$this->sms_content = $row['sms_content'];
	}
	
	// create notification
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET email_title=:email_title,email_content=:email_content,sms_content=:sms_content";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->email_title=htmlspecialchars(strip_tags($this->email_title));
$this->email_content=htmlspecialchars(strip_tags($this->email_content));
$this->sms_content=htmlspecialchars(strip_tags($this->sms_content));
	 
		// bind values
		
$stmt->bindParam(":email_title", $this->email_title);
$stmt->bindParam(":email_content", $this->email_content);
$stmt->bindParam(":sms_content", $this->sms_content);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the notification
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET email_title=:email_title,email_content=:email_content,sms_content=:sms_content WHERE id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->email_title=htmlspecialchars(strip_tags($this->email_title));
$this->email_content=htmlspecialchars(strip_tags($this->email_content));
$this->sms_content=htmlspecialchars(strip_tags($this->sms_content));
$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		
$stmt->bindParam(":email_title", $this->email_title);
$stmt->bindParam(":email_content", $this->email_content);
$stmt->bindParam(":sms_content", $this->sms_content);
$stmt->bindParam(":id", $this->id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the notification
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
