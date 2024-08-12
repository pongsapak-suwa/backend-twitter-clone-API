const express = require('express')
const cors = require('cors')
const connectDB  = require('./config/dbConnect.js')

const app = express()

require('dotenv').config()

connectDB();
const port = process.env.PORT || 8080
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  try{
    console.log(`Server running on port ${port}`)

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})