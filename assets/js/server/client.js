export default class Client {
  constructor(socket) {
    this.socket = socket;
  }

  onDisconnect() {

  }

  get ip() {
    return this.socket.remoteAddress;
  }

  get port() {
    return this.socket.remotePort;
  }
}
