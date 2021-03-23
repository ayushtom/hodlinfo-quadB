require('dotenv').config();
const express = require('express');
const cors=require('cors');
var bodyparser = require('body-parser');

const { sequelize } = require('./models');


const app = express()
app.use(cors());
const router=require("./controllers/routes")

app.use(express.json())



app.get("/",router)


app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.sync()
    console.log('Database Connected!')
  })