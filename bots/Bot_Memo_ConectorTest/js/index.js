'use strict';

const inputFrom = document.getElementById('txtFrom');
const inputText = document.getElementById('txtTexto');
const outputText = document.getElementById('txtOut');
const outputTextJson = document.getElementById('txtOutJson');

//global data
let url = 'https://connapineotel.azurewebsites.net/api/Message';
let convId = "";

const ValidaInput = (pFrom, pTexto) => {
    if (pFrom == '' || pFrom == undefined || pFrom == null) {
        alert('Ingrete su From.');
        return false;
    }
    if (pTexto == '' || pTexto == undefined || pTexto == null) {
        alert('Ingrete su mensaje.');
        return false;
    }
    return true;
};

const SendMessageToBotMemo = async () => {

    let valText = inputText.value;
    let valFrom = inputFrom.value;
    if (ValidaInput(valFrom, valText) == false) {
        return;
    }

    ConcatenarMsj(valFrom + ": " + valText);


    var raw = JSON.stringify({
        "text": valText,
        "campaignCode": "123",
        "conversationId": convId,
        "from": valFrom,
        "channel": "webchat"
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    SendRequestHttp(requestOptions);

}

const SendRequestHttp = async (pRequestOptions) =>{
    await fetch(url, pRequestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            //check for error response
            if (!response.ok) {
                //get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            ConcatenarJson(data);
            convId = data.conversationId;
            ConcatenarMsj( 'Bot: ' + data.text);

        }).catch(error => {
            console.log('error', error);
        });
};

const ConcatenarMsj = (msj) => {
    outputText.innerHTML += msj + "\n\n";
    outputText.scrollTop = outputText.scrollHeight;
}

const ConcatenarJson = (data) => {    
    outputTextJson.innerHTML = JSON.stringify(data);;
    outputTextJson.scrollTop = outputTextJson.scrollHeight;
}
