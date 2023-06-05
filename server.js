const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./api')
// const db = require('./db/db')
const app = express();
const port = 4000;

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/api', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

