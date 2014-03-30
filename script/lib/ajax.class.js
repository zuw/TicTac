/* AJAX class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace AJAX
 */

var AJAX = (function() {
    var ajax = {

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
            this.send = function(data) {

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
                _("status").innerHTML = event.target.responseText;

                data = JSON.parse(event.target.responseText);

                //eval(event.target.responseText);

                //Data error or falling
                if (!data) return new CONTROLLER.Error('nodata', 'reload');

                //else: update CONFIG & start selected Controller
                CONFIG = data;
                return CONTROLLER.Server.load(data);
            },

            //Error
            this.errorHandler = function(event) {
                return new CONTROLLER.Error('Upload Failed');
            },

            //Abort
            this.abortHandler = function(event) {
                _("status").innerHTML = "Upload Aborted";
            }

        }
    };

    //return public methods
    return {
        construct: ajax.construct
    };
})();

var AJAX = new AJAX.construct();