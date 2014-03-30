/* WATCH class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace WATCH
 */

var WATCH = (function() {
    var watch = {

        //Construct
        construct: function() {

            this.node = {};

            this.create = function(name, tickTime, ticCallback, maxTime, maxCallback) {

                this.node[name] = new WATCH.timer(tickTime, ticCallback, maxTime, maxCallback);

            },

            this.start = function(name, newInterval) {
                if (this.node[name]) {
                    return this.node[name].start(newInterval);
                } else {
                    return new CONTROLLER.Error('Timer not exists!', 'stop');
                }
            }
        }


    };


    //Timer class
    var timer = {

        construct: function(interval, maxtime, ticCallback, maxCallback) {

            this.tickCallback = tickCallback;
            this.maxCallback = maxCallback;
            this.interval = interval;
            this.maxtime = maxtime;
            this.node = null;
            this.count = 0;

            //Star [opcional = new interval] timer
            this.start = function(newInterval) {
                //[opcional] new interval | 3000 = 3 seconds
                if (newInterval) this.interval = newInterval;

                this.node = setInterval(function() {
                    this.tick();
                }, this.interval);
            },

            //Stop the time
            this.stop = function() {
                return window.clearInterval(this.node);
            },

            //Tick step
            this.tick = function() {
                if (maxtime) {
                    this.count++;
                    if (this.count >= this.maxtime)
                        return this.timeout();
                }
                return this.callback;
            },

            //[opcional] Timeout
            this.timeout = function() {
                return this.maxCallback;
            }
        }
    }


    var wdog = {

        counter: 20,
        display: false,
        nodeTime: false,

        //Construct
        construct: function() {

            this.tout = false;
            this.tcounter = false;
            this.counter = 16;
            WATCH.wdisplay = '';

            //SET Timeout - wdog.set(3000) =>> 3 seconds!
            this.set = function(timeout) {
                this.timeout = timeout;
            },

            //Set target html element by idName
            this.display = function(idname) {
                WATCH.wdisplay = idname;
            },

            this.init = function() {
                // this.tout = setTimeout(function() {
                //     TICALL.watchDog();
                // }, this.timeout);

                WATCH.nodeTime = setInterval(function() {
                    WATCH.timeDisplay();
                }, 1000);
            },

            this.stop = function() {
                window.clearInterval(WATCH.nodeTime);
            }

        },

        timeDisplay: function() {
            this.wcounter--;
            var color = null;
            var back = null;

            if (this.wcounter <= 10) {
                SOUND.play('tic');
                color = "#000";
                back = "#C90";
            }

            if (this.wcounter <= 5) {
                color = "#FFF";
                back = "#F30";
            }

            if (this.wcounter <= 0) {
                window.clearInterval(WATCH.nodeTime);
                DISPLAY.clockHide();
                return controllerMain.timeOut();
            }

            return DISPLAY.clockShow(this.wcounter, color, back);
        }
    }


    //return public methods
    return {
        upload: watch.uploadFile,
        construct: watch.construct,
        wconstruct: wdog.construct,
        timeDisplay: wdog.timeDisplay,
        wdisplay: wdog.display,
        wcounter: wdog.counter,
        wmaxtime: wdog.maxtime,
        nodeTime: wdog.nodeTime
    };
})();