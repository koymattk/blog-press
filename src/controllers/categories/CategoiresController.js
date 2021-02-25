const express = require('express');
const router = express.Router();
const categories = require('../../models/Categories');
const slugify = require('slugify');
const Category = require('../../models/Categories');
const adminAuth = require('../../middlewares/adminAuth');



router.get('/admin/new',adminAuth, (req,res)=>{
    res.render('admin/categories/new');
});

router.post('/admin/save',adminAuth, (req,res)=>{
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
router.get('/admin',adminAuth, (req,res)=>{
    Category.findAll().then(categories => {        
        res.render('admin/categories/index', {categories});
    });
});

router.post('/admin/delete/:id',adminAuth, (req,res)=> {
    const {id} = req.params;
    if (id !== undefined) {
        Category.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect('/categories/admin');
        })
        
    } else {
        res.redirect('/categories/admin');
    }
});

router.get('/admin/edit/:id',adminAuth, (req,res)=>{
    const id = req.params.id;
    console.log(id)
    if (id !== undefined) {
        Category.findByPk(id).then(category => {
            console.log(category)
            if (category === null) {
                res.redirect('/categories/admin');
            }
            res.render('admin/categories/edit', {category})
        }).catch(erro =>{
            console.log(erro)
        })
        
    } else {
        res.redirect('/categories/admin');
    }
})

router.post('/admin/edit/:id', adminAuth,(req,res)=>{
    const id = req.params.id;
    const {title} = req.body;
    if (id !== undefined) {
        if (isNaN(id)) {
            res.redirect('/categories/admin')  
        }
        Category.update({title:title, slug:slugify(title)},{
            where:{
                id:id
            }
        }).then(category => {
            res.redirect('/categories/admin');
        })
    }else{
        res.redirect('/categories/admin');
    }
})
module.exports = router;

