/* Watch class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace WATCH
 */

var WATCH = (function() {
    var watch = {

        //Construct
        construct: function(Url, Type, Data) {

            this.url = (Url) ? Url : 'http://ticall.tk/upload';
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
                //_("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;

                var percent = (event.loaded / event.total) * 100;

                //_("progressBar").value = Math.round(percent);

                _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
            },

            //Complete
            this.completeHandler = function(event) {
                //alert(event.target.responseText);

                _("status").innerHTML = event.target.responseText;

                //_("progressBar").value = 0;
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

        counter: 0,
        display: false,
        maxtime: 30,
        nodeTime: false,

        //Construct
        construct: function() {

            this.tout = false;
            this.tcounter = false;
            this.counter = 0;
            WATCH.wdisplay = '';

            //this.url = (Url) ? Url : 'http://ticall.tk/upload';

            //SET Timeout - wdog.set(3000) =>> 3 seconds!
            this.set = function(timeout) {
                this.timeout = timeout;
            },

            //Set target html element by idName
            this.display = function(idname) {
                WATCH.wdisplay = idname;
            },

            this.init = function() {
                this.tout = setTimeout(function() {
                    TICALL.watchDog();
                }, this.timeout);

                WATCH.nodeTime = setInterval(function() {
                    WATCH.timeDisplay();
                }, 1000);
            }

        },

        timeDisplay: function() {
            this.wcounter++;
            var dsp = _(WATCH.wdisplay);

            if (this.wcounter >= 10) {
                dsp.style.background = "#890";
                dsp.style.color = "#FFF";
            }
            if (this.wcounter >= 20) {
                dsp.style.background = "#C60";
            }
            if (this.wcounter >= 25) {
                dsp.style.background = "#F00";
            }

            if (this.wcounter >= this.wmaxtime) {
                alert('PERDEU!!!');
                window.clearInterval(WATCH.nodeTime);
            }
            dsp.innerHTML = this.wcounter;
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