import React, {Component} from 'react'
require('../css/default.scss')

function* idsGen () {
  let i = 0
  while(true) {
    i++
    yield i
  }
}
const idGen = idsGen()

export const Hermes = {
  mountedInstance: null,
  message: (content, data) => {
    if (!data) {
      data = content
    } else {
      data.body = content
    }
    if (global.Hermes.mountedInstance) {
      if (typeof data === 'string') {
        data = {
          body: data,
          duration: 10
        }
      }
      global.Hermes.mountedInstance.addMessage(data)
    }
  },
  updateMessage: (data) => {
    if (global.Hermes.mountedInstance) {
      global.Hermes.mountedInstance.updateMessage(data.id, data)
    }
  },
  closeMessage (messageId) {
    if (global.Hermes.mountedInstance) {
      global.Hermes.mountedInstance.removeMessage(messageId)
    }
  },
  warn (message, options = {}) {
    options.type = 'warn'
    global.Hermes.message(message, options)
  },
  warning (message) {
    options.type = 'warn'
    global.Hermes.message(message, options)
  },
  error (message) {
    options.type = 'error'
    global.Hermes.message(message, options)
  },
  fail (message) {
    options.type = 'error'
    global.Hermes.message(message, options)
  },
  info (message) {
    options.type = 'info'
    global.Hermes.message(message, options)
  },
  success (message) {
    options.type = 'success'
    global.Hermes.message(message, options)
  }
}

global.Hermes = Hermes

export class HermesComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      originalTitle: document.title
    }
  }

  setMessageDuration (data) {
    let duration = data.duration || (data.locked ? null : this.props.defaultDuration)
    if (duration) {
      let s = Math.max(1, duration) * 1000
      data.to = setTimeout(_ => {
        this.removeMessage(data)
      }, s)
    }
    return data
  }

  updateTitleCounter () {
    if (this.props.updateTitleCounter) {
      let counter = this.state.messages.filter(_=>_).length
      if (document.title) {
        if (counter) {
          document.title = '(' + counter + ') ' + this.state.originalTitle
        } else {
          document.title = this.state.originalTitle
        }
      }
    }
  }

  addMessage (data) {
    if (!Object.isExtensible(data)) {
      // this is probably a react component
      data = {
        body: data
      }
    }
    data.id = data.id || idGen.next().value
    let list = this.state.messages
    list[data.id] = data

    data = this.setMessageDuration(data)
    // if (duration) {
    //   let s = duration * 1000
    //   data.to = setTimeout(_ => {
    //     this.removeMessage(data)
    //   }, s)
    // }

    this.setState({
      messages: list
    }, _ => {
      this.updateTitleCounter()
      data = this.setMessageDuration(data)
      if (data.onShow) {
        data.onShow(data)
      }
    })
  }

  updateMessage (id, data) {
    let list = this.state.messages
    if (id && list[id]) {
      let message = list[id]
      message.body = data.body
      message.type = data.type
      if (data.duration) {
        if (message.to) {
          clearTimeout(message.to)
        }
        message = this.setMessageDuration(data)
      }
      list[id] = message
      this.setState({
        messages: list
      })
    } else {
      data.id = id || data.id || idGen.next().value
      this.addMessage(data)
    }
  }

  removeMessageElement (data) {
    let id = data && data.id ? data.id : data
    let list = this.state.messages
    delete list[id]
    this.setState({
      messages: list
    }, _ => {
      this.updateTitleCounter()
      if (data.to) {
        clearTimeout(data.to)
      }
    })
  }

  removeMessage (data) {
    let id = data && data.id ? data.id : data
    let list = this.state.messages
    if (list[id]) {
      list[id].removing = true
      this.setState({
        messages: list
      }, _ => {
        setTimeout(_ => {
          this.removeMessageElement(data)
        }, 1000)
      })
    }
  }

  componentDidMount () {
    global.Hermes.mountedInstance = this
  }

  render () {
    let notifs = Object.keys(this.state.messages)
    return <div id='hermes-container'>
      {
        notifs.map((messageId, i) => {
          let message = this.state.messages[messageId]
          let order = (notifs.length - i)
          return message
            ? <div
              key={message.id}
              className={`hermes-notif ${message.animate ? 'animate' : ''} hermes-${message.type || 'default'} ${(message.removing ? 'removing' : '')}`}
              style={message.removing ? { order } : {
                animationDelay: (i * 0.1) + 's',
                order
              }}>
              {message.body}
              {
                message.locked && message.id
                  ? null
                  : <span
                    className='hermes-remove-message'
                    onClick={event => this.removeMessage(message)}>x</span>
              }
            </div>
            : null
        })
      }
    </div>
  }
}

export default global.Hermes

// These global methods below, are o help you in case you was already using
// Bert's show[info/error/warning/success]
export const showInfo = (message) => {
  window.Hermes.updateMessage({
    body: message,
    duration: 10,
    type: 'info'
  })
}

export const showError = (message) => {
  window.Hermes.updateMessage({
    body: message,
    duration: 15,
    id: message,
    type: 'error'
  })
}

export const showWarning = (message) => {
  window.Hermes.updateMessage({
    body: message,
    duration: 10,
    type: 'warn'
  })
}

export const showSuccess = (message) => {
  window.Hermes.updateMessage({
    body: message,
    duration: 4,
    id: 'success',
    type: 'default'
  })
}


/*  SAMPLES
window.Hermes.message({body: 'Outra mensagem', type: 'error'})
window.Hermes.message({body: 'Uma mensagem aqui'})
window.Hermes.message({body: 'Also this', type: 'info', duration: 3})
window.Hermes.message({body: 'Oh my gosh!', type: 'warn'})
window.Hermes.message({body: 'Mais uma mensavem inútil aqui :)'})
window.Hermes.updateMessage({body: 'Saving...', locked: true, id: 'savingMSG'})
setTimeout(function () {
  window.Hermes.updateMessage({body: 'Saved', locked: true, id: 'savingMSG', duration: 3})
}, 6000)
*/
