<?php
/*
* Start by Bill Rocha [prbr@ymail.com]
* version 0.1 [ 2014.02.06.16.48.beta ]!
*
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


    function index() {

        //Template instance
        $view = new View('ticall');

        //produce, render and return to Start.
        return $view->render(false);

    }


    //Ajax
    function ajax(){  


        if(isset($_POST['data'])) {
            $config = json_decode($_POST['data']);

            file_put_contents('teste.txt', print_r($config, true));

            //EVENT card-click
            if($config->event == 'card-click') {

                $act = array();

                foreach ($config->tic as $k=>$v) {
                    if($v->active == true) $act[$k] = $v->type;
                }

                //testar se houve ganhador:
                $linha = $this->verificaVencedor($act);
                if($linha) exit($this->venceu($linha, 2));

                //Passando para outro jogador
                exit($this->buildConfig($act, 'click-card'));
            }
        }

    }

    //Cria a configuração para vencedor
    private function venceu($linha, $player){
        return $this->buildConfig($linha, 'winner', '"player":"'.$player.'"');
    }

    //Constroi a configuração baseado em dados ativos
    private function buildConfig($act, $command = 'reload', $data = null){
        $out = 'var data = {"command" : "'.$command.'", "tic":{';

        foreach ($this->col as $col) {
            foreach ($this->row as $row) {
                if(isset($act[$col.$row])) $out .= '"'.$col.$row.'" : {"type": '.$act[$col.$row].', "active": true},';
                else $out .= '"'.$col.$row.'" : {"type": 2, "active": false},';
            }            
        }
        $out = substr($out, 0, -1);
        $out .= '}';
        if($data != null) $out .= ', '.$data.' ';
        $out .= '};';

        return $out;
    }


    //verifica se ouve um vencedor
    private function verificaVencedor($act){

        foreach ($this->win as $k=>$v) {
            if(isset($act[$v[1]]) && isset($act[$v[2]]) && isset($act[$v[3]])) {
                return $a[$k];
            }
        }
        return false;
    }
}