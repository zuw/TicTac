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


    //TODO User login
    function login(){
    	
    	//TODO: build all...
    	return (new Model\User())->getUserByName('Bill Rocha');

    }
}