const express = require('express')
const envelopeRouter = express.Router()
const bodyParser = require('body-parser');
const {
  startingBalance,
  totalBudget,
  remainingBudget,
  getEnvelopeById,
  getEnvelopes,
  addNewEnvelope
} = require('./data.js')
envelopeRouter.use(bodyParser.json())

//GET all
envelopeRouter.get('/envelopes', (req, res) => {
    const allEnvelopes = getEnvelopes()
    res.send(allEnvelopes)
})

//GET one
envelopeRouter.get('/envelopes/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const envelope = getEnvelopeById(id)
  
    if (envelope === -1){
      res.status(404).send('Envelope ID not found!');
    } else{
      res.send(envelope);
    }
})

envelopeRouter.post('/envelopes/new-envelope', (req, res, next) => {
  const body = req.body
  const addedEnvelope = addNewEnvelope(body.category, body.budget)

  res.status(201).send(addedEnvelope);
})

module.exports = envelopeRouter;