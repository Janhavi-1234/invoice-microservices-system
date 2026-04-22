const express = require('express');
const app = express();
app.use(express.json());

let invoices=[];

app.post('/',(req,res)=>{
 const inv={id:invoices.length+1,totalAmount:req.body.totalAmount,paidAmount:0,status:'PENDING'};
 invoices.push(inv);
 res.json(inv);
});

app.get('/',(req,res)=>res.json(invoices));

app.put('/:id',(req,res)=>{
 let inv=invoices.find(i=>i.id==req.params.id);
 if(!inv) return res.send('Not found');
 inv.paidAmount=req.body.paidAmount;
 inv.status=req.body.status;
 res.json(inv);
});

app.listen(3002,()=>console.log('Invoice running'));
