/* Main Javascript File 
 * author http://google.com/+BillRocha
 * date:  2014/02/08
 */

//simplified getElementById.
function _(el) {
    return document.getElementById(el);
}

//instanciate abjects in global context
var SOUND = new AUDIO.construct();
var SERVER = new WATCH.construct();
var CLOCK = new WATCH.wconstruct();
var TICALL = new TICTAC.construct();
var SPLASH = new DISPLAY.construct();
var CONTROLLER = new CONTROLLER.construct();

//Run application
CONTROLLER.initialize();