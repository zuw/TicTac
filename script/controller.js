/* CONTROLLERS class 
 * author http://google.com/+BillRocha
 * date:  2014/03/12
 *
 * namespace CONTROLLER
 */

var CONTROLLER = (function () {

    //Controller Main :: initialized in "load" window.
    var Main = {

        //Construct
        construct: function () {

            this.status = 'init';
            this.timer = null;

            this.initialize = function () {
                //SOUND.play('final');
                DISPLAY.TICTAC.enable();
                this.timer = TIMER.add('inicial', 16, true, CONTROLLER.Main.timeOut);
            },

            this.timeOut = function () {
                SOUND.play('timeout');
                SOUND.play('final');
                //DISPLAY.TIMER.hide();
                //DISPLAY.USER.setTitle('TEMPO')
                //DISPLAY.USER.setContents('<p class="notice">esgotado!</p>')
                //DISPLAY.USER.show();
            },

            this.clicked = function (cardId) {
                //DISPLAY.TICTAC.enable(false);
                TIMER.destroy(this.timer.name);

                //display: "wait for other gammer!"
                DISPLAY.TICTAC.notice('wait for other gammer...', 'Please!');
                   //DISPLAY.USER.setContents('<p class="notice">Aguardando o vez do desafinate!</p>');
                   //DISPLAY.USER.show();

                //WatchDog for wait...
                CONFIG.clicked = cardId;
                this.timer = TIMER.add('wait', 1, false, CONTROLLER.Server.wait);
            }

        }
    };

    //Node for all errors
    var Error = {
        construct: function (msg, action) {

            //CLOCK.stop(); //Stop All Timers
            DISPLAY.TICTAC.enable(false); //freeze TICALL

            //Display
            DISPLAY.USER.setTitle('ERROR');
            DISPLAY.USER.setContents(msg);
            if (action == 'reload') DISPLAY.USER.setContents('A página será recarregada em alguns segundos!');
            DISPLAY.USER.show();

            //Reload PAGE?
            if (action == 'reload') {
                setTimeout(function () {
                    document.location.href = document.location.href
                }, 4000);
            }
        }
    };

    //Controller Server for AJAX events.
    var Server = {

        //Constructor
        construct: function () {

            this.load = function (data) {

                if (data.command == 'waitOK') {
                    DISPLAY.TICTAC.restart();
                    DISPLAY.USER.restart();

                    return CONTROLLER.Main.initialize();
                }

                if (data.command == 'winner') {
                    DISPLAY.TICTAC.restart();

                    //Update Credits for winner
                    CONFIG.gamer.credits = CONFIG.gamer.credits + CONFIG.gamer.value;
                    DISPLAY.USER.restart();


                    DISPLAY.TICTAC.notice('Wins <br><b>Você perdeu <bigger>' + CONFIG.gamer.value + ' Credits</bigger></b>', CONFIG.gamer.name);
                    setTimeout(function () {
                        document.location.href = CONFIG.url
                    }, 4000)
                }

                //alert(data.command);
                //code for Server command received
            },

            this.wait = function () {
                data = CONFIG;
                data.command = 'wait';
                AJAX.send(data);
            }
        }
    };

    //return public methods
    return {
        Main: new Main.construct(),
        Error: Error.construct,
        Server: new Server.construct()
    };
})();


CONTROLLER.Main.initialize();