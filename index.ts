import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  console.log('aaaaaaaa', response.constructor);
  console.log(request.url);
  console.log(request.method);
  const array = [];
  // request.on('data', (chunk) => {
  //   array.push(chunk);
  // });
  // request.on('end', () => {
  //   const body = Buffer.concat(array).toString();
  //   console.log('body', body);
  //   response.end('aaaaa');
  // });
  response.statusCode = 200;
  response.end('hi');
});

server.listen('8888');

