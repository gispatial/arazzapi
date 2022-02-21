<?php
class Content_Mgmt{
 
    // database connection and table name
    private $conn;
    private $table_name = "content_mgmt";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $id;
public $name;
public $content;
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
	
	// read content_mgmt
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.id LIKE ? OR t.name LIKE ?  OR t.content LIKE ?  OR t.date_updated LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
$this->name = $row['name'];
$this->content = $row['content'];
$this->date_updated = $row['date_updated'];
	}
	
	// create content_mgmt
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET name=:name,content=:content,date_updated=:date_updated";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->name=htmlspecialchars(strip_tags($this->name));
$this->content=htmlspecialchars(strip_tags($this->content));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
	 
		// bind values
		
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":content", $this->content);
$stmt->bindParam(":date_updated", $this->date_updated);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the content_mgmt
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET name=:name,content=:content,date_updated=:date_updated WHERE id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->name=htmlspecialchars(strip_tags($this->name));
$this->content=htmlspecialchars(strip_tags($this->content));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":content", $this->content);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":id", $this->id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the content_mgmt
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
