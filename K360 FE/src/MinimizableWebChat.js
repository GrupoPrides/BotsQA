import React from 'react';
import { createStore, createStyleSet } from 'botframework-webchat';


import WebChat from './WebChat';
import './fabric-icons-inline.css';
import './MinimizableWebChat.css';

import 'core-js/es6/map';
import 'core-js/es6/promise'
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/includes';
import 'core-js/fn/math/sign';
import 'core-js/fn/object/assign';
import 'core-js/fn/string/starts-with';
//import { fetch as fetchPolyfill } from 'whatwg-fetch';
import $ from "jquery";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleFetchToken = this.handleFetchToken.bind(this);
    this.handleMaximizeButtonClick = this.handleMaximizeButtonClick.bind(this);
    this.handleMinimizeButtonClick = this.handleMinimizeButtonClick.bind(this);
    this.handleSwitchButtonClick = this.handleSwitchButtonClick.bind(this);

    const cardActionMiddleware = () => next => async ({ cardAction, getSignInUrl }) => {
      const { type, value } = cardAction;
      switch (type) {
        case 'signin':
          // For OAuth or sign-in popups, we will open the auth dialog directly.
          const popup = window.open();
          const url = await getSignInUrl();
          popup.location.href = url;
          break;
        case 'openUrl':
          window.open(value, '_Self');
          break;
        default:
          return next({ cardAction, getSignInUrl });
      }
    };
    const store = createStore({}, ({ dispatch }) => next => action => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        setTimeout(() => {
          dispatch({
            type: 'WEB_CHAT/SEND_EVENT',
            payload: {
              name: 'webchat/join',
              value: {
                language: window.navigator.language
              },

            }
          });
        }, 1000);

        this.displayAnimation();

        if (localStorage.getItem('welcome') === 'true') {
          setTimeout(() => {
            dispatch({
              type: 'WEB_CHAT/SEND_EVENT',
              payload: {
                name: 'requestWelcomeDialog',
                value: {
                  language: window.navigator.language
                }
              }
            });
          }, 1000);
        }
      } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        if (action.payload.activity.from.role === 'bot') {
          this.setState(() => ({ newMessage: true }));
        }
      }
      return next(action);
    });

    this.state = {
      minimized: true,
      newMessage: true,
      side: 'right',
      store,
      cardActionMiddleware,
      styleSet: createStyleSet({
        backgroundColor: 'Transparent',
        flex: 1
      }),
      token: null
    };
  }
  async handleFetchToken() {
    debugger
    var url = 'https://directline.botframework.com/v3/directline/tokens/generate';
    console.log('token ' + localStorage.getItem('token') + ' Expire ' + localStorage.getItem('expires') + ' fechaActual ' + new Date().getTime());
    console.log(new Date().getTime() > localStorage.getItem('expires'));
    if ((!localStorage.getItem('token') || !localStorage.getItem('expires')) || new Date().getTime() > localStorage.getItem('expires')) {
      console.log('Obteniendo Token');
      const res = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
           //'Authorization': 'Bearer ' + '', //k360 pr
          'Authorization': 'Bearer ' + 's6V9oh5Qswg.5btcquRrDmjTm-RiQ8B9u976bHnpYg3GhZVVIWxRD5w',//k360 qa 
          'Content-Type': '"Content-Type", "application/json"'
        }
      })

      const { token, conversationId, expires_in } = await res.json();//
      localStorage.setItem('token', token)
      localStorage.setItem('conversationId', conversationId)
      localStorage.setItem('expires', new Date().getTime() + expires_in * 1000)
      localStorage.setItem('welcome', true);
      debugger
      //localStorage.setItem('expires', new Date().getTime() +  expires_in * 1000) 
      this.setState({ token })
    } else {
      this.setState({ token: localStorage.getItem('token') })
      localStorage.setItem('welcome', false);
    }

  }

  displayAnimation() {
    //var ROOT_FOLDER = 'https://botmemostorage.blob.core.windows.net/memo-bot/img/memo-version-final.png';
    var ROOT_FOLDER = 'https://images.squarespace-cdn.com/content/v1/5b9d4d4a5cfd7967a7b39d4f/1561271572018-WF1U78BM5AR7GPT5TFES/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmrMDYraMJMCQwFxTSOIP7LpSBEQpA-g5k6VTjWbSuadHJq0dp98hg5AZvIaPb3DoM/chatbot+avatar+Cute_V9-10.png?format=1000w';

    console.log('displayAnimation');
    // var imgName = Math.floor(Math.random()*4) + 1;
    // var ROOT_FOLDER = 'https://gpbot.azureedge.net/ict/webchat/'
    // setTimeout(function(){
    //03.PNG
    $('.css-ljhy6a.css-7c9av6')
      .append($('<li id="animation-item" class="css-1qyo5rb">'
        + '<div class="css-hgucfj css-1wi3416">'    //1
        + '<div class="css-7xorrq avatar"></div>'
        + '<div class="content">' //2
        + '<div class="row message">' //3
        + '<div class="css-ostbv8 bubble">' //4
        + '<div class="markdown css-o3xlyv"><p>' //5
        // + '<img src="' + ROOT_FOLDER + 'img/anim/' + imgName + '.png" class="animation-image" />'
        + '<img style="width: 100%;height: auto;" src="' + ROOT_FOLDER + '" class="animation-image" />'
        + '</p></div>' //5
        + '</div>' //4
        + '<div class="filler"></div>'
        + '</div>' //3
        + '<div class="row">'
        + '<span class="css-1phiexw">'
        // + 'Just now'
        + '</span>'
        + '<div class="filler"></div>'
        + '</div>'
        + '</div>' //2
        + '<div class="filler"></div>'
        + '</div>' //1
        + '</li>').hide().fadeIn(2000));

    $('#animation-item').delay(10000).fadeOut(2000);
    // }, 1000);
  }

  handleMaximizeButtonClick() {
    this.setState(() => ({
      minimized: false,
      newMessage: false
    }));
  }

  handleMinimizeButtonClick() {
    this.setState(() => ({
      minimized: true,
      newMessage: true
    }));
  }

  handleSwitchButtonClick() {
    this.setState(({ side }) => ({
      side: side === 'left' ? 'right' : 'left'
    }));
  }

  render() {
    const { state: {
      minimized,
      newMessage,
      side,
      store,
      cardActionMiddleware,
      styleSet,
      token
    } } = this;

    return (
      <div className="minimizable-web-chat">
        {
          minimized ?
            <button
              className="maximize"
              onClick={this.handleMaximizeButtonClick}
            >
              {/* <span className={ token ? 'ms-Icon ms-Icon--MessageFill' : 'ms-Icon ms-Icon--Message' } /> */}
              {
                newMessage &&
                <span className="red-dot">1</span>
              }
              {/*it is going to inside before brackets <span className="ms-Icon ms-Icon--CircleShapeSolid red-dot">1</span>
              
              04.PNG
              */}
            </button>
            :
            <div
              className={side === 'left' ? 'chat-box left' : 'chat-box right'}
            >
              <header>
                <div className="filler">
                  {/* Nuevo */}
                  <div className="title-username">
                    <label>k360</label>
                    {/* <img src="https://gpbot.azureedge.net/ict/webchat/img/Costa-Rica-Flag-icon.png" alt="Mr. Sloth"></img> */}
                  </div>
                  <div className="title-online-status">
                    <div class="green_dot"></div> <label>En Línea</label>
                  </div>
                  {/* Fin Nuevo */}
                </div>

                <button
                  className="switch"
                  onClick={this.handleSwitchButtonClick}
                >
                  <span className="ms-Icon ms-Icon--Switch" />
                </button>
                <button
                  className="minimize"
                  onClick={this.handleMinimizeButtonClick}
                >
                  <span className="ms-Icon ms-Icon--ChromeMinimize" />
                </button>
              </header>

              <WebChat
                className="react-web-chat"
                onFetchToken={this.handleFetchToken}
                store={store}
                cardActionMiddleware={cardActionMiddleware}
                styleSet={styleSet}
                token={token}
              />
            </div>
        }
      </div>
    );
  }
}
