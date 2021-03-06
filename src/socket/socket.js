import * as protocol from './protocol'
import * as tool from '@/tool'

let WS = 'ws://127.0.0.1:4999'

export class CWebSocket {
  constructor () {
    this.listenerList = {}
    this.socket = new WebSocket(WS)
    this.socket.onopen = () => {
      let data = tool.getToken()
      this.C2SMessage(this.C2S_LOGIN, data)
    }
    this.socket.onmessage = (...args) => {
      console.log(args)
      this.S2CMessage(...args)
      
    }
    this.socket.onerror = (...args) => {
      this.onerror(args)
    }
    for (let key in protocol) {
      this[key] = protocol[key]
    }
    this.initListener()
  }
  
  addListener (protocol, func) {
    if (!this.listenerList[protocol]) {
      this.listenerList[protocol] = []
    }
    this.listenerList[protocol].push(func)
  }
  removeListener (protocol, func) {
    if (!func) {
      this.listenerList[protocol] = undefined
      return
    }
    if (!this.listenerList[protocol]) return
    let index = this.listenerList.findIndex(func)
    index !== -1 && this.listenerList[protocol].splice(index, 1)
  }
  S2CMessage (event) {
    let msg = JSON.parse(event.data)
    let { protocol, data } = msg
    if (!this.listenerList[protocol]) return
    this.listenerList[protocol].forEach(func => func(data))
  }
  C2SMessage (protocol, data) {
    let msg = {
      protocol,
      data
    }
    this.socket.send(JSON.stringify(msg))
  }
  onerror (error) { 
    console.log('error', error)
  }
  clearEvent () {
    this.socket.onopen = null
    this.socket.onmessage = null
    this.socket.onerror = null
  }
  close () {
    if (this.socket) {
      for (let protocol in this.listenerList) {
        this.removeListener(protocol)
      }
      this.socket.onopen = null
      this.socket.onmessage = null
      this.socket.close()
      this.socket = null
    }
  }
  initListener () {
    let data = {
      [this.S2CLOGIN]: this.login.bind(this)
    }
    for (let key in data) {
      this.addListener(key, data[key])
    }
  }
  login (data) {
    console.log(data)
  }
}
