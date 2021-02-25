const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');


router.get('/admin', (req,res)=> {
    User.findAll().then(users => {
        res.render('admin/users/index',{users})
    })
})

router.get('/admin/create',(req,res)=>{
    res.render("admin/users/create");
})

router.post('/admin/create', (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where:{email:email}
    }).then(user => {
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const userHash = {
                name,
                email,
                password:hash
            }
            User.create(userHash).then(() => {
                res.redirect('/');
            });  
        }else{
            res.redirect('/');
        }
    })


})

router.get('/login', (req,res)=> {
    res.render("admin/users/login")
});

router.post('/authenticate', (req,res)=>{
    const userr = req.body;
    User.findOne({
        where: {email: userr.email}
    }).then(user => {
        if(user != undefined){
            const correct = bcrypt.compareSync(userr.password, user.password)
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.json(req.session.user)
            }else{
                console.log('senha incorreta')
                res.redirect('/users/login')
                
            }
        }else{
            res.redirect('/users/login')
        }
    })
});


module.exports = router;
