<?php
class Document_Upload{
 
    // database connection and table name
    private $conn;
    private $table_name = "document_upload";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $package_category;
public $code;
public $name;
public $note;
public $sort_id;
public $enabled;
    
 
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
	
	// read document_upload
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_category LIKE ? OR t.code LIKE ?  OR t.name LIKE ?  OR t.note LIKE ?  OR t.sort_id LIKE ?  OR t.enabled LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
$stmt->bindParam(6, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_category = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->package_category);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->package_category = $row['package_category'];
$this->code = $row['code'];
$this->name = $row['name'];
$this->note = $row['note'];
$this->sort_id = $row['sort_id'];
$this->enabled = $row['enabled'];
	}
	
	// create document_upload
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET package_category=:package_category,code=:code,name=:name,note=:note,sort_id=:sort_id,enabled=:enabled";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_category=htmlspecialchars(strip_tags($this->package_category));
$this->code=htmlspecialchars(strip_tags($this->code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->note=htmlspecialchars(strip_tags($this->note));
$this->sort_id=htmlspecialchars(strip_tags($this->sort_id));
$this->enabled=htmlspecialchars(strip_tags($this->enabled));
	 
		// bind values
		
$stmt->bindParam(":package_category", $this->package_category);
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":note", $this->note);
$stmt->bindParam(":sort_id", $this->sort_id);
$stmt->bindParam(":enabled", $this->enabled);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the document_upload
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET package_category=:package_category,code=:code,name=:name,note=:note,sort_id=:sort_id,enabled=:enabled WHERE package_category = :package_category";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_category=htmlspecialchars(strip_tags($this->package_category));
$this->code=htmlspecialchars(strip_tags($this->code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->note=htmlspecialchars(strip_tags($this->note));
$this->sort_id=htmlspecialchars(strip_tags($this->sort_id));
$this->enabled=htmlspecialchars(strip_tags($this->enabled));
$this->package_category=htmlspecialchars(strip_tags($this->package_category));
	 
		// bind new values
		
$stmt->bindParam(":package_category", $this->package_category);
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":note", $this->note);
$stmt->bindParam(":sort_id", $this->sort_id);
$stmt->bindParam(":enabled", $this->enabled);
$stmt->bindParam(":package_category", $this->package_category);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the document_upload
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE package_category = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->package_category=htmlspecialchars(strip_tags($this->package_category));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->package_category);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
