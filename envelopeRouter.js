const express = require('express')
const envelopeRouter = express.Router()
const envelopes = require('./data.js')
const {getEnvelopes} = require('./utils.js')

//GET all
envelopeRouter.get('/', function(req, res) => {
    const allEnvelopes = getEnvelopes()
    res.send(allEnvelopes)
})

//GET one
envelopeRouter.get('/id', (req, res) => {
})
//PUT
envelopeRouter.put('/id',(req,res)=>{

})
//POST
envelopeRouter.post('/',(req,res)=>{

})
//DELETE
envelopeRouter.delete('/id',(req,res)=>{

})
module.exports = envelopeRouter;