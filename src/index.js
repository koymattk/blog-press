const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("Olá express");
});


app.listen(5001)

