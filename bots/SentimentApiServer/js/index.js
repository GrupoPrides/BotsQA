'use strict';

//global data
let url = 'https://sentapisapimgmt.azure-api.net/sent';
const selectInput = document.getElementById('sltMethodsApi');
const divAudioFile = document.getElementById('divAudioFile');
const divTexto = document.getElementById('divTexto');
const divBtnEnviar = document.getElementById('divBtnEnviar');

const txtFile = document.getElementById('txtFile');
const txtTexto = document.getElementById('txtTexto');
const outputTextJson = document.getElementById('txtOutJson');
const loader = document.getElementById('loader');
const txtEndpoint = document.getElementById('txtEndpoint');
const txtKey = document.getElementById('txtKey');


const ResetUrl = () => {
    url = 'https://sentapisapimgmt.azure-api.net/sent';
    outputTextJson.innerHTML = '';
    txtFile.value = '';
    txtTexto.value = '';
    txtEndpoint.innerHTML = 'Endpoint api:';
};
const ShowInputs = () => {

    if (selectInput.value.startsWith("/audio")) {
        divTexto.hidden = true;
        divAudioFile.hidden = false;
        divBtnEnviar.hidden = false;

        ResetUrl();
        url += selectInput.value;
    } else if (selectInput.value.startsWith("/analyze")) {
        divTexto.hidden = false;
        divBtnEnviar.hidden = false;
        divAudioFile.hidden = true;

        ResetUrl();
        url += selectInput.value;

    } else if (selectInput.value.startsWith("/version")) {
        divBtnEnviar.hidden = false;
        divTexto.hidden = true;
        divAudioFile.hidden = true;

        ResetUrl();
        url += selectInput.value;

    } else if (selectInput.value.startsWith("/errors")) {
        divBtnEnviar.hidden = false;
        divTexto.hidden = true;
        divAudioFile.hidden = true;

        ResetUrl();
        url += selectInput.value;

    } else {
        divTexto.hidden = true;
        divAudioFile.hidden = true;
        divBtnEnviar.hidden = true;
        alert('Seleccione un metodo del API');
    }

};
const ValidateInputs = (pvalFile, pvalText) => {

    if (txtKey.value == '' || txtKey.value == undefined || txtKey.value == null) {
        alert('Ingrese su SecretKey.');
        return false;
    }
    if (!divAudioFile.hidden && (pvalFile == '' || pvalFile == undefined || pvalFile == null)) {
        alert('Ingrese su audio.');
        return false;
    }
    if (!divTexto.hidden && (pvalText == '' || pvalText == undefined || pvalText == null)) {
        alert('Ingrese su texto.');
        return false;
    }
    return true;
};
const ConcatJson = (data) => {
    outputTextJson.innerHTML = JSON.stringify(data, undefined, 4)
    outputTextJson.scrollTop = outputTextJson.scrollHeight;
    txtEndpoint.innerHTML = 'Endpoint api: ' + url;
};
const SendMessageToSentimentApiServer = async () => {
    let valFile = txtFile.value;
    let valText = txtTexto.value;
    if (ValidateInputs(valFile, valText) == false) {
        return;
    }

    if (!divAudioFile.hidden || !divTexto.hidden) {
        SendRequestHttp(CreatePOSTRequestoptions(valText));
    } else {
        SendRequestHttp(CreateGETRequestoptions(valText));
    }
};
const SendRequestHttp = async (pRequestOptions) => {
    loader.hidden = false;
    await fetch(url, pRequestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            //check for error response
            if (!response.ok) {
                //get error message from body or default to response status
                const error = (data && data.detail) || response.status;
                return Promise.reject(error);
            }

            ConcatJson(data);

            loader.hidden = true;
        }).catch(error => {
            loader.hidden = true;
            console.log('error', error);
            alert('Ocurrio un error en el llamado al SentimentApiServer');
        });
};
const CreateJsonToRequest = (pValText) => {
    var raw = JSON.stringify({
        "text": pValText,
        "region": "Costa Rica",
        "context": "Servicio Chat Bot"
    });
    return raw;
};
const CreatePOSTRequestoptions = (pValText) => {
    var myHeaders = new Headers();
    myHeaders.append("ocp-apim-subscription-key", txtKey.value);


    if (!divAudioFile.hidden) {
        myHeaders.append("Accept", "application/json");
        // myHeaders.append("Content-Type", "multipart/form-data");

        const formdata = new FormData();
        formdata.append("audio_file", txtFile.files[0], txtFile.files[0].name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return requestOptions;

    } else if (!divTexto.hidden) {
        myHeaders.append("Content-Type", "application/json");
        let JsonRaw = CreateJsonToRequest(pValText);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JsonRaw,
            redirect: 'follow'
        };

        return requestOptions;
    }
};
const CreateGETRequestoptions = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("ocp-apim-subscription-key", txtKey.value);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    return requestOptions;
};