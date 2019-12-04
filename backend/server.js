const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//so we can have environment vars
require('dotenv').config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());

//allows us to parse json
app.use(express.json());

//get from Atlas dashboard
const uri = process.env.ATLAS_URI;

//this starts the connection to the database
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

//establish connection to database
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database established successfully');
})

//require and use routers
const cropsRouter = require('./routes/crops');
const eventsRouter = require('./routes/events');
//this specifies the route: EX: someone goes to URL/crops -> taken to the crops router
app.use('/crops', cropsRouter);
app.use('/event', eventsRouter);

//starts server
app.listen(port, () => {
  console.log('server is running on port: ' + port);
});
