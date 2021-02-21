const express = require('express');
const router = express.Router();
const categories = require('../../models/Categories');
const slugify = require('slugify');
const Category = require('../../models/Categories');


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
        res.redirect('/categories/admin/new')
    }
});
router.get('/admin', (req,res)=>{
    Category.findAll().then(categories => {        
        res.render('admin/categories/index', {categories});
    });
});
module.exports = router;

