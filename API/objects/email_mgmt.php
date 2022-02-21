<?php
class Email_Mgmt{
 
    // database connection and table name
    private $conn;
    private $table_name = "email_mgmt";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $code;
public $title;
public $content;
public $sender;
public $active;
    
 
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
	
	// read email_mgmt
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.code LIKE ? OR t.title LIKE ?  OR t.content LIKE ?  OR t.sender LIKE ?  OR t.active LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
$this->title = $row['title'];
$this->content = $row['content'];
$this->sender = $row['sender'];
$this->active = $row['active'];
	}
	
	// create email_mgmt
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET code=:code,title=:title,content=:content,sender=:sender,active=:active";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->code=htmlspecialchars(strip_tags($this->code));
$this->title=htmlspecialchars(strip_tags($this->title));
$this->content=htmlspecialchars(strip_tags($this->content));
$this->sender=htmlspecialchars(strip_tags($this->sender));
$this->active=htmlspecialchars(strip_tags($this->active));
	 
		// bind values
		
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":title", $this->title);
$stmt->bindParam(":content", $this->content);
$stmt->bindParam(":sender", $this->sender);
$stmt->bindParam(":active", $this->active);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the email_mgmt
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET code=:code,title=:title,content=:content,sender=:sender,active=:active WHERE code = :code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->code=htmlspecialchars(strip_tags($this->code));
$this->title=htmlspecialchars(strip_tags($this->title));
$this->content=htmlspecialchars(strip_tags($this->content));
$this->sender=htmlspecialchars(strip_tags($this->sender));
$this->active=htmlspecialchars(strip_tags($this->active));
$this->code=htmlspecialchars(strip_tags($this->code));
	 
		// bind new values
		
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":title", $this->title);
$stmt->bindParam(":content", $this->content);
$stmt->bindParam(":sender", $this->sender);
$stmt->bindParam(":active", $this->active);
$stmt->bindParam(":code", $this->code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the email_mgmt
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
