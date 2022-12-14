const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// testuser
// 0K6jrMCIvYt1hOaM

const uri = "mongodb+srv://testuser:0K6jrMCIvYt1hOaM@cluster0.zjrcntk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('test').collection('user')

        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send({ result: 'success ' })
        })

        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result)
        })

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

        app.put('/user/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const updateUser = {
                $set: {
                    name: req.body.name,
                    job: req.body.job,
                }
            }
            const options = { upsert: true }
            const result = await userCollection.updateOne(filter, updateUser, options)
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('working basic node')
})

// const users = [
//     { id: 1, name: 'abu bakar', job: 'developer' },
//     { id: 2, name: 'abu kuddus', job: 'junior developer' },
//     { id: 3, name: 'abu hasem', job: 'senior developer' }
// ]
// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name.toLocaleLowerCase();
//         const matched = users.filter(user => user.name.toLocaleLowerCase().includes(search))
//         res.send(matched)
//     } else {
//         res.send(users)
//     }

// })

// app.get('/user/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id == id)
//     res.send(user)
// })

// app.post('/user', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     res.send(user)
// })


app.listen(port, () => {
    console.log('working port', port);
})