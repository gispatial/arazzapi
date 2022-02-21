<?php
class Test_Result{
 
    // database connection and table name
    private $conn;
    private $table_name = "test_result";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $patient_ic_no;
public $reg_no;
public $booking_no;
public $test_date;
public $test_panel_code;
public $test_marker_code;
public $test_value;
public $source;
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
	
	// read test_result
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.patient_ic_no LIKE ? OR t.reg_no LIKE ?  OR t.booking_no LIKE ?  OR t.test_date LIKE ?  OR t.test_panel_code LIKE ?  OR t.test_marker_code LIKE ?  OR t.test_value LIKE ?  OR t.source LIKE ?  OR t.date_updated LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.patient_ic_no = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->patient_ic_no);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->patient_ic_no = $row['patient_ic_no'];
$this->reg_no = $row['reg_no'];
$this->booking_no = $row['booking_no'];
$this->test_date = $row['test_date'];
$this->test_panel_code = $row['test_panel_code'];
$this->test_marker_code = $row['test_marker_code'];
$this->test_value = $row['test_value'];
$this->source = $row['source'];
$this->date_updated = $row['date_updated'];
	}
	
	// create test_result
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET patient_ic_no=:patient_ic_no,reg_no=:reg_no,booking_no=:booking_no,test_date=:test_date,test_panel_code=:test_panel_code,test_marker_code=:test_marker_code,test_value=:test_value,source=:source,date_updated=:date_updated";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->patient_ic_no=htmlspecialchars(strip_tags($this->patient_ic_no));
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->booking_no=htmlspecialchars(strip_tags($this->booking_no));
$this->test_date=htmlspecialchars(strip_tags($this->test_date));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->test_marker_code=htmlspecialchars(strip_tags($this->test_marker_code));
$this->test_value=htmlspecialchars(strip_tags($this->test_value));
$this->source=htmlspecialchars(strip_tags($this->source));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
	 
		// bind values
		
$stmt->bindParam(":patient_ic_no", $this->patient_ic_no);
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":booking_no", $this->booking_no);
$stmt->bindParam(":test_date", $this->test_date);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":test_marker_code", $this->test_marker_code);
$stmt->bindParam(":test_value", $this->test_value);
$stmt->bindParam(":source", $this->source);
$stmt->bindParam(":date_updated", $this->date_updated);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the test_result
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET patient_ic_no=:patient_ic_no,reg_no=:reg_no,booking_no=:booking_no,test_date=:test_date,test_panel_code=:test_panel_code,test_marker_code=:test_marker_code,test_value=:test_value,source=:source,date_updated=:date_updated WHERE patient_ic_no = :patient_ic_no";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->patient_ic_no=htmlspecialchars(strip_tags($this->patient_ic_no));
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->booking_no=htmlspecialchars(strip_tags($this->booking_no));
$this->test_date=htmlspecialchars(strip_tags($this->test_date));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->test_marker_code=htmlspecialchars(strip_tags($this->test_marker_code));
$this->test_value=htmlspecialchars(strip_tags($this->test_value));
$this->source=htmlspecialchars(strip_tags($this->source));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->patient_ic_no=htmlspecialchars(strip_tags($this->patient_ic_no));
	 
		// bind new values
		
$stmt->bindParam(":patient_ic_no", $this->patient_ic_no);
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":booking_no", $this->booking_no);
$stmt->bindParam(":test_date", $this->test_date);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":test_marker_code", $this->test_marker_code);
$stmt->bindParam(":test_value", $this->test_value);
$stmt->bindParam(":source", $this->source);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":patient_ic_no", $this->patient_ic_no);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the test_result
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE patient_ic_no = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->patient_ic_no=htmlspecialchars(strip_tags($this->patient_ic_no));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->patient_ic_no);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
