const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

app.post('/login',(req,res)=>{
 const user={id:1,role:'admin'};
 const token=jwt.sign(user,'secret');
 res.json({token});
});

app.listen(3001,()=>console.log('Auth running'));
