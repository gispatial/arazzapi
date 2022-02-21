<?php
class Test_Panel{
 
    // database connection and table name
    private $conn;
    private $table_name = "test_panel";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $panel_id;
public $test_panel_code;
public $name;
public $description;
public $input_type;
    
 
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
	
	// read test_panel
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.panel_id LIKE ? OR t.test_panel_code LIKE ?  OR t.name LIKE ?  OR t.description LIKE ?  OR t.input_type LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.panel_id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->panel_id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->panel_id = $row['panel_id'];
$this->test_panel_code = $row['test_panel_code'];
$this->name = $row['name'];
$this->description = $row['description'];
$this->input_type = $row['input_type'];
	}
	
	// create test_panel
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET test_panel_code=:test_panel_code,name=:name,description=:description,input_type=:input_type";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->input_type=htmlspecialchars(strip_tags($this->input_type));
	 
		// bind values
		
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":input_type", $this->input_type);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the test_panel
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET test_panel_code=:test_panel_code,name=:name,description=:description,input_type=:input_type WHERE panel_id = :panel_id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->input_type=htmlspecialchars(strip_tags($this->input_type));
$this->panel_id=htmlspecialchars(strip_tags($this->panel_id));
	 
		// bind new values
		
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":input_type", $this->input_type);
$stmt->bindParam(":panel_id", $this->panel_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the test_panel
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE panel_id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->panel_id=htmlspecialchars(strip_tags($this->panel_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->panel_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
