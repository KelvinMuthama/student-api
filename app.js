const express = require('express');
const morgan = require('morgan');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/v1/students', studentRoutes);

module.exports = app;
