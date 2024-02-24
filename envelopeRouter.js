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

const pool = require('./databasepg.js')

  envelopeRouter.get('/envelopes/budget/unenvelopedMoney', async (req, res) => {
    try {
      const result = await pool.query('SELECT SUM(value) FROM unenveloped_money');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(404).send('Table does not exist.');
    }
  });

envelopeRouter.use(bodyParser.json())

//GET total remaining
envelopeRouter.get('/envelopes/budget/remaining', (req, res) => {
  const totalRemainingBudget = "Total remaining budget in your envelopes: " + totalRemaining()
  res.send(totalRemainingBudget)
})

//GET total budget
envelopeRouter.get('/envelopes/budget', (req, res) => {
  const entireBudget = "Total budget: " + getTotalBudget()
  res.send(entireBudget)
})

//GET remaining budget
envelopeRouter.get('/envelopes/budget/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (typeof id !== 'number') {
    res.status(400).send('ID has to be a number.')
  }else{
  const envelopeRemainingBudget = "Remining budget in requested envelope: "+ getRemainingBudget(id)
    res.status(200).send(envelopeRemainingBudget)
}})

//GET all
envelopeRouter.get('/envelopes', (req, res) => {
    const allEnvelopes = getEnvelopes()
    res.send(allEnvelopes)
})

//GET one
envelopeRouter.get('/envelopes/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    if (typeof id !== 'number') {
      res.status(400).send('ID has to be a number.')
    }else{
    const envelope = getEnvelopeById(id)
    if (envelope === -1){
      res.status(404).send('Envelope ID not found!')
    } else{
      res.send(envelope)
    }
}})

//POST new envelope
envelopeRouter.post('/envelopes/new-envelope', (req, res, next) => {
  const body = req.body
  const addEnvelope = addNewEnvelope(body.category, body.budget)

  res.status(201).send(addEnvelope)
})

//POST new expense
envelopeRouter.post('/envelopes/new-expense/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (typeof id !== 'number') {
    res.status(400).send('ID has to be a number.')
  }else{
  const body = req.body
  const addExpense = addNewExpense(id, body.name, body.value)

  res.sendStatus(201);
}})

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
  if (typeof id !== 'number') {
    res.status(400).send('ID has to be a number.')
  }else{
  const body = req.body;
  const updatedEnvelope = updateEnvelopeById(id, body.category, body.budget);
  res.status(201).send(updatedEnvelope);
}})

module.exports = envelopeRouter;