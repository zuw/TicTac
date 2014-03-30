/* WATCH class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace WATCH
 */

var WATCH = (function() {
    var watch = {

        //Construct
        construct: function(Url, Type, Data) {

            this.url = (Url) ? Url : CONFIG.ajax;
            this.type = (Type) ? Type : 'POST';
            this.data = (Data) ? Data : '{"teste":"este é um teste."}';

            //Upload
            this.uploadFile = function(fileName) {

                var file = _(fileName).files[0];
                //alert('Name: ' + file.name + "\nSize: " + file.size + "\nType: " + file.type);

                var formdata = new FormData();
                formdata.append(fileName, file);

                var ajax = new XMLHttpRequest();
                ajax.upload.addEventListener("progress", this.progressHandler, false);
                ajax.addEventListener("load", this.completeHandler, false);
                ajax.addEventListener("error", this.errorHandler, false);
                ajax.addEventListener("abort", this.abortHandler, false);
                ajax.open("POST", this.url);
                ajax.send(formdata);
            },

            //Data Request
            this.ajax = function(data) {

                var formdata = new FormData();
                formdata.append("data", JSON.stringify(data));

                var ajax = new XMLHttpRequest();
                ajax.upload.addEventListener("progress", this.progressHandler, false);
                ajax.addEventListener("load", this.completeHandler, false);
                ajax.addEventListener("error", this.errorHandler, false);
                ajax.addEventListener("abort", this.abortHandler, false);
                ajax.open("POST", this.url);
                ajax.send(formdata);
            },

            //Progresss
            this.progressHandler = function(event) {
                var percent = (event.loaded / event.total) * 100;
                _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
            },

            //Complete
            this.completeHandler = function(event) {
                var data = false;
                eval(event.target.responseText);

                if (!data) CONTROLLER.error('nodata');

                CONFIG.tic = data.tic;

                //Reload cards
                TICALL.reload();

                CONTROLLER.action(data);

                _("status").innerHTML = event.target.responseText;
            },

            //Error
            this.errorHandler = function(event) {
                _("status").innerHTML = "Upload Failed";
            },

            //Abort
            this.abortHandler = function(event) {
                _("status").innerHTML = "Upload Aborted";
            }

        }
    };


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
                return CONTROLLER.timeOut();
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