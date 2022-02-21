<?php
class Package_Category{
 
    // database connection and table name
    private $conn;
    private $table_name = "package_category";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $category_code;
public $description;
public $prefix;
public $picture_path;
public $show_display;
    
 
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
	
	// read package_category
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.category_code LIKE ? OR t.description LIKE ?  OR t.prefix LIKE ?  OR t.picture_path LIKE ?  OR t.show_display LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.category_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->category_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->category_code = $row['category_code'];
$this->description = $row['description'];
$this->prefix = $row['prefix'];
$this->picture_path = $row['picture_path'];
$this->show_display = $row['show_display'];
	}
	
	// create package_category
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET category_code=:category_code,description=:description,prefix=:prefix,picture_path=:picture_path,show_display=:show_display";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->category_code=htmlspecialchars(strip_tags($this->category_code));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->prefix=htmlspecialchars(strip_tags($this->prefix));
$this->picture_path=htmlspecialchars(strip_tags($this->picture_path));
$this->show_display=htmlspecialchars(strip_tags($this->show_display));
	 
		// bind values
		
$stmt->bindParam(":category_code", $this->category_code);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":prefix", $this->prefix);
$stmt->bindParam(":picture_path", $this->picture_path);
$stmt->bindParam(":show_display", $this->show_display);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the package_category
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET category_code=:category_code,description=:description,prefix=:prefix,picture_path=:picture_path,show_display=:show_display WHERE category_code = :category_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->category_code=htmlspecialchars(strip_tags($this->category_code));
$this->description=htmlspecialchars(strip_tags($this->description));
$this->prefix=htmlspecialchars(strip_tags($this->prefix));
$this->picture_path=htmlspecialchars(strip_tags($this->picture_path));
$this->show_display=htmlspecialchars(strip_tags($this->show_display));
$this->category_code=htmlspecialchars(strip_tags($this->category_code));
	 
		// bind new values
		
$stmt->bindParam(":category_code", $this->category_code);
$stmt->bindParam(":description", $this->description);
$stmt->bindParam(":prefix", $this->prefix);
$stmt->bindParam(":picture_path", $this->picture_path);
$stmt->bindParam(":show_display", $this->show_display);
$stmt->bindParam(":category_code", $this->category_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the package_category
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE category_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->category_code=htmlspecialchars(strip_tags($this->category_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->category_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
