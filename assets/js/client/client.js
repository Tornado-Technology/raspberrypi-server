import { Socket } from 'net';

const client = new Socket();

client.connect(3000, '127.0.0.1', () => {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
	console.log(`Recived: ${data.toString()}`);
	client.destroy();
});

client.on('close', () => {
	console.log('Connection closed');
});