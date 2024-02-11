const express = require('express')
const envelopeRouter = express.Router()
const bodyParser = require('body-parser')
const {
  getEnvelopeById,
  getEnvelopes,
  addNewEnvelope,
  addNewExpense,
  deleteEnvelopeById,
  deleteExpenseById,
  updateEnvelopeById,
  getTotalBudget,
  getRemainingBudget,
  totalRemaining
} = require('./utils.js')
envelopeRouter.use(bodyParser.json())

//GET total remaining
envelopeRouter.get('/envelopes/budget/remaining', (req, res) => {
  const tRemaining = "Total remaining budget in your envelopes: " + totalRemaining()
  res.send(tRemaining)
})

//GET total budget
envelopeRouter.get('/envelopes/budget', (req, res) => {
  const entireBudget = "Total budget: " + getTotalBudget()
  res.send(entireBudget)
})

//GET remaining budget
envelopeRouter.get('/envelopes/budget/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const remaining = "Remining budget in requested envelope: "+ getRemainingBudget(id)
    res.status(200).send(remaining)
})

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
      res.status(404).send('Envelope ID not found!')
    } else{
      res.send(envelope)
    }
})

//POST new envelope
envelopeRouter.post('/envelopes/new-envelope', (req, res, next) => {
  const body = req.body
  const addEnvelope = addNewEnvelope(body.category, body.budget)

  res.status(201).send(addEnvelope)
})

//POST new expense
envelopeRouter.post('/envelopes/new-expense/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const body = req.body
  const addExpense = addNewExpense(id, body.name, body.value)

  res.sendStatus(201);
})

//DELETE envelope
envelopeRouter.delete('/envelopes/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const deleteEnvelope = deleteEnvelopeById(id)
  if (deleteEnvelope){
    res.status(204).send("Envelope is terminated.")
  } else{
    res.status(404).send("Envelope is nonexistent")
  }
})

//DELETE last expense
envelopeRouter.delete('/envelopes/expenses/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (typeof id !== 'number') {
    res.status(400).send('ID has to be a number.')
  }else{
  const lastExpenseRemoved = deleteExpenseById(id)
  if (lastExpenseRemoved){
    res.status(204).send("Last expense is terminated.")
  } else{
    res.status(404).send("No expenses are listed.")
  }}
})

//Update envelope
envelopeRouter.put('/envelopes/update/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const updatedEnvelope = updateEnvelopeById(id, body.category, body.budget);
  res.status(201).send(updatedEnvelope);
})

module.exports = envelopeRouter;