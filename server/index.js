require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const cors = require('cors')
const ctrl = require("./controller.js");


const { SERVER_PORT, CONNECTION_STRING } = process.env;


massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected");
  })
  .catch(err => console.log(err, "connection error"));



app.use(
  session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.use(cors())

app.get('/session', (req, res) => {
  if(req.session.user){
    res.status(200).send(req.session.user)
    console.log(req.session)
  }
});

app.post('/auth/login', async(req, res) => {
  const dbInstance = req.app.get('db')
  const { email, password } = req.body
  console.log(req.body)

  let user = await dbInstance.get_user( email, password )
  if(user){
      req.session.user = user[0] 
    res.status(200).send(req.session.user)
        console.log(req.session)  
      
  }
})
    


app.get("/api/products", ctrl.get_products)
app.get('/api/cart', ctrl.get_cart)
app.post('/api/signup', ctrl.create_user)
app.post("/api/cart/:id", ctrl.create_cart)
app.put('/api/cart/:id', ctrl.update_count)
app.delete('/api/delete/:id', ctrl.delete_item)
app.delete('/api/delete', ctrl.delete_cart)

const Port = SERVER_PORT || 4000

app.listen(Port, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
