<?php
class Test_Marker{
 
    // database connection and table name
    private $conn;
    private $table_name = "test_marker";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $test_panel_code;
public $code;
public $name;
public $description;
public $unit;
public $data_format;
    
 
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
	
	// read test_marker
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_panel_code LIKE ? OR t.code LIKE ?  OR t.name LIKE ?  OR t.description LIKE ?  OR t.unit LIKE ?  OR t.data_format LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.test_panel_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->test_panel_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->test_panel_code = $row['test_panel_code'];
$this->code = $row['code'];
$this->name = $row['name'];
$this->description = $row['description'];
$this->unit = $row['unit'];
$this->data_format = $row['data_format'];
	}
	
	// create test_marker
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET test_panel_code=:test_panel_code,code=:code,name=:name,description=:description,unit=:unit,data_format=:data_format";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->code=htmlspecialchars(strip_tags($this->code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->unit=htmlspecialchars(strip_tags($this->unit));
$this->data_format=htmlspecialchars(strip_tags($this->data_format));
	 
		// bind values
		
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":unit", $this->unit);
$stmt->bindParam(":data_format", $this->data_format);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the test_marker
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET test_panel_code=:test_panel_code,code=:code,name=:name,description=:description,unit=:unit,data_format=:data_format WHERE test_panel_code = :test_panel_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->code=htmlspecialchars(strip_tags($this->code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->unit=htmlspecialchars(strip_tags($this->unit));
$this->data_format=htmlspecialchars(strip_tags($this->data_format));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
	 
		// bind new values
		
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":code", $this->code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":unit", $this->unit);
$stmt->bindParam(":data_format", $this->data_format);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the test_marker
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE test_panel_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->test_panel_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
