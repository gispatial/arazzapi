<?php
class Company_Document{
 
    // database connection and table name
    private $conn;
    private $table_name = "company_document";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $co_reg_no;
public $document_code;
public $filename;
public $ori_filename;
public $file_path;
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
	
	// read company_document
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.co_reg_no LIKE ? OR t.document_code LIKE ?  OR t.filename LIKE ?  OR t.ori_filename LIKE ?  OR t.file_path LIKE ?  OR t.date_updated LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.co_reg_no = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->co_reg_no);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->co_reg_no = $row['co_reg_no'];
$this->document_code = $row['document_code'];
$this->filename = $row['filename'];
$this->ori_filename = $row['ori_filename'];
$this->file_path = $row['file_path'];
$this->date_updated = $row['date_updated'];
	}
	
	// create company_document
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET co_reg_no=:co_reg_no,document_code=:document_code,filename=:filename,ori_filename=:ori_filename,file_path=:file_path,date_updated=:date_updated";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->co_reg_no=htmlspecialchars(strip_tags($this->co_reg_no));
$this->document_code=htmlspecialchars(strip_tags($this->document_code));
$this->filename=htmlspecialchars(strip_tags($this->filename));
$this->ori_filename=htmlspecialchars(strip_tags($this->ori_filename));
$this->file_path=htmlspecialchars(strip_tags($this->file_path));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
	 
		// bind values
		
$stmt->bindParam(":co_reg_no", $this->co_reg_no);
$stmt->bindParam(":document_code", $this->document_code);
$stmt->bindParam(":filename", $this->filename);
$stmt->bindParam(":ori_filename", $this->ori_filename);
$stmt->bindParam(":file_path", $this->file_path);
$stmt->bindParam(":date_updated", $this->date_updated);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the company_document
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET co_reg_no=:co_reg_no,document_code=:document_code,filename=:filename,ori_filename=:ori_filename,file_path=:file_path,date_updated=:date_updated WHERE co_reg_no = :co_reg_no";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->co_reg_no=htmlspecialchars(strip_tags($this->co_reg_no));
$this->document_code=htmlspecialchars(strip_tags($this->document_code));
$this->filename=htmlspecialchars(strip_tags($this->filename));
$this->ori_filename=htmlspecialchars(strip_tags($this->ori_filename));
$this->file_path=htmlspecialchars(strip_tags($this->file_path));
$this->date_updated=htmlspecialchars(strip_tags($this->date_updated));
$this->co_reg_no=htmlspecialchars(strip_tags($this->co_reg_no));
	 
		// bind new values
		
$stmt->bindParam(":co_reg_no", $this->co_reg_no);
$stmt->bindParam(":document_code", $this->document_code);
$stmt->bindParam(":filename", $this->filename);
$stmt->bindParam(":ori_filename", $this->ori_filename);
$stmt->bindParam(":file_path", $this->file_path);
$stmt->bindParam(":date_updated", $this->date_updated);
$stmt->bindParam(":co_reg_no", $this->co_reg_no);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the company_document
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE co_reg_no = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->co_reg_no=htmlspecialchars(strip_tags($this->co_reg_no));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->co_reg_no);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
