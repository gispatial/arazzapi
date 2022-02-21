<?php
class Booking{
 
    // database connection and table name
    private $conn;
    private $table_name = "booking";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $booking_no;
public $patient_ic_no;
public $reg_no;
public $test_panel_code;
public $status;
public $booking_date;
public $date_submitted;
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
	
	// read booking
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.booking_no LIKE ? OR t.patient_ic_no LIKE ?  OR t.reg_no LIKE ?  OR t.test_panel_code LIKE ?  OR t.status LIKE ?  OR t.booking_date LIKE ?  OR t.date_submitted LIKE ?  OR t.date_updated LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.booking_no = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->booking_no);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->booking_no = $row['booking_no'];
$this->patient_ic_no = $row['patient_ic_no'];
$this->reg_no = $row['reg_no'];
$this->test_panel_code = $row['test_panel_code'];
$this->status = $row['status'];
$this->booking_date = $row['booking_date'];
$this->date_submitted = $row['date_submitted'];
$this->date_updated = $row['date_updated'];
	}
	
	// create booking
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET booking_no=:booking_no,patient_ic_no=:patient_ic_no,reg_no=:reg_no,test_panel_code=:test_panel_code,status=:status,booking_date=:booking_date,date_submitted=:date_submitted,date_updated=:date_updated";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->booking_no=htmlspecialchars(strip_tags($this->booking_no));
$this->patient_ic_no=htmlspecialchars(strip_tags($this->patient_ic_no));
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->booking_date=htmlspecialchars(strip_tags($this->booking_date));
$this->date_submitted=htmlspecialchars(strip_tags($this->date_submitted));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
	 
		// bind values
		
$stmt->bindParam(":booking_no", $this->booking_no);
$stmt->bindParam(":patient_ic_no", $this->patient_ic_no);
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":booking_date", $this->booking_date);
$stmt->bindParam(":date_submitted", $this->date_submitted);
$stmt->bindParam(":date_updated", $this->date_updated);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the booking
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET booking_no=:booking_no,patient_ic_no=:patient_ic_no,reg_no=:reg_no,test_panel_code=:test_panel_code,status=:status,booking_date=:booking_date,date_submitted=:date_submitted,date_updated=:date_updated WHERE booking_no = :booking_no";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->booking_no=htmlspecialchars(strip_tags($this->booking_no));
$this->patient_ic_no=htmlspecialchars(strip_tags($this->patient_ic_no));
$this->reg_no=htmlspecialchars(strip_tags($this->reg_no));
$this->test_panel_code=htmlspecialchars(strip_tags($this->test_panel_code));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->booking_date=htmlspecialchars(strip_tags($this->booking_date));
$this->date_submitted=htmlspecialchars(strip_tags($this->date_submitted));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->booking_no=htmlspecialchars(strip_tags($this->booking_no));
	 
		// bind new values
		
$stmt->bindParam(":booking_no", $this->booking_no);
$stmt->bindParam(":patient_ic_no", $this->patient_ic_no);
$stmt->bindParam(":reg_no", $this->reg_no);
$stmt->bindParam(":test_panel_code", $this->test_panel_code);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":booking_date", $this->booking_date);
$stmt->bindParam(":date_submitted", $this->date_submitted);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":booking_no", $this->booking_no);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the booking
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE booking_no = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->booking_no=htmlspecialchars(strip_tags($this->booking_no));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->booking_no);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
