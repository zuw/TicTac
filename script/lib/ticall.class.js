/* TICALL class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace TICALL
 */

var TICALL = (function() {

    //init
    var ticall = {};

    //Freeze
    ticall.enabled = true;

    //array CollRow
    ticall.coll = ['A', 'B', 'C', 'D', 'E'];
    ticall.row = ['1', '2', '3', '4', '5'];

    //Config -- this configaration is loaded from Ajax PHP
    ticall.Config = {
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

    //Types
    ticall.types = [];
    ticall.types['normal'] = 2; //0,1,2
    ticall.types['xtreme'] = 3; //0,1,2,3
    ticall.types['xxtreme'] = 4; //0,1,2,3,4

    ticall.create = function(type) {

        //Entering the appropriate class "container"
        var container = document.getElementById('container');
        container.className = type;

        //Loop for ROWs
        for (row = 0; row <= ticall.types[type]; row++) {

            //Loop for COLUMNs
            for (col = 0; col <= ticall.types[type]; col++) {
                CollRow = ticall.coll[col] + ticall.row[row];

                //new instance of CARD
                tcard = new CARD.construct(CollRow, ticall.Config[CollRow].type, ticall.Config[CollRow].active);

                //show card
                tcard.show();
            }
        }
        return true;
    }

    //Ajax node IO
    ticall.ajaxIO = function(Id) {
        alert(Id.id);
    }

    //WatchDog
    ticall.watchDog = function() {
        _('status').innerHTML = 'Timeout - new';
    }

    //GETs / SETs ----------------------------------------------

    //get Enabled
    ticall.active = function() {
        return ticall.enabled;
    }

    //return public methods
    return {
        create: ticall.create,
        active: ticall.active,
        ajaxIO: ticall.ajaxIO,
        watchDog: ticall.watchDog
    };
})();