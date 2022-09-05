const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('working basic node')
})

const users = [
    { id: 1, name: 'abu bakar', job: 'developer' },
    { id: 2, name: 'abu kuddus', job: 'junior developer' },
    { id: 3, name: 'abu hasem', job: 'senior developer' }
]
app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    res.send(user)
})

app.post('/user', (req, res) => {
    console.log(req);
    res.send('user send')
})





app.listen(port, () => {
    console.log('working port', port);
})