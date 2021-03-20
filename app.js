require('dotenv').config();
const express = require('express');
const cors=require('cors');
var bodyparser = require('body-parser');
const path = require("path");

const { sequelize } = require('./models');


const app = express()

const router=require("./controllers/routes")

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 


app.get("/",router)


app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.sync()
    console.log('Database Connected!')
  })