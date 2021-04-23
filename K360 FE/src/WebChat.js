import memoize from 'memoize-one';
import React from 'react';
import ReactWebChat, { createDirectLine, createStyleSet } from 'botframework-webchat';
import './WebChat.css';
import 'core-js/es6/map';
import 'core-js/es6/promise'
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/includes';
import 'core-js/fn/math/sign';
import 'core-js/fn/object/assign';
import 'core-js/fn/string/starts-with';


export default class extends React.Component {
  constructor(props) {
    super(props);
    //conversationId: localStorage.getItem('conversationId')
    this.createDirectLine = memoize(token => createDirectLine({ token: token }));

    //01.png
    this.state = {
      styleSet: createStyleSet({
        backgroundColor: 'Transparent',
        botAvatarImage: 'https://botmemostorage.blob.core.windows.net/memo-bot/img/AvatarMemo.png',
        botAvatarInitials: 'Memo',
        userAvatarImage: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png',
        userAvatarInitials: 'User'
      })
    };
  }

  componentDidMount() {
    console.log('componentDidMount' + this.props.token);
    !this.props.token && this.props.onFetchToken();
  }

  render() {
    const {
      props: { className, store, cardActionMiddleware, token },
      state: { styleSet }
    } = this;
    return (
      token ?
        <ReactWebChat
          className={`${className || ''} web-chat`}
          directLine={this.createDirectLine(token)}
          store={store}
          cardActionMiddleware={cardActionMiddleware}
          styleSet={styleSet}
        />
        :
        <div className={`${className || ''} connect-spinner`}>
          <div className="content">
            <div className="icon">
              {/* 01.png */}
              <span className="avat" />
            </div>
            <p style={{ color: 'black', fontSize: '25px' }}>Por favor espere, nos estamos conectando!.</p>
          </div>
        </div>

    );
  }
}
