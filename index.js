var express = require('express')
var app = express()
var port = 3000
const cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./routes')
var mongoose = require('mongoose');
var MONGO_URL = 'mongodb+srv://ramshadak:5267447689rty@cluster0.5txro.mongodb.net/test?retryWrites=true&w=majority'

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose.connect(MONGO_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,})
   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})