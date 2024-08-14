const express = require('express');
const cors = require('cors');
const connectDB  = require('./config/dbConnect.js');
const setupSwagger = require('./config/swaggerConfig');
const cookieParser = require('cookie-parser');
const http = require('http');

const app = express()

require('dotenv').config()

setupSwagger(app);
connectDB();
const port = process.env.PORT || 8080
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./routes/authRoutes.js'));
app.use('/api', require('./routes/userRoutes.js'));
app.use('/api', require('./routes/feedRoutes.js'));

const server = http.createServer(app);

server.listen(port, () => {
  try{
  console.log(`Server running on port ${port}`)

} catch (err) {
  console.error("Error connecting to MongoDB:", err);
  }
});

module.exports = server;