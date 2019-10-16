# Next.js Serverless Server

A plain Node.js server that serves a [Next.js](https://nextjs.org) app built for the `serverless` target.

## Installation

```sh
npm install --save next-serverless-server
```

## Usage

```js
const server = require('next-serverless-server')

server(__dirname).listen(3000, (err) => {
  if (err) throw err

  console.log('> Ready on http://localhost:3000')
})
```

## API

### `server(root: string): http.Server`

Creates a new `http.Server` with a request handler attached for serving the Next.js app.

The `root` argument should be the path to the folder of your app, that is the folder that _contains_ the `.next` folder.

Note that your Next.js app must be built with the `target: 'serverless'` option specified.
