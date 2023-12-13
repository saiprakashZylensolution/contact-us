const contact = require('express').Router();
const multer  = require('multer');
const upload = multer()

const {getDetails} = require('../controller/contactFunc.js')

contact.get('/', (req, res) => {
    res.status(200).send('this is contact page')
});

contact.post('/',upload.fields([
    {name:'name'},
    {name:'phone'},
    {name:'email'},
    {name:'company'},
    {name:'project decription'},
    {name:'attachment',maxCount:1},
    {name:'projectbudget'}
]),getDetails)

module.exports={
    contact
}