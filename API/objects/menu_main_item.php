<?php
class Menu_Main_Item{
 
    // database connection and table name
    private $conn;
    private $table_name = "menu_main_item";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $main_id;
public $item_id;
public $sort_id;
    
 
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
	
	// read menu_main_item
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.main_id LIKE ? OR t.item_id LIKE ?  OR t.sort_id LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind searchKey
		
$stmt->bindParam(1, $searchKey);
$stmt->bindParam(2, $searchKey);
$stmt->bindParam(3, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.main_id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->main_id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->main_id = $row['main_id'];
$this->item_id = $row['item_id'];
$this->sort_id = $row['sort_id'];
	}
	
	// create menu_main_item
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET main_id=:main_id,item_id=:item_id,sort_id=:sort_id";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->main_id=htmlspecialchars(strip_tags($this->main_id));
$this->item_id=htmlspecialchars(strip_tags($this->item_id));
$this->sort_id=htmlspecialchars(strip_tags($this->sort_id));
	 
		// bind values
		
$stmt->bindParam(":main_id", $this->main_id);
$stmt->bindParam(":item_id", $this->item_id);
$stmt->bindParam(":sort_id", $this->sort_id);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the menu_main_item
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET main_id=:main_id,item_id=:item_id,sort_id=:sort_id WHERE main_id = :main_id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->main_id=htmlspecialchars(strip_tags($this->main_id));
$this->item_id=htmlspecialchars(strip_tags($this->item_id));
$this->sort_id=htmlspecialchars(strip_tags($this->sort_id));
$this->main_id=htmlspecialchars(strip_tags($this->main_id));
	 
		// bind new values
		
$stmt->bindParam(":main_id", $this->main_id);
$stmt->bindParam(":item_id", $this->item_id);
$stmt->bindParam(":sort_id", $this->sort_id);
$stmt->bindParam(":main_id", $this->main_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the menu_main_item
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE main_id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->main_id=htmlspecialchars(strip_tags($this->main_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->main_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
