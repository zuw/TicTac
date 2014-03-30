/* DISPLAY
 * author http://google.com/+BillRocha
 * date:  2014/03/12
 *
 * namespace DISPLAY
 */

var DISPLAY = (function() {

    var splash = {

        //Construct
        construct: function() {

            this.clock

            this.show = false;
            this.title = 'Aguarde . . .';
            this.subtitle = '';
            this.text = '';

            //create
            this.node = document.createElement('DIV');

            //attributes                        
            this.node.setAttribute('id', 'splash');
            this.node.setAttribute('class', 'splash');
            this.node.style.display = 'none';

            //inserting in Html body 
            document.body.appendChild(this.node);

            this.update = function() {
                this.node.innerHTML = '<div><h1>' + this.title + '</h1>' +
                    '<h2>' + this.subtitle + '</h2>' +
                    '<p>' + this.text + '</p></div>';
            },

            //Display ---
            this.show = function(title) {
                if (title) {
                    this.title = title;
                    this.update();
                }
                this.node.style.display = 'block';
            },
            this.hide = function() {
                this.node.style.display = 'none';
            },

            //Modifields ---------
            this.setTitle = function(title) {
                this.title = title;
                this.update();
            },

            this.setSubtitle = function(sub) {
                this.subtitle = sub;
                this.update();
            },

            this.setText = function(text) {
                this.text = text;
                this.update();
            }

            this.update();
        }
    };

    var clock = {
        node: null,
        color: '#999',
        background: '#444',

        create: function() {
            //create
            this.node = document.createElement('DIV');

            //attributes                        
            this.node.setAttribute('id', 'timer');
            this.node.setAttribute('class', 'timer');
            this.node.style.display = 'none';

            //inserting in Html body 
            document.body.appendChild(this.node);
        },

        show: function(value, color, backcolor) {
            if (!this.node) this.create();
            this.node.innerHTML = value;

            if (color) this.color = color;
            if (backcolor) this.background = backcolor;

            var style = this.node.style;
            style.color = this.color;
            style.background = this.background;
            style.display = 'block';
        },

        hide: function() {
            if (!this.node) this.create();
            this.node.style.display = 'none';
        }
    };

    //return public methods
    return {
        construct: splash.construct,
        clockShow: clock.show,
        clockHide: clock.hide,
        create: clock.create
    };
})();