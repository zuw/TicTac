/* Card class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace CARD
 */

var CARD = (function() {
    var card = {

        id: 'A1',
        type: 1,
        active: false,

        //Construct
        construct: function(ID, Type, Active) {
            this.id = ID;
            this.type = Type;
            this.active = Active;

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
                return this.insertEvent();
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
    }
    //return public methods
    return {
        show: card.show,
        enable: card.enable,
        setType: card.setType,
        construct: card.construct
    };
})();