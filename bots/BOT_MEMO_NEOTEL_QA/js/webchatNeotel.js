function _StringFormatInline() {
    var txt = this;
    for (var i = 0; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i) + '\\}', 'gm');
        txt = txt.replace(exp, arguments[i]);
    }
    return txt;
}

function _StringFormatStatic() {
    for (var i = 1; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        arguments[0] = arguments[0].replace(exp, arguments[i]);
    }
    return arguments[0];
}

if (!String.prototype.format) {
    String.prototype.format = _StringFormatInline;
}

if (!String.format) {
    String.format = _StringFormatStatic;
}

function isMobile() {
    try { document.createEvent("TouchEvent"); return true; }
    catch (e) { return false; }
}

function startNeoWebChat() {
    startIFrame('WebChat');
}

function startNeoCallBack() {
    startIFrame('CallBack');
}

function startIFrame(type) {
    debugger;
    var cnt = $('#cntNeo' + type)
    if (!cnt.is(':visible')) {
        var height = parseInt(cnt.css('height').replace('px', ''));
        cnt.css('left', '');
        cnt.css('top', '');
        cnt.css('bottom', (height * -1) + 'px');
        cnt.css('display', 'block');
        if (!isMobile())
            cnt.animate({ 'bottom': '43px' }, 500);
        else
            cnt.animate({ 'bottom': '68px' }, 500);
        setTimeout("$('#cnt" + type + "Prev').css('display', 'none')", 3000);
    }
}



$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
    return (results !== null) ? results[1] || 0 : false;
}

function initCallBack(protocol, domain, site, info, title, titleColor, width, height) {
    initFrame("CallBack", protocol, domain, site, info, title, titleColor, width, height, "1")
}



function initWebChat(protocol, domain, site, info, title, titleColor, width, height, operatorNameCode) {
    initFrame("WebChat", protocol, domain, site, info, title, titleColor, width, height, operatorNameCode)
}

function initFrame(type, protocol, domain, site, info, title, titleColor, width, height, operatorNameCode) {
    debugger;
    let rightPos = "1";
    $("#cntNeo" + type).attr("style", String.format("position:fixed;right:1px;border:none;width:100%;height:100%;display:none; z-index:999999", rightPos)).html(`<div id='Div1' style='position:absolute;top: 0px; left:0px; width:100%;height:30px;cursor:move;'>
		<span id='lbl`+ type + `Title' class='WEBCHATTITLE' ></span>
		<a onclick="javascript:$('#cntNeo`+ type + `').slideUp(500);"><img alt=''  style='position:absolute;right:8px;top:3px;width:27px;height:27px;cursor:pointer;cursor:hand;' id='img` + type + `Minimize'/>
		</a>
	</div>
	<div id='containerNeo`+ type + `' style='position:absolute;top: 30px; left:0px'>
		<div style='z-index:5' id='cnt`+ type + `Prev'><iframe  style='top:0px;left:0px;border:none;height: 100vh;width:-webkit-calc(100vw - {{rightPos}}px);width:-moz-calc(100vw - {{rightPos}}px);width:calc(100vw - {{rightPos}}px)' ></iframe></div>
		<iframe  id='iframe`+ type + `' style='z-index:4;top:0px;left:0px;border:none;height: 100vh;width:-webkit-calc(100vw - {{rightPos}}px);width:-moz-calc(100vw - {{rightPos}}px);width:calc(100vw - {{rightPos}}px)' ></iframe>
	</div>`);


    $("#lbl" + type + "Title").html(unescape(title));
    $("#img" + type + "Minimize").attr("src", String.format("{0}://{1}/{2}/images/minimize-arrow.png", protocol, domain, site));
    $("#cnt" + type + "Prev iframe").attr("src", String.format("{0}://{1}/{2}/emptyPage.htm", protocol, domain, site));
    $("#iframe" + type + "").attr('src', String.format(`{0}://{1}/{2}/` + type + `.aspx?operatorNameCode={4}&info={3}`, protocol, domain, site, info, operatorNameCode));
    $("#webchatcss").attr("href", String.format("{0}://{1}/{2}/css/webchat.css", protocol, domain, site));
    if (!isMobile()) {
        $("#cntNeo" + type).css("max-height", String.format("calc({0}px + 42px)", height)).css("width", String.format("calc({0}px + 11px)", width));
        $("#cnt" + type + "Prev iframe, #iframe" + type).css("max-height", String.format("calc({0}px + 34px)", height)).css("width", String.format("calc({0}px + 11px)", width));
    }
    else {
        $("#cntNeo" + type).css("height", String.format("calc(100vh - 98px)", height)).css("max-height", String.format("calc(100vh - 98px)", height)).css("width", String.format("calc(100vw - 2px)", width));
        $("#cnt" + type + "Prev iframe, #iframe" + type).css("max-height", String.format("calc(100vh - 75px)", height)).css("width", String.format("calc(100vw - 2px)", width));
    }



    $("#cntNeo" + type + ">div").css("background-color", titleColor);
    $("#cntNeo" + type).draggable();
}