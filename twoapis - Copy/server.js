const express = require('express');
const {contact} = require('./routes/contacts.js')
const {PORT} = require('./config/config.js');
const multer  = require('multer');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('hi bro')
})

app.use('/contactus',contact)

app.listen(PORT,()=>{
    console.log('server is created')
});