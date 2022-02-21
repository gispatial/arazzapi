<?php
class Menu_Item{
 
    // database connection and table name
    private $conn;
    private $table_name = "menu_item";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $item_id;
public $name;
public $path;
public $page;
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
	
	// read menu_item
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.item_id LIKE ? OR t.name LIKE ?  OR t.path LIKE ?  OR t.page LIKE ?  OR t.enabled LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.item_id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->item_id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->item_id = $row['item_id'];
$this->name = $row['name'];
$this->path = $row['path'];
$this->page = $row['page'];
$this->enabled = $row['enabled'];
	}
	
	// create menu_item
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET name=:name,path=:path,page=:page,enabled=:enabled";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->name=htmlspecialchars(strip_tags($this->name));
$this->path=htmlspecialchars(strip_tags($this->path));
$this->page=htmlspecialchars(strip_tags($this->page));
$this->enabled=htmlspecialchars(strip_tags($this->enabled));
	 
		// bind values
		
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":path", $this->path);
$stmt->bindParam(":page", $this->page);
$stmt->bindParam(":enabled", $this->enabled);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the menu_item
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET name=:name,path=:path,page=:page,enabled=:enabled WHERE item_id = :item_id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->name=htmlspecialchars(strip_tags($this->name));
$this->path=htmlspecialchars(strip_tags($this->path));
$this->page=htmlspecialchars(strip_tags($this->page));
$this->enabled=htmlspecialchars(strip_tags($this->enabled));
$this->item_id=htmlspecialchars(strip_tags($this->item_id));
	 
		// bind new values
		
$stmt->bindParam(":name", $this->name);
$stmt->bindParam(":path", $this->path);
$stmt->bindParam(":page", $this->page);
$stmt->bindParam(":enabled", $this->enabled);
$stmt->bindParam(":item_id", $this->item_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the menu_item
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE item_id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->item_id=htmlspecialchars(strip_tags($this->item_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->item_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
