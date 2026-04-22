const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', async (req,res)=>{
 const {invoiceId,amount}=req.body;

 const {data:invoices}=await axios.get('http://localhost:3002/');
 const invoice=invoices.find(i=>i.id==invoiceId);

 if(!invoice) return res.send('Invoice not found');

 let remaining=invoice.totalAmount-invoice.paidAmount;
 if(amount>remaining) return res.send('Overpayment not allowed');

 let newPaid=invoice.paidAmount+amount;
 let status=newPaid===invoice.totalAmount?'PAID':'PARTIAL';

 await axios.put(`http://localhost:3002/${invoiceId}`,{
  paidAmount:newPaid,
  status
 });

 res.json({message:'Payment applied',paid:newPaid,status});
});

app.listen(3003,()=>console.log('Payment running'));
