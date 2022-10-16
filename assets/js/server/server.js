import { createServer } from 'net';
import Client from './client.js';

export default class Server {
  static instance = undefined;
  static clients = [];

  static start(port) {
    console.log('Server startig...')
    this.instance = createServer(this.requestListener)
    this.instance.listen(port, () => {
      console.log(`Server start on http://raspberrypi.local:${port}.`)
    });
  }
  
  static requestListener(socket) {
    console.log(`Socket connected from ${socket.remoteAddress}:${socket.remotePort}.`);
    const client = this.createClient(socket);

    socket.on('error', (error) => {
      if (error.message.includes('ECONNRESET')) {
        return;
      }

      console.error(`Socket error: ${error}.`)
    });

    socket.on('data', (data) => {
      console.log(data.toString());
    });

    socket.on('close', () => {
      client.onDisconnect();
      console.log('Socket closed.')
    });
  }

  static createClient(socket) {
    const client = new Client(socket);
    this.clients.push(client);
    return client;
  }
}
