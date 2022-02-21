<?php
class Add_On_Services{
 
    // database connection and table name
    private $conn;
    private $table_name = "add_on_services";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $add_on_code;
public $name;
public $price;
public $unit;
public $unit_decimal;
public $remark;
public $status;
public $patient_type_code;
public $no_of_patient;
    
 
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
	
	// read add_on_services
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.add_on_code LIKE ? OR t.name LIKE ?  OR t.price LIKE ?  OR t.unit LIKE ?  OR t.unit_decimal LIKE ?  OR t.remark LIKE ?  OR t.status LIKE ?  OR t.patient_type_code LIKE ?  OR t.no_of_patient LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.add_on_code = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->add_on_code);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->add_on_code = $row['add_on_code'];
$this->name = $row['name'];
$this->price = $row['price'];
$this->unit = $row['unit'];
$this->unit_decimal = $row['unit_decimal'];
$this->remark = $row['remark'];
$this->status = $row['status'];
$this->patient_type_code = $row['patient_type_code'];
$this->no_of_patient = $row['no_of_patient'];
	}
	
	// create add_on_services
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET add_on_code=:add_on_code,name=:name,price=:price,unit=:unit,unit_decimal=:unit_decimal,remark=:remark,status=:status,patient_type_code=:patient_type_code,no_of_patient=:no_of_patient";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->add_on_code=htmlspecialchars(strip_tags($this->add_on_code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->price=htmlspecialchars(strip_tags($this->price));
$this->unit=htmlspecialchars(strip_tags($this->unit));
$this->unit_decimal=htmlspecialchars(strip_tags($this->unit_decimal));
$this->remark=htmlspecialchars(strip_tags($this->remark));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->no_of_patient=htmlspecialchars(strip_tags($this->no_of_patient));
	 
		// bind values
		
$stmt->bindParam(":add_on_code", $this->add_on_code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":price", $this->price);
$stmt->bindParam(":unit", $this->unit);
$stmt->bindParam(":unit_decimal", $this->unit_decimal);
$stmt->bindParam(":remark", $this->remark);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":no_of_patient", $this->no_of_patient);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the add_on_services
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET add_on_code=:add_on_code,name=:name,price=:price,unit=:unit,unit_decimal=:unit_decimal,remark=:remark,status=:status,patient_type_code=:patient_type_code,no_of_patient=:no_of_patient WHERE add_on_code = :add_on_code";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->add_on_code=htmlspecialchars(strip_tags($this->add_on_code));
$this->name=htmlspecialchars(strip_tags($this->name));
$this->price=htmlspecialchars(strip_tags($this->price));
$this->unit=htmlspecialchars(strip_tags($this->unit));
$this->unit_decimal=htmlspecialchars(strip_tags($this->unit_decimal));
$this->remark=htmlspecialchars(strip_tags($this->remark));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->patient_type_code=htmlspecialchars(strip_tags($this->patient_type_code));
$this->no_of_patient=htmlspecialchars(strip_tags($this->no_of_patient));
$this->add_on_code=htmlspecialchars(strip_tags($this->add_on_code));
	 
		// bind new values
		
$stmt->bindParam(":add_on_code", $this->add_on_code);
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":price", $this->price);
$stmt->bindParam(":unit", $this->unit);
$stmt->bindParam(":unit_decimal", $this->unit_decimal);
$stmt->bindParam(":remark", $this->remark);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":patient_type_code", $this->patient_type_code);
$stmt->bindParam(":no_of_patient", $this->no_of_patient);
$stmt->bindParam(":add_on_code", $this->add_on_code);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the add_on_services
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE add_on_code = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->add_on_code=htmlspecialchars(strip_tags($this->add_on_code));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->add_on_code);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
