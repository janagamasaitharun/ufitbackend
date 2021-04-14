const express = require('express')
const app = express()
const PORT = 1000
require('./db/connection')

app.get('/contact', function (req, res) {
  res.status(200).json({message:PORT})
})
app.get('/', function (req, res) {
    res.status(200).json({message:"hi theere"})
  })
app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
    
})