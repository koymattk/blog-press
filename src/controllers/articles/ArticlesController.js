const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("rota de Artigos");
});

module.exports = router;

