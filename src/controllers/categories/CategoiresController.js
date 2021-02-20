const express = require('express');
const router = express.Router();
const categories = require('../../models/Categories');
const slugify = require('slugify');


router.get('/admin/new', (req,res)=>{
    res.render('admin/categories/new');
});

router.post('/save', (req,res)=>{
    const { title } = req.body;
    if (title !== '') {
        categories.create({
            title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/');
        });
    }else{
        es.redirect('/categories/admin/new')
    }
});
module.exports = router;

