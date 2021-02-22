const express = require('express');
const router = express.Router();
const Category = require('../../models/Categories')
router.get('/', (req,res)=>{
    res.send("rota de Artigos");
});

router.get('/admin/new', (req, res)=> {
    Category.findAll().then(category =>{
        res.render('admin/articles/new', {category});
    })
})

module.exports = router;

