<?php
/* Gamer class 
 * author http://google.com/+BillRocha
 * date:  2014/03/19
 *
 * namespace Model
 */

namespace Model;
use Neos\Data\Conn as DB;

class Gamer{

	private $id = 0;
	private $name = '';
	private $image = '';
	private $sign = 'A';
	private $credits = 0;
	
	function __construct($config, $me = true){

		if($me){
			$this->id = $config->myid;
			$this->sign = $config->mysign;
		} else {
			$this->id = $config->gamer->id;
			$this->sign = $config->gamer->sign;
		}

		$db = new DB('mysql');
		$db->query('SELECT * FROM USER WHERE ID = :id',['id'=>$this->id]);

		$row = $db->getLine(0);

		if($row){
			$this->id = $row->ID;
			$this->name = $row->NAME;
			$this->image = $row->IMAGE;
			$this->credits = $row->CREDIT;
		}
	}



}