const fs = require('fs')
const http = require('http')
const path = require('path')

const finalhandler = require('finalhandler')
const parseurl = require('parseurl')
const serveStatic = require('serve-static')

module.exports = function createServer (root) {
  const serve = serveStatic(path.join(root, '.next'))
  const manifest = JSON.parse(fs.readFileSync(path.join(root, '.next/serverless/pages-manifest.json'), 'utf8'))

  return new http.Server((req, res) => {
    const done = finalhandler(req, res)

    if (req.url.startsWith('/_next/static')) {
      req.url = req.url.replace('/_next', '')
      return serve(req, res, done)
    }

    const { pathname } = parseurl(req)
    const handler = manifest[pathname]

    if (!handler) return done()

    if (handler.endsWith('.html')) {
      req.url = '/serverless/' + handler
      return serve(req, res, done)
    }

    try {
      require(path.join(root, '.next/serverless/', handler)).render(req, res)
    } catch (err) {
      done(err)
    }
  })
}
