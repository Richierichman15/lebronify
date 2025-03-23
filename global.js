// global.js - Import polyfills needed for the app

// Import ReadableStream polyfill to fix the "ReadableStream is not defined" error
import 'web-streams-polyfill/ponyfill';

// Make the polyfill global
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = require('web-streams-polyfill/ponyfill').ReadableStream;
  global.TransformStream = require('web-streams-polyfill/ponyfill').TransformStream;
  global.WritableStream = require('web-streams-polyfill/ponyfill').WritableStream;
} 