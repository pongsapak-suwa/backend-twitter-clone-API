const express = require('express')
const cors = require('cors')
const connectDB  = require('./config/dbConnect.js')
const cookieParser = require('cookie-parser');

const app = express()

require('dotenv').config()

connectDB();
const port = process.env.PORT || 8080
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./routes/authRoutes.js'));
app.use('/api', require('./routes/userRoutes.js'));
app.use('/api', require('./routes/feedRoutes.js'));


app.listen(port, async () => {
  try{
    console.log(`Server running on port ${port}`)

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})