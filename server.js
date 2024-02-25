const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const pool = require('./databasepg.js')
app.use(bodyParser.json())
const envelopeRouter = require('./envelopeRouter.js')
app.use('/api', envelopeRouter);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });

