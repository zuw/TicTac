/* TIMER class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace TIMER
 */

var COUNT = (function () {

    //Factory for Timers
    var counter = {

        construct: function () {

            this.node = {}; //node for all timer objects 'add' 

            //Add new timer [automatic start]
            this.add = function (name, max, tic, callback) {

                this.node[name] = new COUNT.timer(name, max, tic, callback);
                return this.node[name];
            },

            //destroy an object timer
            this.destroy = function (name) {
                window.clearInterval(this.node[name].node);
                this.node[name] = null;
            }
        }

    }

    //Timers
    var timer = {

        construct: function (name, max, tic, callback) {
            //alert('chegou: ' + max)

            this.name = name;
            this.max = max;
            this.counter = max;
            this.tic = tic;
            this.callback = callback;
            this.node = null;


            this.tick = function () {

                //alert('timer.tick')
                if (this.tic) {

                    if (this.counter == this.max) DISPLAY.TIMER.setColor(false, false);
                    if (this.counter <= ((this.max * 2) / 3)) DISPLAY.TIMER.setColor('#DDD', '#888');
                    if (this.counter <= (this.max / 3)) DISPLAY.TIMER.setColor('#000', '#CC0');
                    if (this.counter <= (this.max / 6)) DISPLAY.TIMER.setColor('#FFF', '#F00');

                    DISPLAY.TIMER.set(this.counter);
                    SOUND.play('tic');
                }

                if (this.counter <= 0) this.timeout();
                this.counter--;
            },

            this.timeout = function () {
                window.clearInterval(this.node);
                return eval('var x = ' + this.callback + '()');
            },

            this.destroy = function () {
                window.clearInterval(this.node);
            }

            this.node = setInterval(function () {
                TIMER.node[name].tick();
            }, 500);
        }
    };

    return {
        counter: new counter.construct(),
        timer: timer.construct
    }
})();

var TIMER = COUNT.counter;