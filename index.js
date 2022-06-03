const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xecwx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=>{
    try{
        await client.connect()
        const bookingCollection = client.db('photography').collection('service');

        app.get('/booking/:id', async(req, res)=> {
            const id = req.params.id
            const filter = {_id: ObjectId(id)};
            const service = await bookingCollection.findOne(filter);
            res.send(service);
        })

    }
    finally {
        await client.close();
    }

}

run().catch(console.dir);




app.get('/' , (req, res)=>{
    res.send('running the photography web server')
})

app.listen(port, ()=>{
    console.log("The server is running");
})