// Import the polyfill and set up global objects
const { ReadableStream, WritableStream, TransformStream } = require('web-streams-polyfill');

// Assign globals before requiring any other modules
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;

console.log('Polyfills registered successfully!');

// Run the Expo CLI programmatically
const { spawn } = require('child_process');
const path = require('path');

// Launch Expo start process
const expo = spawn('npx', ['expo', 'start'], {
  stdio: 'inherit',
  shell: true
});

// Handle process exit
expo.on('exit', (code) => {
  process.exit(code);
}); 