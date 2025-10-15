const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/db.mongo');

const listingRoutes = require('./routes/listingRoutes');
const agentRoutes = require('./routes/agentRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/listings', listingRoutes);
app.use('/', agentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
