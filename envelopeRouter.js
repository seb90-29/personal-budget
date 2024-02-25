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

envelopeRouter.use(bodyParser.json())

//GET unenveloped money

  envelopeRouter.get('/envelopes/budget/unenvelopedMoney', async (req, res) => {
    try {
      const unenvelopedMoney = await pool.query('SELECT SUM(value) AS "unenveloped money" FROM unenveloped_money');
      res.status(200).send({
        status: 'Sucess.',
        message: 'Uneveloped money information provided.',
        data: unenvelopedMoney.rows
      })} 
      catch (err) {
      console.error(err);
      res.status(404).send('No money has been added.');
    }
  });

  // GET All envelopes

  envelopeRouter.get('/envelopes', async (req, res) => {
    try {
      const allEnvelopes = await pool.query('SELECT * FROM envelopes');
      res.status(200).send({
        status: 'Sucess.',
        message: 'All envelopes provided.',
        data: allEnvelopes.rows
      })} catch (err) {
      console.error(err);
      res.status(404).send('No envelopes are created.');
    }
  });

//GET One envelope

envelopeRouter.get('/envelopes/:id', async (req, res) => {
  try {
      const envelopeId = parseInt(req.params.id);
      const oneEnvelope = await pool.query('SELECT * FROM envelopes WHERE envelope_id = $1', [envelopeId])
      if (oneEnvelope.rowCount < 1) {
          return res.status(404).send({
              message: "Envelope does not exists."
          });
      };
      res.status(200).send({
          status: 'Sucess',
          message: 'Envelope information provided.',
          data: oneEnvelope.rows
      });
  } catch (error) {
      console.error(error.message);
  };
});

// GET envelope's charges

envelopeRouter.get('/envelopes/charges/:id', async (req, res) => {
  try {
      const chargesId = parseInt(req.params.id);
      const envelpesCharges = await pool.query('SELECT * FROM charges WHERE envelope_id = $1', [chargesId])
      if (envelpesCharges.rowCount < 1) {
          return res.status(404).send({
              message: "There is no charges applied."
          });
      };
      res.status(200).send({
          status: 'Sucess',
          message: 'Charges list provided.',
          data: envelpesCharges.rows
      });
  } catch (error) {
      console.error(error.message);
  };
});

//GET total remaining

//GET total budget

//GET remaining budget

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