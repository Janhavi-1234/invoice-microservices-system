const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

app.use('/auth', proxy('http://localhost:3001'));
app.use('/invoices', proxy('http://localhost:3002'));
app.use('/payments', proxy('http://localhost:3003'));

app.listen(3000, ()=>console.log('Gateway running'));
