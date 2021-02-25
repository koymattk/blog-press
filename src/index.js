const express = require('express');
const connection = require('./database/connection');
const categoriesController = require('./controllers/categories/CategoiresController')
const articlesController =require('./controllers/articles/ArticlesController');
const userController = require('./controllers/users/userController');
const Article = require("./models/Articles");
const Category = require("./models/Categories");
const User = require('./models/User');
const app = express();

//views engines
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Carrega aquivos estaticos
app.use(express.static('./src/views/public'));
//leitura de aruivos json e de formularios
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//conexao com o banco de dados
connection.authenticate()
    .then(()=>{
        console.log("conexao feita com sucesso");
    })
    .catch( error => {
        console.log(error);
    });

app.use('/categories', categoriesController);
app.use('/articles', articlesController);
app.use('/users', userController);

app.get('/',(req,res)=>{
    Article.findAll({
        limit:4,
        order:[
            ['id','DESC']
        ]
    }).then(article => {
        Category.findAll().then(categories => {
            res.render('index', {article,categories});
        });
    });
});

app.get('/articles/:slug',(req, res) => {
    const slug = req.params.slug;
    if(slug != undefined){
        Article.findOne({
            where:{
                slug:slug
            }
        }).then(article =>{
            Category.findAll().then(categories => {
                res.render('article', {article,categories});
            })
        
        }).catch(erro =>{
            res.redirect('/');
        });
    }else{
        res.redirect('/');
    }
});

app.get('/categories/:slug', (req,res) => {
    const slug = req.params.slug;
    if (slug != undefined) {  

        Category.findOne({
            where:{slug:slug},
            include:[{model:Article}]

        }).then(category => {
            if(category != undefined){
                Category.findAll().then(categories =>{
                    res.render('index', {article: category.articles, categories})
                });
            }else{
                res.redirect('/')
            }
        }).catch(erro => {
            console.log(erro);
            res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
});



app.listen(5000,()=>{
    console.log("Server running on port 5000")
})

