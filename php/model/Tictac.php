<?php
/* Tictac class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace Model
 */

namespace Model;

class Tictac{

	private $win = array(['A1','B1','C1'], 
                         ['A2','B2','C2'],
                         ['A3','B3','C3'],
                         ['A1','A2','A3'],
                         ['B1','B2','B3'],
                         ['C1','C2','C3'],
                         ['A1','B2','C3'],
                         ['A3','B2','C1']);

    private $col = array('A','B','C');
    private $row = array(1,2,3);

    private $gamer = 'X';
    private $config = [];
	
	function __construct(Game $game, Gamer $me, Gamer $other){
		$this->game = $game;
		$this->me = $me;
		$this->other = $other;
	}


	/**
	 * Venceu?
	 */
	function winner(){

		return 'array($type, $this->win[0])';
	}

	/**
	 * configBuilder
	 */
	function builder(){

		return 'array[new config]';
	}

	

}