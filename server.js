const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./api')
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "..", "client/build")));
app.use(express.static("client/build"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
  credentials: true,
  origin: 'https://reminder-app-ad.fly.dev',
}));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/api', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

