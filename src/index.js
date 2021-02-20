const express = require('express');
const connection = require('./database/connection');
const categoriesController = require('./controllers/categories/CategoiresController')
const articlesController =require('./controllers/articles/ArticlesController');
const app = express();

//views engines
app.set('views', './src/views');
app.set('view engine', 'ejs')

//Carrega aquivos estaticos
app.use(express.static('./src/views/public'));
//leitura de aruivos json e de formularios
app.use(express.urlencoded({extended:false}))
app.use(express.json())



//conexao com o banco de dados
connection.authenticate()
    .then(()=>{
        console.log("conexao feita com sucesso")
    })
    .catch( error => {
        console.log(error)
    });

app.use('/categories', categoriesController)
app.use('/articles', articlesController)

app.get('/',(req,res)=>{
    console.log(process.env.DB)
    res.render('index')
});


app.listen(5000,()=>{
    console.log("Server running on port 5000")
})

