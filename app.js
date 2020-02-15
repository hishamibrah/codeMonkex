const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const recipeRoutes = require('./api/routes/recipes');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://codeMonk:'+ process.env.MONGO_ATLAS_PW +'@cluster0-f2mxu.mongodb.net/test?retryWrites=true&w=majority',{
  useMongoClient:true,
  useNewUrlParser: true,
  seUnifiedTopology: true
});
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Acess-Control-Allow-Origin','*');
  res.header('Acess-Control-Allow-Headers','*');
  if(req.method === 'OPTIONS'){
    res.header('Acess-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/recipes',recipeRoutes);
app.use('/user',userRoutes);

app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  })
});


module.exports = app;
