const express = require('express')
const envelopeRouter = express.Router()
const bodyParser = require('body-parser');
const {
  startingBalance,
  totalBudget,
  remainingBudget,
  getEnvelopeById,
  getEnvelopes,
  addNewEnvelope,
  addNewExpense
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

//POST new envelope
envelopeRouter.post('/envelopes/new-envelope', (req, res, next) => {
  const body = req.body
  const addEnvelope = addNewEnvelope(body.category, body.budget)

  res.status(201).send(addEnvelope);
})

//POST new expense
envelopeRouter.post('/envelopes/new-expense/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const body = req.body
  const addExpense = addNewExpense(id, body.name, body.value)

  res.sendStatus(201);
})
module.exports = envelopeRouter;