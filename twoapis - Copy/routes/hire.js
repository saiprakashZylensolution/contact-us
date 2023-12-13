const hire = require('express').Router();
const multer  = require('multer');
const upload = multer();
const {hireDetails} = require('../controller/contactFunc.js')

hire.post('/',upload.fields([
    {name:'name'},
    {name:'email'},
    {name:'phone'}
    ]),hireDetails)


module.exports = {
    hire
}