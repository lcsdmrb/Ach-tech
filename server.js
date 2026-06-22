// server.js — Point d'entrée Phusion Passenger pour Hostinger
// Passenger cherche ce fichier à la racine de l'app (nodejs/server.js)
const next = require('next')
const { createServer } = require('http')
const { parse } = require('url')

const port = parseInt(process.env.PORT || '3000', 10)
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ach'Tech ready on http://localhost:${port}`)
  })
}).catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
