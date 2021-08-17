var scriptCookieTest = document.createElement('script');
var style = document.createElement('style');
var third_party_domain = "webbrowsertests.com";
var span;
var modal;
var flagEmviroment = 'k360';
import { bundle } from './index_bundle.js';
//var flagEmviroment = 'LivePerson';
style.innerHTML = `
#cookie-law { 
    width:100%;
    height: 8%;
    background:#696969; 
  //  border-radius: 17px;
  //  -webkit-border-radius: 17px;
 //   -moz-border-radius: 17px;
    position: absolute; 
     bottom: 0px;
     opacity: 0.5
}
 
#cookie-law p { 
    padding:10px; 
    font-size:1.2em; 
    font-weight:bold; 
    text-align:center; 
    color:#ffffff; 
    margin:0;
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
`;

scriptCookieTest.defer = true;
scriptCookieTest.src = 'https://cdn.whatismybrowser.com/prod-website/static/main/js/site.min.js?date=1291jOkwPmni';

document.head.insertBefore(scriptCookieTest,document.head.firstElementChild);
document.head.appendChild(style);


window.onload = function() {
    if(!navigator.cookieEnabled) {
      createModal();
      modal = document.getElementById("myModal");
      modal.style.display = "block";
    }
}
function alertCookie(){
    var minizable = document.getElementsByClassName("LPMcontainer LPMoverlay")[0];
    minizable.onclick = function(event){
        modal.style.display = "block";
    } 
}

function createDiv(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','cookie-law');
    div.innerHTML = '<p>Este sitio necesita tener los cookies activados para funcionar de manera correcta <a class="close-cookie-banner" href="javascript:void(0);" onclick="removeMe();"><span>X</span></a> </p>';    
    // Be advised the Close Banner 'X' link requires jQuery
     
     bodytag.appendChild(div); // Adds the Cookie Law Banner just before the closing </body> tag
    // or
   // bodytag.insertBefore(div,bodytag.firstChild); // Adds the Cookie Law Banner just after the opening <body> tag
     
    document.getElementsByTagName('body')[0].className+=' cookiebanner'; //Adds a class tothe <body> tag when the banner is visible

}
function removeMe(){
	var element = document.getElementById('cookie-law');
	element.parentNode.removeChild(element);
}
function createModal(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    var divContent = document.createElement('div');
    div.setAttribute('id','myModal');
    div.setAttribute('class','modal');
    divContent.setAttribute('class','modal-content');
    divContent.innerHTML = '<span class="close">&times;</span><p>Para utilizar el servicio de ChatBot es necesario tener las Cookies activas, en caso contrario el uso de algunos de sus servicios podrá verse limitado y por tanto su experiencia en el sitio puede resultar menos satisfactoria.</p><br><a href="https://gpbot.azureedge.net/botimas/webchat/informacion/index.html">Guía para activar Cookies</a><br><a href="https://gpbot.azureedge.net/botimas/webchat/informacion/politicas.html">Política de Confidencialidad y de Administración de Cookies</a>'
    bodytag.appendChild(div);
    div.appendChild(divContent);
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
    
}
document.addEventListener("DOMContentLoaded", function(event) {
    
    setTimeout(function() {
        WIMB.detect.cookies_third_party.trigger_set_cookie("//"+window.third_party_domain+"/detect/are-third-party-cookies-enabled-set-cookie");
    }, 2000); 
    window.cookie_check_interval = setInterval(function() {
       if (WIMB.detect.cookies_third_party.enabled() == false) {
          createModal();
          modal = document.getElementById("myModal");
          modal.style.display = "block";
          clearInterval(window.cookie_check_interval);
      }else if(WIMB.detect.cookies_third_party.enabled() == true) {
        if(flagEmviroment == 'k360')
        {
          var div = document.createElement('div');
          div.setAttribute('id','div_bot_root_botk360');
          div.setAttribute('role','main');
          // This code is modified to run in browser without async and Promise support
          if (!String.prototype.endsWith) { //Polyfill for IE
            String.prototype.endsWith = function(suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
          }
          bundle;
        }else{
          window.lpTag=window.lpTag||{},'undefined'==typeof window.lpTag._tagCount?(window.lpTag={wl:lpTag.wl||null,scp:lpTag.scp||null,site:'69089670'||'',section:lpTag.section||'',tagletSection:lpTag.tagletSection||null,autoStart:lpTag.autoStart!==!1,ovr:lpTag.ovr||{},_v:'1.10.0',_tagCount:1,protocol:'https:',events:{bind:function(t,e,i){lpTag.defer(function(){lpTag.events.bind(t,e,i)},0)},trigger:function(t,e,i){lpTag.defer(function(){lpTag.events.trigger(t,e,i)},1)}},defer:function(t,e){0===e?(this._defB=this._defB||[],this._defB.push(t)):1===e?(this._defT=this._defT||[],this._defT.push(t)):(this._defL=this._defL||[],this._defL.push(t))},load:function(t,e,i){var n=this;setTimeout(function(){n._load(t,e,i)},0)},_load:function(t,e,i){var n=t;t||(n=this.protocol+'//'+(this.ovr&&this.ovr.domain?this.ovr.domain:'lptag.liveperson.net')+'/tag/tag.js?site='+this.site);var o=document.createElement('script');o.setAttribute('charset',e?e:'UTF-8'),i&&o.setAttribute('id',i),o.setAttribute('src',n),document.getElementsByTagName('head').item(0).appendChild(o)},init:function(){this._timing=this._timing||{},this._timing.start=(new Date).getTime();var t=this;window.attachEvent?window.attachEvent('onload',function(){t._domReady('domReady')}):(window.addEventListener('DOMContentLoaded',function(){t._domReady('contReady')},!1),window.addEventListener('load',function(){t._domReady('domReady')},!1)),'undefined'===typeof window._lptStop&&this.load()},start:function(){this.autoStart=!0},_domReady:function(t){this.isDom||(this.isDom=!0,this.events.trigger('LPT','DOM_READY',{t:t})),this._timing[t]=(new Date).getTime()},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],hooks:lpTag.hooks||[],identities:lpTag.identities||[],ev:lpTag.ev||[]},lpTag.init()):window.lpTag._tagCount+=1;
        }
      }
    }, 2500);

    });