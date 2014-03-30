/* CONTROLLERS class 
 * author http://google.com/+BillRocha
 * date:  2014/03/12
 *
 * namespace CONTROLLER
 */

var CONTROLLER = (function() {
    var controller = {

        //Construct
        construct: function() {

            this.status = 'init';

            this.action = function(actName) {
                alert(actName.command);

                if (actName.command == 'card-click') this.cardClick();

            },


            //Actions -----------------------------------------------------------------
            this.initialize = function() {
                //AUDIO.play('click');

                //Create TicTac display
                TICALL.create('normal');

                //Start time
                CLOCK.set(3000);
                CLOCK.display("timer");
                CLOCK.init();

            },

            this.cardClick = function() {

                CLOCK.stop();
                TICALL.update();

            },


            this.timeOut = function() {
                SOUND.play('timeout');
                SPLASH.setSubtitle('esgotado!')
                SPLASH.show('Tempo');
            }

            //ERROS -------------------------------------------------------------------
            this.error = function(type) {
                alert('Error: ' + type);

                CLOCK.stop();
                TICALL.active(false); //freeze TICALL
                document.location.href = document.location.href;
            }




        }
    };

    //return public methods
    return {
        construct: controller.construct
    };
})();