<?php
class Message_Box{
 
    // database connection and table name
    private $conn;
    private $table_name = "message_box";
	public $pageNo = 1;
	public  $no_of_records_per_page=30;
    // object properties
	
public $message_id;
public $sender;
public $sender_name;
public $receiver;
public $receiver_name;
public $subject;
public $content;
public $headers;
public $date_sent;
public $message_type_code;
public $status;
public $attachment;
public $message_root_id;
public $latest;
    
 
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
	
	// read message_box
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
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_id LIKE ? OR t.sender LIKE ?  OR t.sender_name LIKE ?  OR t.receiver LIKE ?  OR t.receiver_name LIKE ?  OR t.subject LIKE ?  OR t.content LIKE ?  OR t.headers LIKE ?  OR t.date_sent LIKE ?  OR t.message_type_code LIKE ?  OR t.status LIKE ?  OR t.attachment LIKE ?  OR t.message_root_id LIKE ?  OR t.latest LIKE ?  LIMIT ".$offset." , ". $this->no_of_records_per_page."";
	 
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
$stmt->bindParam(10, $searchKey);
$stmt->bindParam(11, $searchKey);
$stmt->bindParam(12, $searchKey);
$stmt->bindParam(13, $searchKey);
$stmt->bindParam(14, $searchKey);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function readOne(){
	 
		// query to read single record
		$query = "SELECT  t.* FROM ". $this->table_name ." t  WHERE t.message_id = ? LIMIT 0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id
		$stmt->bindParam(1, $this->message_id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		
$this->message_id = $row['message_id'];
$this->sender = $row['sender'];
$this->sender_name = $row['sender_name'];
$this->receiver = $row['receiver'];
$this->receiver_name = $row['receiver_name'];
$this->subject = $row['subject'];
$this->content = $row['content'];
$this->headers = $row['headers'];
$this->date_sent = $row['date_sent'];
$this->message_type_code = $row['message_type_code'];
$this->status = $row['status'];
$this->attachment = $row['attachment'];
$this->message_root_id = $row['message_root_id'];
$this->latest = $row['latest'];
	}
	
	// create message_box
	function create(){
	 
		// query to insert record
		$query ="INSERT INTO ".$this->table_name." SET sender=:sender,sender_name=:sender_name,receiver=:receiver,receiver_name=:receiver_name,subject=:subject,content=:content,headers=:headers,date_sent=:date_sent,message_type_code=:message_type_code,status=:status,attachment=:attachment,message_root_id=:message_root_id,latest=:latest";

		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->sender=htmlspecialchars(strip_tags($this->sender));
$this->sender_name=htmlspecialchars(strip_tags($this->sender_name));
$this->receiver=htmlspecialchars(strip_tags($this->receiver));
$this->receiver_name=htmlspecialchars(strip_tags($this->receiver_name));
$this->subject=htmlspecialchars(strip_tags($this->subject));
$this->content=htmlspecialchars(strip_tags($this->content));
$this->headers=htmlspecialchars(strip_tags($this->headers));
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->attachment=htmlspecialchars(strip_tags($this->attachment));
$this->message_root_id=htmlspecialchars(strip_tags($this->message_root_id));
$this->latest=htmlspecialchars(strip_tags($this->latest));
	 
		// bind values
		
$stmt->bindParam(":sender", $this->sender);
$stmt->bindParam(":sender_name", $this->sender_name);
$stmt->bindParam(":receiver", $this->receiver);
$stmt->bindParam(":receiver_name", $this->receiver_name);
$stmt->bindParam(":subject", $this->subject);
$stmt->bindParam(":content", $this->content);
$stmt->bindParam(":headers", $this->headers);
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":message_type_code", $this->message_type_code);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":attachment", $this->attachment);
$stmt->bindParam(":message_root_id", $this->message_root_id);
$stmt->bindParam(":latest", $this->latest);
	 
		// execute query
		if($stmt->execute()){
			return  $this->conn->lastInsertId();
		}
	 
		return 0;
		 
	}
	
	
	
	// update the message_box
	function update(){
	 
		// update query
		$query ="UPDATE ".$this->table_name." SET sender=:sender,sender_name=:sender_name,receiver=:receiver,receiver_name=:receiver_name,subject=:subject,content=:content,headers=:headers,date_sent=:date_sent,message_type_code=:message_type_code,status=:status,attachment=:attachment,message_root_id=:message_root_id,latest=:latest WHERE message_id = :message_id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		
$this->sender=htmlspecialchars(strip_tags($this->sender));
$this->sender_name=htmlspecialchars(strip_tags($this->sender_name));
$this->receiver=htmlspecialchars(strip_tags($this->receiver));
$this->receiver_name=htmlspecialchars(strip_tags($this->receiver_name));
$this->subject=htmlspecialchars(strip_tags($this->subject));
$this->content=htmlspecialchars(strip_tags($this->content));
$this->headers=htmlspecialchars(strip_tags($this->headers));
$this->date_sent=htmlspecialchars(strip_tags($this->date_sent));
$this->message_type_code=htmlspecialchars(strip_tags($this->message_type_code));
$this->status=htmlspecialchars(strip_tags($this->status));
$this->attachment=htmlspecialchars(strip_tags($this->attachment));
$this->message_root_id=htmlspecialchars(strip_tags($this->message_root_id));
$this->latest=htmlspecialchars(strip_tags($this->latest));
$this->message_id=htmlspecialchars(strip_tags($this->message_id));
	 
		// bind new values
		
$stmt->bindParam(":sender", $this->sender);
$stmt->bindParam(":sender_name", $this->sender_name);
$stmt->bindParam(":receiver", $this->receiver);
$stmt->bindParam(":receiver_name", $this->receiver_name);
$stmt->bindParam(":subject", $this->subject);
$stmt->bindParam(":content", $this->content);
$stmt->bindParam(":headers", $this->headers);
$stmt->bindParam(":date_sent", $this->date_sent);
$stmt->bindParam(":message_type_code", $this->message_type_code);
$stmt->bindParam(":status", $this->status);
$stmt->bindParam(":attachment", $this->attachment);
$stmt->bindParam(":message_root_id", $this->message_root_id);
$stmt->bindParam(":latest", $this->latest);
$stmt->bindParam(":message_id", $this->message_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the message_box
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE message_id = ? ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->message_id=htmlspecialchars(strip_tags($this->message_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->message_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}


?>
