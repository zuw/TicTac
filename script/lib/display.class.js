/* DISPLAY space
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace DISPLAY
 */

var DISPLAY = (function () {

    var tictac = {

        construct: function () {

            this.freeze = false;
            this.card = {};
            this.over = null;

            this.enable = function (on) {
                if (typeof on != 'boolean') on = true
                this.freeze = !on;
                this.over.innerHTML = ' ';
                this.over.style.display = (on) ? 'none' : 'block';
            },

            this.notice = function (msg, title) {
                var o = '<div>';
                if (typeof title == 'string') o += '<h1>' + title + '</h1>';
                if (typeof msg == 'string') o += '<p>' + msg + '</p>';
                //alert(o);
                this.over.innerHTML = o + '</div>';
                this.over.style.display = 'block';
            }

            this.restart = function () {
                for (i in this.card) {
                    var type = (CONFIG.tic[i].active) ? CONFIG.tic[i].type : '';
                    this.card[i].className = type;
                    this.card[i].innerHTML = type;
                }
                this.freeze = false;
            },

            this.init = function () {

                //Create TicTac div
                this.tictac = _('tictac');
//                this.tictac = _e('DIV', {
//                    'id': 'tictac',
//                    'class': 'tictac'
//                });

                //Hidded OverDisplay
                this.over = _e('DIV', {
                    'id': 'dspOver',
                    'class': 'dspOver'
                }, 'Teste');

                _ap('container', this.tictac);
                _ap('tictac', this.over);

                for (i in CONFIG.tic) {

                    if (CONFIG.tic[i].active) {
                        this.card[i] = _e("DIV", {
                            'id': i,
                            'class': CONFIG.tic[i].type
                        }, CONFIG.tic[i].type);
                    } else this.card[i] = _e("DIV", i);

                    _ap(this.tictac, this.card[i]); //append card

                    this.card[i].addEventListener('click', function () {

                        if (DISPLAY.TICTAC.freeze) return false;

                        if (this.className != '') return false;

                        this.className = CONFIG.tic[this.id].type;
                        this.innerHTML = CONFIG.tic[this.id].type;
                        CONFIG.tic[this.id].active = true;
                        SOUND.play('click');

                        return CONTROLLER.Main.clicked(this.id);

                    }, false);
                }
                //append Clear element                
                _ap(this.tictac, _e('p', {
                    'class': 'clear'
                }));

            },
            this.init();
        }
    };


    var user = {

        construct: function () {
            this.title = '';
            this.image = '';
            this.contents = '';
            this.class = 'user';

            this.card = [];

            //functions -----------------------------------------------------

            this.reflesh = function () {
                _('userPicture').innerHTML = this.image;
                _('userData').innerHTML = this.title + this.contents; // +
            },

            this.restart = function () {
                this.title = '<h3>' + CONFIG.gamer.name + '</h3>';
                this.image = '<img src="' + CONFIG.gamer.image + '">';
                this.contents = '<p><b>' + CONFIG.gamer.credits + '</b> créditos total</p>'
                    +'<p><b>'+CONFIG.gamer.value+'</b> créditos apostados</p>';
                this.reflesh();
            },

            this.setTitle = function (title) {
                this.title = '<h3>' + title + '</h3>';
                this.reflesh();
            },

            this.setImage = function (image) {
                this.image = '<img src="' + image + '">';
                this.reflesh();
            },

            this.setContents = function (contents) {
                this.contents = contents;
                this.reflesh();
            }

            //insert contents
            this.restart();
        }
    };

    var count = {

        construct: function () {

            this.id = _('timer');

            this.set = function (value) {
                this.id.innerHTML = value;
                this.id.style.display = 'run-in';
            },

            this.clean = function () {
                this.id.innerHTML = '0';
                this.id.style.display = 'none';
            },

            this.setColor = function (color, back) {
                if (!color) color = '#FFF';
                if (!back) back = '#2A4773';
                this.id.style.color = color;
                this.id.style.background = back;
            },

            this.hide = function () {
                this.id.style.display = 'none';
            }

            this.setColor();

        }
    };


    return {
        USER: new user.construct(),
        TICTAC: new tictac.construct(),
        TIMER: new count.construct()
    }
})();