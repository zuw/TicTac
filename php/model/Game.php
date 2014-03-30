<?php
/* Game class 
 * author http://google.com/+BillRocha
 * date:  2014/03/18
 *
 * namespace Model
 */

/*
	TODO:

	*Save new key for the "me" gamer on DESTROY this object. [important]
		-- in each access new key is generated.

 */

namespace Model;
use Neos\Data\Conn as DB;
use Neos\Start\Error;

class Game {
	
	function __construct(&$config){

		$this->config = $config;

		if(!isset($this->config->game)) new Error('Config may invalid.', 'fatal','log');

		$db = new DB('mysql');
		$db->query('SELECT * 
					  FROM GAME 
					 WHERE ID = :id 
					   AND ((USERA = :userId AND KEYA = :key) OR (USERB = :userId AND KEYB = :key))', 
					['id'=>$this->config->game, 
					 'userId'=>$this->config->myid,
					 'key'=>$this->config->mykey]
				);

		$row = $db->getLine(0);

		if($row){
			foreach ($row as $k=>$v) {
				$this->{strtolower($k)} = $v;
			}
			//Get mySign
			if($this->keya == $this->config->mykey){
				$this->config->mysign = 'A';
				$this->config->gamer->id = $this->userb;
				$this->config->gamer->sign = 'B';
			} else {
				$this->config->mysign = 'B';
				$this->config->gamer->id = $this->usera;
				$this->config->gamer->sign = 'A';
			}			

		} else { 
			return new Error('Game not exists!', 'fatal', 'log');
		}
	}

	
	/**
	 * Update the user key
	 */
	function updateKey($newKey){
		$db = new DB();
		$db->query('UPDATE FROM GAME 
							SET KEY'.$this->config->mysign.' = :newkey  
							WHERE ID = '.$this->config->game, ['newkey'=>$newKey]);
		return $this->config->mykey = $newKey;
	}



	/**
	 * Inicial
	 */
	function start(){

	}


	/**
	 * Wait for other . . .
	 */
	function wait(){


	}

	/**
	 * Play
	 */
	function play(){


	}

	/**
	 * Credits
	 */
	function credits(){


	}

	/**
	 * End Game?
	 */
	function endGame(){


	}

	/**
	 * Winner?
	 */
	function winner(){


	}
	
}