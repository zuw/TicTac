<?php
/*
* Start by Bill Rocha [prbr@ymail.com]
* version 0.1 [ 2014.02.06.16.48.0.1.beta ]!
*
*
* Space CONTROLLERS
*/


class Main {


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

    private $config = array(); //node for config (jsonConfig Object)

    /**
     * Constructor
     */
    function __construct(){
    

    }


    //Main access - http://ticall.tk/
    function index() { 
        return(new View('login'))->render();
    }

    //login
    function tic(){
        
        //Set Session
        session_start();
        $_SESSION['id'] = 1;
        $_SESSION['key'] = 'e10adc3949ba59abbe56e057f20f883e';

        $me = new Model\Gamer(1);// test

        //Template instance
        $view = new View('ticall');

        //produce, render and return to Start.
        return $view->render();

    }


    //Ajax
    function ajax(){  

        /*
            Actions:
                1 - inicialize  >> return config);
                2 - clicked ( Col/Row ) >> set new state & return new config;
                3 - wait >> check state: 
                            a - continue in wait;
                            b - change state & return new config;
                4 - timeout >> check & return new config with command "timeout + Gamer";
                5 - abandoned >> check & return new config with command "abandoned + Gamer";   



            Commands:
                -> nosinc : error in Session Key >> reload now!!
                -> wait :   wait for other player... >> wait... 
    



         */
        
        //WARNING!! for TEST ONLY :: DELETEME
        //$_POST['data'] = file_get_contents(PPHP.'config.json');

        if(isset($_POST['data'])) {
            $this->config = json_decode($_POST['data']);
           
           //Check Session
            session_start();
            if(!isset($_SESSION['id']) 
                || !isset($_SESSION['key']) 
                || $_SESSION['id'] != $this->config->myid 
                || $_SESSION['key'] != $this->config->mykey){
                
                $this->config->command = 'nosinc';
                $this->returnJson(true);
            } else {
                //Generate new key
                $_SESSION['key'] = md5(time().$_SESSION['key']);
            }


            //Event "init"  -------------------------------------------------------------
            if($this->config->command == 'init') { 
                $this->config = json_decode(file_get_contents(PPHP.'config.json'));
                
                //Config
                $this->config->myid = $_SESSION['id'];
                $this->config->mykey = $_SESSION['key'];
             
                //Out Json
                $this->returnJson(true);           
            }          

            //Loading the GAME | Carregando o Jogo
            $this->game = new Model\Game($this->config);
            $this->game->updateKey($_SESSION['key']);

            //Players | Jogadores
            
            $this->me = new Model\Gamer($this->config);
            $this->other = new Model\Gamer($this->config, false);

            //TicTac Object
            $this->tictac = new Model\Tictac($this->game, $this->me, $this->other);

            p($this);  //--------------------------------------------------------------------- TODO for nexts!

            //DEVELOP ONLY :: dump
            file_put_contents('teste.txt', print_r($this->config, true));

            





            //EVENT card-click
            if($this->config->command == 'wait') { 

                $act = array();

                foreach ($this->config->tic as $k=>$v) {
                    if($v->active == true) $act[$k] = $v->type;
                }

                //testar se houve ganhador:
                $linha = $this->verificaVencedor($act);
                if($linha) {
                    $this->venceu($linha, 2);
                    $this->returnJson();
                }

                //Passando para outro jogador
                $this->buildConfig($act, 'waitOK');
                $this->returnJson();
            }
        }

    }

    //Cria a configuração para vencedor
    private function venceu($linha, $player){
        $this->config->winner = $player;
        return $this->buildConfig($linha, 'winner');
    }

    //Constroi a configuração baseado em dados ativos
    private function buildConfig($act, $command = 'reload'){

        $config = $this->config;

        $config->command = $command;

        foreach ($this->col as $col) {
            foreach ($this->row as $row) {
                if(isset($act[$col.$row])) {
                    @$config->tic->{$col.$row}->type = $act[$col.$row];
                    @$config->tic->{$col.$row}->active = true;
                } else {
                    @$config->tic->{$col.$row}->type = 'X';
                    @$config->tic->{$col.$row}->active = false;
                }
            }
        }

        $this->config = $config;
    }


    //verifica se ouve um vencedor
    private function verificaVencedor($act){

        foreach ($this->win as $k=>$v) {
            if(isset($act[$v[0]]) && isset($act[$v[1]]) && isset($act[$v[2]])) {
                foreach ($this->win[$k] as $vv) {
                    $o[$vv] = $act[$v[0]];
                }
                return $o;
            }
        }
        return false;
    }


    /**
     * Return Json
     */
    function returnJson($dump = false){
        if($dump) p($this->config, false).p($_SESSION, false);
        exit(json_encode($this->config, JSON_UNESCAPED_SLASHES));
    }
}