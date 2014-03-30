/*environment*/ var URL="http://ticall.dev/"; var URL_IMG="http://img.ticall.dev/assets/";var URL_AJAX="http://ajax.ticall.dev/";var URL_SCRIPT="http://script.ticall.dev/script/";var URL_STYLE="http://style.ticall.dev/style/";

/* lib/prefixfree.js */ 
(function() {
   function t(e, t) {
       return [].slice.call((t || document).querySelectorAll(e))
   }
   if (!window.addEventListener) return;
   var e = window.StyleFix = {
       link: function(t) {
           try {
               if (t.rel !== "stylesheet" || t.hasAttribute("data-noprefix")) return
           } catch (n) {
               return
           }
           var r = t.href || t.getAttribute("data-href"),
               i = r.replace(/[^\/]+$/, ""),
               s = (/^[a-z]{3,10}:/.exec(i) || [""])[0],
               o = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(i) || [""])[0],
               u = /^([^?]*)\??/.exec(r)[1],
               a = t.parentNode,
               f = new XMLHttpRequest,
               l;
           f.onreadystatechange = function() {
               f.readyState === 4 && l()
           };
           l = function() {
               var n = f.responseText;
               if (n && t.parentNode && (!f.status || f.status < 400 || f.status > 600)) {
                   n = e.fix(n, !0, t);
                   if (i) {
                       n = n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function(e, t, n) {
                           return /^([a-z]{3,10}:|#)/i.test(n) ? e : /^\/\//.test(n) ? 'url("' + s + n + '")' : /^\//.test(n) ? 'url("' + o + n + '")' : /^\?/.test(n) ? 'url("' + u + n + '")' : 'url("' + i + n + '")'
                       });
                       var r = i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
                       n = n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + r, "gi"), "$1")
                   }
                   var l = document.createElement("style");
                   l.textContent = n;
                   l.media = t.media;
                   l.disabled = t.disabled;
                   l.setAttribute("data-href", t.getAttribute("href"));
                   a.insertBefore(l, t);
                   a.removeChild(t);
                   l.media = t.media
               }
           };
           try {
               f.open("GET", r);
               f.send(null)
           } catch (n) {
               if (typeof XDomainRequest != "undefined") {
                   f = new XDomainRequest;
                   f.onerror = f.onprogress = function() {};
                   f.onload = l;
                   f.open("GET", r);
                   f.send(null)
               }
           }
           t.setAttribute("data-inprogress", "")
       },
       styleElement: function(t) {
           if (t.hasAttribute("data-noprefix")) return;
           var n = t.disabled;
           t.textContent = e.fix(t.textContent, !0, t);
           t.disabled = n
       },
       styleAttribute: function(t) {
           var n = t.getAttribute("style");
           n = e.fix(n, !1, t);
           t.setAttribute("style", n)
       },
       process: function() {
           t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);
           t("style").forEach(StyleFix.styleElement);
           t("[style]").forEach(StyleFix.styleAttribute)
       },
       register: function(t, n) {
           (e.fixers = e.fixers || []).splice(n === undefined ? e.fixers.length : n, 0, t)
       },
       fix: function(t, n, r) {
           for (var i = 0; i < e.fixers.length; i++) t = e.fixers[i](t, n, r) || t;
           return t
       },
       camelCase: function(e) {
           return e.replace(/-([a-z])/g, function(e, t) {
               return t.toUpperCase()
           }).replace("-", "")
       },
       deCamelCase: function(e) {
           return e.replace(/[A-Z]/g, function(e) {
               return "-" + e.toLowerCase()
           })
       }
   };
   (function() {
       setTimeout(function() {
           t('link[rel="stylesheet"]').forEach(StyleFix.link)
       }, 10);
       document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
   })()
})();
(function(e) {
   function t(e, t, r, i, s) {
       e = n[e];
       if (e.length) {
           var o = RegExp(t + "(" + e.join("|") + ")" + r, "gi");
           s = s.replace(o, i)
       }
       return s
   }
   if (!window.StyleFix || !window.getComputedStyle) return;
   var n = window.PrefixFree = {
       prefixCSS: function(e, r, i) {
           var s = n.prefix;
           n.functions.indexOf("linear-gradient") > -1 && (e = e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, function(e, t, n, r) {
               return t + (n || "") + "linear-gradient(" + (90 - r) + "deg"
           }));
           e = t("functions", "(\\s|:|,)", "\\s*\\(", "$1" + s + "$2(", e);
           e = t("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + s + "$2$3", e);
           e = t("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + s + "$2:", e);
           if (n.properties.length) {
               var o = RegExp("\\b(" + n.properties.join("|") + ")(?!:)", "gi");
               e = t("valueProperties", "\\b", ":(.+?);", function(e) {
                   return e.replace(o, s + "$1")
               }, e)
           }
           if (r) {
               e = t("selectors", "", "\\b", n.prefixSelector, e);
               e = t("atrules", "@", "\\b", "@" + s + "$1", e)
           }
           e = e.replace(RegExp("-" + s, "g"), "-");
           e = e.replace(/-\*-(?=[a-z]+)/gi, n.prefix);
           return e
       },
       property: function(e) {
           return (n.properties.indexOf(e) >= 0 ? n.prefix : "") + e
       },
       value: function(e, r) {
           e = t("functions", "(^|\\s|,)", "\\s*\\(", "$1" + n.prefix + "$2(", e);
           e = t("keywords", "(^|\\s)", "(\\s|$)", "$1" + n.prefix + "$2$3", e);
           n.valueProperties.indexOf(r) >= 0 && (e = t("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + n.prefix + "$2$3", e));
           return e
       },
       prefixSelector: function(e) {
           return e.replace(/^:{1,2}/, function(e) {
               return e + n.prefix
           })
       },
       prefixProperty: function(e, t) {
           var r = n.prefix + e;
           return t ? StyleFix.camelCase(r) : r
       }
   };
   (function() {
       var e = {}, t = [],
           r = {}, i = getComputedStyle(document.documentElement, null),
           s = document.createElement("div").style,
           o = function(n) {
               if (n.charAt(0) === "-") {
                   t.push(n);
                   var r = n.split("-"),
                       i = r[1];
                   e[i] = ++e[i] || 1;
                   while (r.length > 3) {
                       r.pop();
                       var s = r.join("-");
                       u(s) && t.indexOf(s) === -1 && t.push(s)
                   }
               }
           }, u = function(e) {
               return StyleFix.camelCase(e) in s
           };
       if (i.length > 0)
           for (var a = 0; a < i.length; a++) o(i[a]);
       else
           for (var f in i) o(StyleFix.deCamelCase(f));
       var l = {
           uses: 0
       };
       for (var c in e) {
           var h = e[c];
           l.uses < h && (l = {
               prefix: c,
               uses: h
           })
       }
       n.prefix = "-" + l.prefix + "-";
       n.Prefix = StyleFix.camelCase(n.prefix);
       n.properties = [];
       for (var a = 0; a < t.length; a++) {
           var f = t[a];
           if (f.indexOf(n.prefix) === 0) {
               var p = f.slice(n.prefix.length);
               u(p) || n.properties.push(p)
           }
       }
       n.Prefix == "Ms" && !("transform" in s) && !("MsTransform" in s) && "msTransform" in s && n.properties.push("transform", "transform-origin");
       n.properties.sort()
   })();
   (function() {
       function i(e, t) {
           r[t] = "";
           r[t] = e;
           return !!r[t]
       }
       var e = {
           "linear-gradient": {
               property: "backgroundImage",
               params: "red, teal"
           },
           calc: {
               property: "width",
               params: "1px + 5%"
           },
           element: {
               property: "backgroundImage",
               params: "#foo"
           },
           "cross-fade": {
               property: "backgroundImage",
               params: "url(a.png), url(b.png), 50%"
           }
       };
       e["repeating-linear-gradient"] = e["repeating-radial-gradient"] = e["radial-gradient"] = e["linear-gradient"];
       var t = {
           initial: "color",
           "zoom-in": "cursor",
           "zoom-out": "cursor",
           box: "display",
           flexbox: "display",
           "inline-flexbox": "display",
           flex: "display",
           "inline-flex": "display",
           grid: "display",
           "inline-grid": "display",
           "min-content": "width"
       };
       n.functions = [];
       n.keywords = [];
       var r = document.createElement("div").style;
       for (var s in e) {
           var o = e[s],
               u = o.property,
               a = s + "(" + o.params + ")";
           !i(a, u) && i(n.prefix + a, u) && n.functions.push(s)
       }
       for (var f in t) {
           var u = t[f];
           !i(f, u) && i(n.prefix + f, u) && n.keywords.push(f)
       }
   })();
   (function() {
       function s(e) {
           i.textContent = e + "{}";
           return !!i.sheet.cssRules.length
       }
       var t = {
           ":read-only": null,
           ":read-write": null,
           ":any-link": null,
           "::selection": null
       }, r = {
               keyframes: "name",
               viewport: null,
               document: 'regexp(".")'
           };
       n.selectors = [];
       n.atrules = [];
       var i = e.appendChild(document.createElement("style"));
       for (var o in t) {
           var u = o + (t[o] ? "(" + t[o] + ")" : "");
           !s(u) && s(n.prefixSelector(u)) && n.selectors.push(o)
       }
       for (var a in r) {
           var u = a + " " + (r[a] || "");
           !s("@" + u) && s("@" + n.prefix + u) && n.atrules.push(a)
       }
       e.removeChild(i)
   })();
   n.valueProperties = ["transition", "transition-property"];
   e.className += " " + n.prefix;
   StyleFix.register(n.prefixCSS)
})(document.documentElement);

/* config.js */ 

var CONFIG = {

   url: "http://ticall.dev/",
   assets: "http://ticall.dev/assets/",
   ajax: "http://ticall.dev/ajax/",

   sounds: {
       'click': "http://ticall.dev/assets/fx.mp3",
       'final': "http://ticall.dev/assets/final.mp3",
       'tic': "http://ticall.dev/assets/tic.mp3",
       'timeout': "http://ticall.dev/assets/tout.mp3"
   },

   gamer: {
       'name': 'Alexandre Ottoni',
       'image': 'http://ticall.dev/assets/u2.jpg',
       'credits': 234,
       'value': 20
   },

   clicked: '',
   key: '',
   winner: '',

   tic: {
       A1: {
           type: 'X',
           active: false
       },
       B1: {
           type: 'O',
           active: false
       },
       C1: {
           type: 'X',
           active: false
       },
       A2: {
           type: 'O',
           active: false
       },
       B2: {
           type: 'O',
           active: false
       },
       C2: {
           type: 'X',
           active: false
       },
       A3: {
           type: 'O',
           active: false
       },
       B3: {
           type: 'X',
           active: false
       },
       C3: {
           type: 'O',
           active: false
       }
   }
};

/* lib/ajax.class.js */ 

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

/* lib/display.class.js */ 

var DISPLAY = (function() {

   var tictac = {

       construct: function() {

           this.freeze = false;
           this.card = {};
           this.over = null;

           this.enable = function(on) {
               if (typeof on != 'boolean') on = true
               this.freeze = !on;
               this.over.innerHTML = ' ';
               this.over.style.display = (on) ? 'none' : 'block';
           },

           this.notice = function(msg, title) {
               var o = '<div>';
               if (typeof title == 'string') o += '<h1>' + title + '</h1>';
               if (typeof msg == 'string') o += '<p>' + msg + '</p>';
               //alert(o);
               this.over.innerHTML = o + '</div>';
               this.over.style.display = 'block';
           }

           this.restart = function() {
               for (i in this.card) {
                   var type = (CONFIG.tic[i].active) ? CONFIG.tic[i].type : '';
                   this.card[i].className = type;
                   this.card[i].innerHTML = type;
               }
               this.freeze = false;
           },

           this.init = function() {

               //Create TicTac div
               this.tictac = _e('DIV', {
                   'id': 'tictac',
                   'class': 'tictac'
               });

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

                   this.card[i].addEventListener('click', function() {

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

       construct: function() {

           //Create element
           this.user = _e('DIV', {
               'id': 'user',
               'class': 'user'
           });
           this.title = '';
           this.image = '';
           this.contents = '';
           this.class = 'user';

           //appendChild
           _ap('container', this.user);

           this.card = [];

           _('user').innerHTML = '<div id="image" class="userDiv">1</div><div id="userData" class="userDiv">2</div><div id="counter" class="userDiv"></div>';

           //_ap(this.user, this.card[2]);
           //_ap(this.user, this.card[3]);

           //_('user1').innerHTML('1');
           //_('user2').innerHTML('2');
           //_('user3').innerHTML('3');


           //functions -----------------------------------------------------

           this.reflesh = function() {
               _('image').innerHTML = this.image;
               _('userData').innerHTML = this.title + this.contents; // +
           },

           this.restart = function() {
               this.title = '<h3>' + CONFIG.gamer.name + '</h3>';
               this.image = '<img src="' + CONFIG.gamer.image + '">';
               this.contents = '<p><b>' + CONFIG.gamer.credits + '</b> créditos total</p>';
               this.reflesh();
           },

           this.setTitle = function(title) {
               this.title = '<h3>' + title + '</h3>';
               this.reflesh();
           },

           this.setImage = function(image) {
               this.image = '<img src="' + image + '">';
               this.reflesh();
           },

           this.setContents = function(contents) {
               this.contents = contents;
               this.reflesh();
           }

           //insert contents
           this.restart();
       }
   };

   var count = {

       construct: function() {

           _ap('counter', _e('DIV', {
               'id': 'timer',
               'class': 'timer'
           }));

           this.id = _('timer');

           this.set = function(value) {
               this.id.innerHTML = value;
               this.id.style.display = 'block';
           },

           this.clean = function() {
               this.id.innerHTML = '0';
               this.id.style.display = 'none';
           },

           this.setColor = function(color, back) {
               if (!color) color = '#999';
               if (!back) back = '#444';
               this.id.style.color = color;
               this.id.style.background = back;
           },

           this.hide = function() {
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

/* lib/audio.class.js */ 

var AUDIO = (function() {

   var sound = {

       //Construct
       construct: function() {

           this.active = true;
           this.node = new Array();

           for (i in CONFIG.sounds) {
               this.node[i] = document.createElement('audio');
               this.node[i].setAttribute('id', 'sound_' + i);

               //error:: this.node[i].canPlayType('audio/mpeg') != false >> play audio [ok]

               //check support for HTML5 audio
               if (this.node[i].canPlayType) {
                   var sourceel = document.createElement('source');

                   //attributes                        
                   sourceel.setAttribute('src', CONFIG.sounds[i]);
                   sourceel.setAttribute('type', "audio/mpeg");
                   this.node[i].appendChild(sourceel);

                   //inserting audio in Html body 
                   document.body.appendChild(this.node[i]);

                   //loading audio file
                   this.node[i].load();
               } else {
                   Main.error("Your browser doesn't support HTML5 audio unfortunately.");
               }
           }

           this.play = function(sound) {
               if (!this.active) return false;
               if (this.node[sound]) {
                   //this.node[sound].load();
                   //this.node[sound].play();
                   //this.node[sound].pause();
                   this.node[sound].ended = true;
                   this.node[sound].play();
               }
           },

           //mute sounds
           this.mute = function() {
               this.active = false;
               this.stop();
           },

           //enable sounds
           this.enable = function() {
               this.active = true;
           },

           //mute the sounds
           this.stop = function() {
               for (i in this.node) {
                   this.node[i].stop();
               }
           }
       }
   };

   //return public methods
   return {
       Player: new sound.construct()
   };
})();
//simplified NODE for Sound: SOUND.play(); [etc]
var SOUND = AUDIO.Player;

/* lib/watch.class.js */ 

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

/* controller.js */ 

var CONTROLLER = (function() {

   //Controller Main :: initialized in "load" window.
   var Main = {

       //Construct
       construct: function() {

           this.status = 'init';
           this.timer = null;

           this.initialize = function() {
               _('credits').innerHTML = CONFIG.gamer.value;
               //AUDIO.play('start');
               DISPLAY.TICTAC.enable();
               this.timer = TIMER.add('inicial', 40, true, CONTROLLER.Main.timeOut);
           },

           this.timeOut = function() {
               SOUND.play('timeout');
               DISPLAY.TIMER.hide();
               DISPLAY.USER.setTitle('TEMPO')
               DISPLAY.USER.setContents('<p class="notice">esgotado!</p>')
               DISPLAY.USER.show();
           },

           this.clicked = function(cardId) {
               DISPLAY.TICTAC.enable(false);
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
       construct: function(msg, action) {

           //CLOCK.stop(); //Stop All Timers
           DISPLAY.TICTAC.enable(false); //freeze TICALL

           //Display
           DISPLAY.USER.setTitle('ERROR');
           DISPLAY.USER.setContents(msg);
           if (action == 'reload') DISPLAY.USER.setContents('A página será recarregada em alguns segundos!');
           DISPLAY.USER.show();

           //Reload PAGE?
           if (action == 'reload') {
               setTimeout(function() {
                   document.location.href = document.location.href
               }, 4000);
           }
       }
   };

   //Controller Server for AJAX events.
   var Server = {

       //Constructor
       construct: function() {

           this.load = function(data) {

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
                   setTimeout(function() {
                       document.location.href = CONFIG.url
                   }, 4000)
               }

               //alert(data.command);
               //code for Server command received
           },

           this.wait = function() {
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

