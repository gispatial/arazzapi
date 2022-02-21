<?php
class Message_Document{
 
    // database connection and table name
    private $conn;
    private $table_name = "message_document";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $message_id;
public $filename;
public $file_path;
public $date_updated;
    
 
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
	
	// read message_document
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_id LIKE ? OR t.filename LIKE ?  OR t.file_path LIKE ?  OR t.date_updated LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->message_id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->message_id = $row['message_id'];
$this->filename = $row['filename'];
$this->file_path = $row['file_path'];
$this->date_updated = $row['date_updated'];
	}
	
	// create message_document
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET message_id=:message_id,filename=:filename,file_path=:file_path,date_updated=:date_updated";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->message_id=htmlspecialchars(strip_tags($this->message_id));
$this->filename=htmlspecialchars(strip_tags($this->filename));
$this->file_path=htmlspecialchars(strip_tags($this->file_path));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
	 
		// bind values
		
$stmt->bindParam(":message_id", $this->message_id);
$stmt->bindParam(":filename", $this->filename);
$stmt->bindParam(":file_path", $this->file_path);
$stmt->bindParam(":date_updated", $this->date_updated);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the message_document
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET message_id=:message_id,filename=:filename,file_path=:file_path,date_updated=:date_updated WHERE message_id = :message_id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->message_id=htmlspecialchars(strip_tags($this->message_id));
$this->filename=htmlspecialchars(strip_tags($this->filename));
$this->file_path=htmlspecialchars(strip_tags($this->file_path));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->message_id=htmlspecialchars(strip_tags($this->message_id));
	 
		// bind new values
		
$stmt->bindParam(":message_id", $this->message_id);
$stmt->bindParam(":filename", $this->filename);
$stmt->bindParam(":file_path", $this->file_path);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":message_id", $this->message_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the message_document
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE message_id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->message_id=htmlspecialchars(strip_tags($this->message_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->message_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
