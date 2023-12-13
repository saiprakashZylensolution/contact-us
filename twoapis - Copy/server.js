const express = require('express');
const {contact} = require('./routes/contacts.js');
const {hire} = require('./routes/hire.js')
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
app.use('/hire',hire)

app.listen(PORT,()=>{
    console.log('server is created')
});