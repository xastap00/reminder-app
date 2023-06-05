const express = require('express')
var cookieParser = require('cookie-parser')
const router = require('./api')
// const db = require('./db/db')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/api', router);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

