const express = require('express')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const Issue = require('./models/issue')

const port = 8086

var mongoDB = 'mongodb+srv://cata:cata@cluster0.wcbqw.mongodb.net/first?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/issue', async (req, res) => {
    let newIssue = req.body
    var addIssue=new Issue({name:newIssue.name})
    await Issue.create(addIssue)
    res.send(newIssue)
})

app.get('/issue', async (req, res) =>{
    const record= await Issue.find({})
    res.json(record)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })