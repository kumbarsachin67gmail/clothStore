  const express = require("express");
  const mongoose = require('mongoose');
  const morgan = require('morgan');
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');
  const expressValidator = require('express-validator');
  const dotenv = require("dotenv");
  const cors = require('cors');
  

  require('dotenv').config();

  //import routes
  const authRoutes = require('./routes/auth');
  const userRoutes = require('./routes/user');
  const categoryRoutes = require('./routes/category');
  const productRoutes = require('./routes/product');
  const brainTreeRoutes = require('./routes/brainTree');
  const orderRoutes = require('./routes/order');

  //app
  const app = express();

  //db
  mongoose
  .connect(process.env.DATABASE,{
      // UseNewUrlParser:true,
      // useCreateIndex:true
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true  
  }).then(()=>{
      console.log('DB Connected')
  }).catch(err => console.log('DB CONNECTION ERROR: ', err));

  //middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());
  app.use(cors());

  if ((process.env.NODE_ENV = 'development')) {
    app.use(cors({ origin: `http://localhost:3000` }));
}

if(process.env.NODE_ENV=="production"){
    app.use(express.static('ecommerce-frontend/build'))
    const path=require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'ecommerce-frontend','build','index.html'))
    })
} 

  //route middleware
  app.use('/api',authRoutes);
  app.use('/api',userRoutes);
  app.use('/api',categoryRoutes);
  app.use('/api',productRoutes);
  app.use('/api',brainTreeRoutes);
  app.use('/api',orderRoutes);


  const port = process.env.PORT || 8000
  app.listen(port,()=>{
      console.log(`Server is running on port ${port}`);
  })
