const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('../../models/Categories')
const Article = require('../../models/Articles');

router.get('/admin', (req,res)=>{
    Article.findAll({
        include:[{model:Category}]
    }).then(article => {
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

router.post('/admin/delete/:id', (req,res)=> {
    const {id} = req.params;
    if (id !== undefined) {
        Article.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect('/articles/admin');
        })
        
    } else {
        res.redirect('/articles/admin');
    }
});

router.get('/admin/edit/:id', (req,res)=>{
    const id = req.params.id;
    console.log(id)
    if (id !== undefined) {
        Article.findByPk(id).then(article => {
            if (article === null) {
                res.redirect('/articles/admin');
            }
            Category.findAll().then(category => {

                res.render('admin/articles/edit', {article,category})
            })
        }).catch(erro =>{
            console.log(erro)
        })
        
    } else {
        res.redirect('/articles/admin');
    }
})

router.post('/admin/edit/:id', (req,res)=>{
    const id = req.params.id;
    const {title, body} = req.body;
    if (id !== undefined) {
        if (isNaN(id)) {
            res.redirect('/articles/admin')  
        }
        Article.update({title:title, body:body, slug:slugify(title)},{
            where:{
                id:id
            }
        }).then(category => {
            res.redirect('/articles/admin');
        })
    }else{
        res.redirect('/articles/admin');
    }
})

router.get('/page/:num', (req,res) => {
    const page = req.params.num;
    let offset;
    if (isNaN(page) || page == 1) {
        offset = 0
    }else{
        offset = parseInt(page) * 4;

    }


    Article.findAndCountAll({
        order:[
            ['id','DESC']
        ],
        limit: 4,
        offset: offset
    }).then(articles => {
        let next;
        if (offset + 4  >= articles.count){
            next = false;
        }else{
            next = true;
        }
        const result = {
            page: parseInt(page),
            articles,
            next
        }
        Category.findAll().then(category =>{

            res.render("admin/articles/page",{result, category});
        })
    })
})


module.exports = router;

