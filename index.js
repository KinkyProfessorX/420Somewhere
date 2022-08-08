const app = require('express')()
const _ = require('lodash')
const indexPage = require('./pages/index');
const PORT = 8080

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');

  res.send(Buffer.from(indexPage()))
}) 

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))