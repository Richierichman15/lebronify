// Register polyfills for Node.js
const { ReadableStream, WritableStream, TransformStream } = require('web-streams-polyfill');

// Set global objects for Node.js environment
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;

console.log('Polyfills registered successfully!'); 