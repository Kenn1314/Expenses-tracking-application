require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const connectToDB = require('./config/connectionDB.js');

//===== ROUTES DEFINITION ======
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

connectToDB();

// ROUTES
app.use('/api/transaction/', transactionRoutes);

app.listen(port, () => { console.log("Server is running at port: " + port) })