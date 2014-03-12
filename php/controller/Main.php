<?php
/*
* Start by Bill Rocha [prbr@ymail.com]
* version 0.1 [ 2014.02.06.16.48.beta ]!
*
*/
class Main {

    function index() {

        //Template instance
        $view = new View('ticall');

        //produce, render and return to Start.
        return $view->render(false);

    }


    //Ajax upload
    function upload(){

        if(isset($_POST['data'])) {
            p(json_decode($_POST['data']));
        }

        p($_POST, false);
        p($_FILES);

    }
}