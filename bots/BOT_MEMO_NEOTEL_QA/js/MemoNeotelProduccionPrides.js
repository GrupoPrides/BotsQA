
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
        var displayMemoMin = $('#DivMinimizableWebChatBtn')[0].style.display;
        var displayNeotel = $('#cntNeoWebChat')[0].style.display;
        if (displayMemoMin == 'none' && displayNeotel == 'none') {
            $('#DivMinimizableWebChatBtn').css("display", "block");
        }
    });
});

var target = document.getElementById('cntNeoWebChat');
observer.observe(target, { attributes: true, attributeFilter: ['style'] });

function AvatarMemoClick() {
    $('#cntNeoChat').draggable(); startNeoWebChat();

    $('#DivMinimizableWebChatBtn').css("display", "none");
}