(this.webpackJsonpchat_qa=this.webpackJsonpchat_qa||[]).push([[0],{1225:function(e,t){},1226:function(e,t){},1227:function(e,t){},1390:function(e,t){},1400:function(e,t){},1401:function(e,t){},1402:function(e,t){},1417:function(e,t){},1425:function(e,t,a){},1426:function(e,t,a){},1427:function(e,t,a){},1428:function(e,t,a){},1429:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),o=a(131),s=a.n(o),i=(a(559),a(65)),r=a.n(i),l=a(106),u=a(18),m=a.n(u),d=a(87),f=a.n(d),b=(a(1425),function(e){var t=e.className,a=e.onFetchToken,o=e.store,s=e.token,i=Object(n.useMemo)((function(){return Object(d.createDirectLine)({token:s})}),[s]),r=Object(n.useMemo)((function(){return Object(d.createStyleSet)({backgroundColor:"Transparent",botAvatarImage:"https://gpbot.azureedge.net/botimas/webchat/img/avatar.png",botAvatarInitials:"Zuri",userAvatarImage:"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",userAvatarInitials:"User"})}),[]);return Object(n.useEffect)((function(){a()}),[a]),s?c.a.createElement(f.a,{className:"".concat(t||""," web-chat"),directLine:i,store:o,styleSet:r}):c.a.createElement("div",{className:"".concat(t||""," connect-spinner")},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"icon"},c.a.createElement("span",{className:"avat"})),c.a.createElement("p",{style:{color:"black",fontSize:"25px"}},"Por favor espere mientras nos conectamos.")))}),p=(a(1426),a(1427),a(176)),v=a.n(p);var g=function(){var e=Object(n.useMemo)((function(){return Object(d.createStore)({},(function(e){var t=e.dispatch;return function(e){return function(a){return"DIRECT_LINE/CONNECT_FULFILLED"===a.type?(console.log("DIRECT_LINE/CONNECT_FULFILLED"),setTimeout((function(){t({type:"WEB_CHAT/SEND_EVENT",payload:{name:"webchat/join",value:{language:window.navigator.language}}})}),1e3),function(){console.log("displayAnimation");Math.floor(4*Math.random());v()(".css-ljhy6a.css-7c9av6").append(v()('<li id="animation-item" class="css-1qyo5rb"><div class="css-hgucfj css-1wi3416"><div class="css-7xorrq avatar"></div><div class="content"><div class="row message"><div class="css-ostbv8 bubble"><div class="markdown css-o3xlyv"><p><img src="https://gpbot.azureedge.net/botimas/webchat/img/00-Ilustracion-Zury-IMAS.jpg" class="animation-image" /></p></div></div><div class="filler"></div></div><div class="row"><span class="css-1phiexw"></span><div class="filler"></div></div></div><div class="filler"></div></div></li>').hide().fadeIn(2e3)),v()("#animation-item").delay(1e4).fadeOut(2e3)}(),"true"===localStorage.getItem("welcome")&&(console.log(window.navigator.language+" WEB_CHAT/SEND_EVENT"),setTimeout((function(){t({type:"WEB_CHAT/SEND_EVENT",payload:{name:"requestWelcomeDialog",value:{language:window.navigator.language}}})}),1e3))):"DIRECT_LINE/CONNECT_FULFILLED"===a.type&&"false"===localStorage.getItem("welcome")?t({type:"WEB_CHAT/SEND_EVENT",payload:{name:"requestWelcomeDialog",value:{language:window.navigator.language}}}):"DIRECT_LINE/INCOMING_ACTIVITY"===a.type&&"bot"===a.payload.activity.from.role&&I(!0),e(a)}}}))}),[]),t=Object(n.useMemo)((function(){return Object(d.createStyleSet)({backgroundColor:"Transparent"})}),[]),a=Object(n.useState)(!1),o=Object(l.a)(a,2),s=o[0],i=o[1],u=Object(n.useState)(!0),f=Object(l.a)(u,2),p=f[0],g=f[1],E=Object(n.useState)(!1),h=Object(l.a)(E,2),N=h[0],I=h[1],w=Object(n.useState)("right"),j=Object(l.a)(w,2),O=j[0],C=j[1],y=Object(n.useState)(),S=Object(l.a)(y,2),T=S[0],k=S[1],_=Object(n.useCallback)((function(){var e,t,a;return r.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(T){n.next=12;break}return n.next=3,r.a.awrap(fetch("https://directline.botframework.com/v3/directline/conversations",{method:"POST",headers:new Headers({Authorization:"Bearer 6RUGzsqaYno.bNid_YdeXXgN5T3l0IcD1bcjHhDfDHzVWAH6FcSxysQ","Content-Type":'"Content-Type", "application/json"'})}));case 3:return e=n.sent,n.next=6,r.a.awrap(e.json());case 6:t=n.sent,a=t.token,console.log(e),localStorage.setItem("token",a),localStorage.setItem("welcome",!1),k(a);case 12:case"end":return n.stop()}}))}),[k,T]),D=Object(n.useCallback)((function(){return r.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:i(!0),g(!1),I(!1);case 3:case"end":return e.stop()}}))}),[g,I]),x=Object(n.useCallback)((function(){g(!0),I(!1)}),[g,I]),L=Object(n.useCallback)((function(){C("left"===O?"right":"left")}),[C,O]);Object(n.useCallback)((function(){I(!0)}));return c.a.createElement("div",{className:"minimizable-web-chat"},p&&c.a.createElement("button",{className:"maximize",onClick:D},N&&c.a.createElement("span",{className:"ms-Icon ms-Icon--CircleShapeSolid red-dot"})),s&&c.a.createElement("div",{className:m()("left"===O?"chat-box left":"chat-box right",p?"hide":"")},c.a.createElement("header",null,c.a.createElement("div",{className:"filler"}),c.a.createElement("button",{className:"switch",onClick:L},c.a.createElement("span",{className:"ms-Icon ms-Icon--Switch"})),c.a.createElement("button",{className:"minimize",onClick:x},c.a.createElement("span",{className:"ms-Icon ms-Icon--ChromeMinimize"}))),c.a.createElement(b,{className:"react-web-chat",onFetchToken:_,store:e,styleSet:t,token:T,styleOptions:{}})))},E=a(552),h=a.n(E),N=(a(1428),function(){return c.a.createElement("div",{className:"App"},c.a.createElement("img",{alt:"product background",src:h.a}),c.a.createElement(g,null))});s.a.render(c.a.createElement(N,null),document.getElementById("root"))},274:function(e,t){},275:function(e,t){},551:function(e,t){},552:function(e,t,a){e.exports=a.p+"static/media/bg.b0d36d4d.PNG"},554:function(e,t,a){e.exports=a(1429)},559:function(e,t,a){},662:function(e,t){},664:function(e,t){},677:function(e,t){},679:function(e,t){},707:function(e,t){},708:function(e,t){},713:function(e,t){},715:function(e,t){},739:function(e,t){}},[[554,1,2]]]);
//# sourceMappingURL=main.7bf064dd.chunk.js.map