# Node.js Version Upgrade Instructions

## Current Issue
This project requires Node.js 18 or higher, but you're currently using Node.js 16.13.2. This is causing compatibility issues with various dependencies, especially with the `ReadableStream` API.

## Solution: Upgrade Node.js

### Option 1: Using NVM (Node Version Manager)
If you already have NVM installed:

```bash
# Install Node.js 18 if not already installed
nvm install 18

# Use Node.js 18 for this project
nvm use 18

# Verify the version
node -v
```

### Option 2: Direct Installation
1. Download and install Node.js 18 or higher from [nodejs.org](https://nodejs.org/)
2. Verify the installation with `node -v`

### After Upgrading
After upgrading Node.js:

1. Clean your node_modules folder:
   ```bash
   rm -rf node_modules
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npm start
   ```

## Alternative Workaround
If you cannot upgrade Node.js, the current workaround using polyfills may not be stable. The polyfill approach has limitations and may not fully resolve all dependency issues.

For the best experience, please upgrade to Node.js 18 or higher. 