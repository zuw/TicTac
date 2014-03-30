/* TICTAC space
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace TICTAC
 */

var TICTAC = (function() {
    var tictac = {

        //Construct
        construct: function() {
            //Freeze
            this.enabled = true;

            //array CollRow
            this.coll = ['A', 'B', 'C', 'D', 'E'];
            this.row = ['1', '2', '3', '4', '5'];

            //Types
            this.types = [];
            this.types['normal'] = 2; //0,1,2
            this.types['xtreme'] = 3; //0,1,2,3
            this.types['xxtreme'] = 4; //0,1,2,3,4

            this.cards = [];

            this.create = function(type) {

                //Entering the appropriate class "container"
                var container = document.getElementById('container');
                container.className = type;

                //Loop for ROWs
                for (row = 0; row <= this.types[type]; row++) {

                    //Loop for COLUMNs
                    for (col = 0; col <= this.types[type]; col++) {
                        CollRow = this.coll[col] + this.row[row];

                        //new instance of CARD
                        this.cards[CollRow] = new TICTAC.card(CollRow, CONFIG.tic[CollRow].type, CONFIG.tic[CollRow].active);

                        //show card
                        this.cards[CollRow].show();
                    }
                }
                return true;
            },
            this.reload = function() {
                for (i in this.cards) {
                    this.cards[i].update();
                }
            },

            //Ajax node IO
            this.ajaxIO = function(Id) {
                SOUND.play('click');

                card = Id.id;

                CONFIG.tic[card].active = true;

                var data = {
                    "event": "card-click",
                    "tic": CONFIG.tic,
                    "card": card
                }

                SERVER.ajax(data);
            },

            //GETs / SETs ----------------------------------------------

            //get Enabled
            this.active = function() {
                return this.enabled;
            }
        }
    };

    var card = {

        //Construct
        construct: function(ID, Type, Active) {
            this.id = ID;
            this.type = Type;
            this.active = Active;
            this.node = null;

            this.types = ['', 'O', 'X', 'Z'];

            //Inset Card in DOM
            this.show = function() {
                var cards = document.getElementById("cards");
                if (!cards) return false;

                var clas = 'card';
                if (this.active) clas += ' flipped';

                var div = document.createElement("DIV");
                var att = document.createAttribute("class");
                att.value = "cell";
                div.setAttributeNode(att);

                div.innerHTML = '<div id="' + this.id + '" class="' + clas + '">' +
                    '<figure class="front"></figure>' +
                    '<figure class="back ' + this.types[this.type] + '">' + this.types[this.type] + '</figure>' +
                    '</div>';

                cards.appendChild(div);
                this.node = div;
                return this.insertEvent();
            },

            this.update = function() {
                type = CONFIG.tic[this.id].type;

                clas = (CONFIG.tic[this.id].active) ? "card flipped" : "card";

                this.node.innerHTML = '<div id="' + this.id + '" class="' + clas + '">' +
                    '<figure class="front"></figure>' +
                    '<figure class="back ' + this.types[type] + '">' + this.types[type] + '</figure>' +
                    '</div>';
            }



            //Event insert
            this.insertEvent = function() {
                var a = document.getElementById(this.id);
                a.addEventListener('click', function() {
                    if (!TICALL.active()) return false;
                    if (a.className == "card") a.className = "card flipped";
                    else a.className = "card";

                    return TICALL.ajaxIO(a);
                }, false);
            }

            //GETs / SETs ----------------------------------------------

            //set Type
            this.setType = function(type) {
                this.type = type;
            };

            //set Enable
            this.enable = function(enable) {
                this.active = enable;
            };
        }
    };

    //return public methods
    return {
        //TICTAC
        construct: tictac.construct,
        create: tictac.create,
        active: tictac.active,
        ajaxIO: tictac.ajaxIO,
        watchDog: tictac.watchDog,
        //CARD
        show: card.show,
        enable: card.enable,
        setType: card.setType,
        card: card.construct
    };
})();