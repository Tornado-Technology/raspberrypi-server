import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { dirname } from 'path'
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 8080;

export default class HttpServer {
  static instance = undefined;
  
  static start(port) {
    console.log('HTTP Server starting...');
    this.instance = createServer(this.#requestListener);  
    this.instance.listen(port, () => {
      console.log(`HTTP Server start on http://raspberrypi.local:${port}`);
    });
  }

  static #requestListener(req, res) {
    const path = `${__dirname}${req.url === '/' ? '/index.html' : req.url}`;
    const contentType = this.#getContentType(path);

    // Load
    fs.readFile(path, (err, data) =>  {
      if (err) {
        this.#load404Page(res);
      }
      
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(data);
    });
  }

  static #getContentType(path) {
    const pathSplit = path.split('.')
    const extension = pathSplit[pathSplit.length - 1];
    let contentType = '';

    // Choose type
    switch (extension) {
      case 'ico':
        contentType = 'image/x-icon';
        break;

      case 'css':
        contentType = 'text/css';
        break;

      case 'js':
        contentType = 'text/javascript';
        break;

      case 'html':
        contentType = 'text/html';
        break;

      default:
        contentType = 'text';
        break;
    }

    return contentType;
  }

  static #load404Page(res) {
    fs.readFile(`${__dirname}/404.html`, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error');
        return;
      }

      res.writeHead(404, { 
        'Content-Type': 'text/html' 
      });
      res.end(data);
    });
    return;
  }
}
