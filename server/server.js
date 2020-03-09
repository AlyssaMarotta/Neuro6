const express = require('./config/express.js')

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()

app.post('/Home', (req, res) => {
    res.send({express : 'Express backend is connected to react'})
    
})


app.listen(port, () => console.log(`Server now running on port ${port}!`));
