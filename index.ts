import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

const server = http.createServer();
const basicDir = path.join(__dirname, 'public');
const cacheAge = 3600 * 24 * 365;

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const urlObj = url.parse(request.url);
  let pathName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
  const realPath = path.join(basicDir, pathName);
  fs.readFile(realPath, (error, data) => {
    if (error) {
      switch (error.errno) {
        case -4058:
          response.statusCode = 404;
          fs.readFile(path.resolve(basicDir, '404.html'), (error2, data2) => {
            response.end(data2);
          });
          break;
        case -4068:
          response.statusCode = 403;
          response.end('no access');
          break;
        default:
          response.statusCode = 500;
          response.end('internal error');
      }
      return;
    }
    response.statusCode = 200;
    response.setHeader('Cache-Control', `public,max-age=${cacheAge}`);
    response.end(data);
  });

  const array = [];
  // request.on('data', (chunk) => {
  //   array.push(chunk);
  // });
  // request.on('end', () => {
  //   const body = Buffer.concat(array).toString();
  //   console.log('body', body);
  //   response.end('aaaaa');
  // });
  // response.statusCode = 200;
  // response.end('hi~');

});

server.listen('8888');

