const express = require('express');
const envelopeRouter = express.Router();
const envelopes = require('./data.js');

//GET all
envelopeRouter.get('/', (req, res) => {
    res.send({envelopes:envelopes})
})

//GET one
envelopeRouter.get('/id', (req, res) => {
    const selectedId = Number(req.query.selectedId);
    const lengthOfEnvelopesArray = envelopes.envelopes.length;

    if (selectedId > 0 && selectedId <= lengthOfEnvelopesArray) {
        res.status(200).send({selectedCategory: envelopes.envelopes[selectedId - 1]});
    } else {
        res.status(404).send('ID Not Found')
    }
})
//PUT
envelopeRouter.put('/:id',(req,res)=>{

})
//POST
envelopeRouter.post('/',(req,res)=>{

})
//DELETE
envelopeRouter.delete('/:id',(req,res)=>{

})
module.exports = envelopeRouter;