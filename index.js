const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xecwx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=>{
    try{
        await client.connect()
        const serviceCollection = client.db('photography').collection('service');
        const paymentCollection = client.db('photography').collection('payment');

        app.get('/service/:id', async(req, res)=> {
            const id = req.params.id
            const filter = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(filter);
            res.send(service);
        })


        app.post('/create-payment-intent', async(req, res) =>{
            const service = req.body;
            const price = service.price;
            console.log("this is checking", price);
            const amount = price * 100;

            const paymentIntent = await stripe.paymentIntents.create({
              amount : amount,
              currency: 'usd',
              payment_method_types:['card']
            });
            res.send({clientSecret: paymentIntent.client_secret})
          });

          app.post('/payment', async(req, res) =>{
            const payment = req.body;
      
            const result = await paymentCollection.insertOne(payment);
            res.send(result);
          })

    }
    finally {
        
    }

}

run().catch(console.dir);




app.get('/' , (req, res)=>{
    res.send('running the photography web server')
})

app.listen(port, ()=>{
    console.log("The server is running");
})