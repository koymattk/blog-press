const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('../../models/Categories')
const Article = require('../../models/Articles');

router.get('/admin', (req,res)=>{
    Article.findAll().then(article => {
        res.render('admin/articles/index', {article})
    })
});

router.get('/admin/new', (req, res)=> {
    Category.findAll().then(category =>{
        res.render('admin/articles/new', {category});
    })
})

router.post('/admin/save/',(req, res) => {
    const {title, body, categoryId} = req.body;
    Article.create({
        title,
        slug:slugify(title),
        body,
        categoryId
    }).then(()=>{
        res.redirect('/articles/admin');
    });
    
});

module.exports = router;

