const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("rota de Artigos");
});

router.get('/admin/new', (req, res)=> {
    res.render('admin/articles/new');
})

module.exports = router;

