const express = require('express');
const Sequelize = require('sequelize');
const cors = require('cors')

const { handleError } = require('./src/helpers/errors.helper');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

const db = require("./src/models");
db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({
        state: 'OK'
    })
});

app.use('/api/tutorials', require("./src/routes/tutorial.route"));

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(PORT, () => {
    console.log(`App start and running on port: ${PORT}`)
})