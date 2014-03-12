/* Main Javascript File 
 * author http://google.com/+BillRocha
 * date:  2014/02/08
 */

//simplified getElementById.
function _(el) {
    return document.getElementById(el);
}

//TESTE
function send() {
    x = new WATCH.construct();
    //x.uploadFile('file1');

    x.ajax(Config);

    return false;
}


/* Jquery */
$(document).ready(function() {

    //simplified getElementById.
    function _(el) {
        return document.getElementById(el);
    }



    //Initialize TICALL
    TICALL.create('normal');
    var wdog = new WATCH.wconstruct();
    wdog.set(3000);
    wdog.display("timer");
    wdog.init();

});

var Config = {
    A1: {
        type: 1,
        active: false
    },
    B1: {
        type: 2,
        active: false
    },
    C1: {
        type: 3,
        active: false
    },
    D1: {
        type: 2,
        active: false
    },
    E1: {
        type: 1,
        active: false
    },

    A2: {
        type: 1,
        active: false
    },
    B2: {
        type: 2,
        active: true
    },
    C2: {
        type: 0,
        active: false
    },
    D2: {
        type: 2,
        active: false
    },
    E2: {
        type: 1,
        active: false
    },

    A3: {
        type: 1,
        active: false
    },
    B3: {
        type: 2,
        active: false
    },
    C3: {
        type: 3,
        active: false
    },
    D3: {
        type: 2,
        active: false
    },
    E3: {
        type: 1,
        active: false
    },

    A4: {
        type: 1,
        active: false
    },
    B4: {
        type: 2,
        active: false
    },
    C4: {
        type: 3,
        active: false
    },
    D4: {
        type: 2,
        active: false
    },
    E4: {
        type: 1,
        active: false
    },

    A5: {
        type: 1,
        active: false
    },
    B5: {
        type: 2,
        active: false
    },
    C5: {
        type: 3,
        active: false
    },
    D5: {
        type: 2,
        active: false
    },
    E5: {
        type: 1,
        active: false
    }
};