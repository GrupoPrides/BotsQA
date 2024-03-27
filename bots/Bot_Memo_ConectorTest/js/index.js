'use strict';

//global data
let url = 'https://connapineotel.azurewebsites.net/api/Message';
let convId = "";
let from = "";
const inputFrom = document.getElementById('txtFrom');
const inputText = document.getElementById('txtTexto');
const outputText = document.getElementById('txtOut');
const outputTextJson = document.getElementById('txtOutJson');

const ValidateInputs = (pFrom, pTexto) => {
    if (pFrom == '' || pFrom == undefined || pFrom == null) {
        alert('Ingrese su From.');
        return false;
    }
    if (pTexto == '' || pTexto == undefined || pTexto == null) {
        alert('Ingrese su mensaje.');
        return false;
    }
    return true;
};

const SendMessageToBotMemo = async () => {
    let valText = inputText.value;
    let valFrom = inputFrom.value;
    if (ValidateInputs(valFrom, valText) == false) {
        return;
    }
    ValidateNewFrom(valFrom);
    ConcatMsj(valFrom + ": " + valText);
    SendRequestHttp(CreateRequestoptions(valText));
}

const SendRequestHttp = async (pRequestOptions) => {
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

            ConcatJson(data);
            convId = data.conversationId;
            ConcatMsj('Bot: ' + data.text);

        }).catch(error => {
            console.log('error', error);
        });
};

const ConcatMsj = (msj) => {
    outputText.innerHTML += msj + "\n\n";
    outputText.scrollTop = outputText.scrollHeight;
}

const ConcatJson = (data) => {
    outputTextJson.innerHTML = JSON.stringify(data, undefined, 4);;
    outputTextJson.scrollTop = outputTextJson.scrollHeight;
}

const ValidateNewFrom = (valFrom) => {
    if (valFrom != from) {
        from = valFrom;
        convId = "";
        outputText.innerHTML = '';
    }
};

const CreateJsonToRequest = (pValText) => {
    var raw = JSON.stringify({
        "text": pValText,
        "campaignCode": "123",
        "conversationId": convId,
        "from": from,
        "channel": "webchat"
    });
    return raw;
};

const CreateRequestoptions = (pValText) => {
    let JsonRaw = CreateJsonToRequest(pValText);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JsonRaw,
        redirect: 'follow'
    };

    return requestOptions;
};