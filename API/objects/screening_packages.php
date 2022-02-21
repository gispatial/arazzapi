<?php
class Screening_Packages{
 
    // database connection and table name
    private $conn;
    private $table_name = "screening_packages";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $package_code;
public $single_package;
public $category_code;
public $picture_path;
public $price;
public $license_validity_year;
public $test_included;
public $note;
public $commercial;
    
 
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
	
	// read screening_packages
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code LIKE ? OR t.single_package LIKE ?  OR t.category_code LIKE ?  OR t.picture_path LIKE ?  OR t.price LIKE ?  OR t.license_validity_year LIKE ?  OR t.test_included LIKE ?  OR t.note LIKE ?  OR t.commercial LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
$stmt->bindParam(4, $searchKey);
$stmt->bindParam(5, $searchKey);
$stmt->bindParam(6, $searchKey);
$stmt->bindParam(7, $searchKey);
$stmt->bindParam(8, $searchKey);
$stmt->bindParam(9, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.package_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->package_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->package_code = $row['package_code'];
$this->single_package = $row['single_package'];
$this->category_code = $row['category_code'];
$this->picture_path = $row['picture_path'];
$this->price = $row['price'];
$this->license_validity_year = $row['license_validity_year'];
$this->test_included = $row['test_included'];
$this->note = $row['note'];
$this->commercial = $row['commercial'];
	}
	
	// create screening_packages
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET package_code=:package_code,single_package=:single_package,category_code=:category_code,picture_path=:picture_path,price=:price,license_validity_year=:license_validity_year,test_included=:test_included,note=:note,commercial=:commercial";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->single_package=htmlspecialchars(strip_tags($this->single_package));
$this->category_code=htmlspecialchars(strip_tags($this->category_code));
$this->picture_path=htmlspecialchars(strip_tags($this->picture_path));
$this->price=htmlspecialchars(strip_tags($this->price));
$this->license_validity_year=htmlspecialchars(strip_tags($this->license_validity_year));
$this->test_included=htmlspecialchars(strip_tags($this->test_included));
$this->note=htmlspecialchars(strip_tags($this->note));
$this->commercial=htmlspecialchars(strip_tags($this->commercial));
	 
		// bind values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":single_package", $this->single_package);
$stmt->bindParam(":category_code", $this->category_code);
$stmt->bindParam(":picture_path", $this->picture_path);
$stmt->bindParam(":price", $this->price);
$stmt->bindParam(":license_validity_year", $this->license_validity_year);
$stmt->bindParam(":test_included", $this->test_included);
$stmt->bindParam(":note", $this->note);
$stmt->bindParam(":commercial", $this->commercial);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the screening_packages
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET package_code=:package_code,single_package=:single_package,category_code=:category_code,picture_path=:picture_path,price=:price,license_validity_year=:license_validity_year,test_included=:test_included,note=:note,commercial=:commercial WHERE package_code = :package_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
$this->single_package=htmlspecialchars(strip_tags($this->single_package));
$this->category_code=htmlspecialchars(strip_tags($this->category_code));
$this->picture_path=htmlspecialchars(strip_tags($this->picture_path));
$this->price=htmlspecialchars(strip_tags($this->price));
$this->license_validity_year=htmlspecialchars(strip_tags($this->license_validity_year));
$this->test_included=htmlspecialchars(strip_tags($this->test_included));
$this->note=htmlspecialchars(strip_tags($this->note));
$this->commercial=htmlspecialchars(strip_tags($this->commercial));
$this->package_code=htmlspecialchars(strip_tags($this->package_code));
	 
		// bind new values
		
$stmt->bindParam(":package_code", $this->package_code);
$stmt->bindParam(":single_package", $this->single_package);
$stmt->bindParam(":category_code", $this->category_code);
$stmt->bindParam(":picture_path", $this->picture_path);
$stmt->bindParam(":price", $this->price);
$stmt->bindParam(":license_validity_year", $this->license_validity_year);
$stmt->bindParam(":test_included", $this->test_included);
$stmt->bindParam(":note", $this->note);
$stmt->bindParam(":commercial", $this->commercial);
$stmt->bindParam(":package_code", $this->package_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the screening_packages
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE package_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->package_code=htmlspecialchars(strip_tags($this->package_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->package_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
