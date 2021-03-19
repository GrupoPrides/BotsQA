$(document).ready(function () {
});
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
        // console.log('style changed:',mutationRecord);
        var displayMemoMin = $('#DivMinimizableWebChatBtn')[0].style.display;
        var displayNeotel = $('#cntNeoWebChat')[0].style.display;
        if (displayMemoMin == 'none' && displayNeotel == 'none') {
            $('#DivMinimizableWebChatBtn').css("display", "block");
        }
    });
});

var target = document.getElementById('cntNeoWebChat');
observer.observe(target, { attributes: true, attributeFilter: ['style'] });
/*(function () {
    orig = $.fn.css;
    $.fn.css = function () {
        var result = orig.apply(this, arguments);
        $(this).trigger('stylechanged');
        return result;
    }
})();
$("#cntNeoWebChat").on(
    "stylechanged", function () {
        var displayMemoMin = $('#memoMinimizableWebChatBtn')[0].style.display;
        var displayNeotel = $('#cntNeoWebChat')[0].style.display;
        if (displayMemoMin == 'none' && displayNeotel == 'none') {
            $('#memoMinimizableWebChatBtn').css("display", "block");
        }
    });*/
function AvatarMemoClick() {
    $('#cntNeoChat').draggable(); startNeoWebChat();

    $('#DivMinimizableWebChatBtn').css("display", "none");
}