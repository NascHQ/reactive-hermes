import React, {Component} from 'react'
import {render} from 'react-dom'

import { HermesComponent } from '../../src'
require('../../css/demo.scss')

class Demo extends Component {
  constructor (props) {
    super(props)

    // this.getNextMessage = 
    this.messages = {
      default: [
        'A defaule message here',
        'Coding is cool, right?',
        'Just another message',
        'Yet another useless message'
      ],
      warn: [
        'A warn message here',
        'Warns make me worried!',
        'Don\'t worry, this is just a warning',
        'Warning...warning...warning...',
        'You have been warned!'
      ],
      info: [
        'An info message here',
        'Info messages, wohoo!!',
        'Don\'t worry, this is just an info',
        'Make yourself informed with this!'
      ],
      error: [
        'OMG OMG OMG!',
        'DANGER!',
        'Something is out of order!',
        'Sorry...I got no idea!'
      ]
    }

    this.showRandomMessage = this.showRandomMessage.bind(this)
    this.showABunchOfMessages = this.showABunchOfMessages.bind(this)
  }
  showRandomMessage (data = {}) {
    data.type = data.type || 'default'
    let msg = this.messages[data.type]
    msg = msg[Math.ceil(Math.random() * (msg.length - 1))]
    data.body = msg
    Hermes.message(data)
  }
  showABunchOfMessages () {
    Hermes.message({body: 'Some random message'})
    Hermes.message({body: 'Ouch, something went wrong!', type: 'error'})
    Hermes.message({body: 'Another rather ordinary message!'})
    Hermes.message({body: 'Also this, for 3 seconds', type: 'info', duration: 3})
    Hermes.message({body: 'A warning message', type: 'warn'})
    Hermes.message({body: 'Another useless message', type: 'success'})
  }

  showSavingMessage () {
    Hermes.message({
      id: 'savingMessage',
      body: 'Saving...',
      locked: true,
      animate: true,
      playAudio: false
    })

    setTimeout(_ => {
      Hermes.updateMessage({
        id: 'savingMessage',
        body: 'Saved',
        type: 'success',
        locked: true,
        duration: 3
      })
    }, 3000)
  }

  showReactMessage () {
    Hermes.message({
      id: 'demoWithReact',
      duration: 99999,
      playAudio: false,
      body: <div className='react-example'>
        We could use other elements here:<br />
        <input type="text" placeholder='say something...' /><br />
        <textarea placeholder='why did you say that?' />
        <input type="button" value='ok' onClick={event => Hermes.closeMessage('demoWithReact')} />
      </div>
    })
  }

  render() {
    return <div>
      <HermesComponent
        defaultDuration='8'
        updateTitleCounter
        playAudio
        // animate
      />

      <h3>
        <div className='hermes-header' />
      </h3>

      <div className='example-container'>
        Just a message
        <div className='trigger-btn' type='button' onClick={event=>{this.showRandomMessage({type: 'default'})}} >►</div>
      </div>
      <div className='example-container'>
        A warning
        <div className='trigger-btn' type='button' onClick={event=>{this.showRandomMessage({type: 'warn', animate: false})}} >►</div>
      </div>
      <div className='example-container'>
        An error
        <div className='trigger-btn' type='button' onClick={event=>{this.showRandomMessage({type: 'error'})}} >►</div>
      </div>
      <div className='example-container'>
        An info
        <div className='trigger-btn' type='button' onClick={event=>{this.showRandomMessage({type: 'info'})}} >►</div>
      </div>
      <div className='example-container'>
        A locked message
        <div className='trigger-btn' type='button' onClick={event=>{Hermes.closeMessage('lockedMessage')}} >Hide</div>
        <div className='trigger-btn' type='button' onClick={event=>{this.showRandomMessage({locked: true, id: 'lockedMessage'})}} >Show</div>
      </div>
      <div className='example-container'>
        A bunch of messages
        <div className='trigger-btn' type='button' onClick={event=>{this.showABunchOfMessages()}} >►</div>
      </div>
      <div className='example-container'>
        Updating a message after a few seconds
        <div className='trigger-btn' type='button' onClick={event=>{this.showSavingMessage()}}> ►</div>
      </div>
      <div className='example-container'>
        Show message with a react component in it
        <div className='trigger-btn' type='button' onClick={event=>{this.showReactMessage()}}> ►</div>
      </div>

      <div className='footer'>
        <a href='https://github.com/NascHQ/reactive-hermes' target='_blank'>Github</a> | 
        <a href='https://www.npmjs.com/package/reactive-hermes' target='_blank'>NPM</a> | 
        <a href='https://twitter.com/felipenmoura' target='_blank'>@felipenmoura</a>
      </div>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
