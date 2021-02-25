const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');


router.get('/', (req,res)=> {
    User.findAll().then(users => {
        res.render('admin/users/index',{users})
    })
})

router.get('/admin/create',(req,res)=>{
    res.render("admin/users/create");
})

router.post('/admin/create', (req,res)=>{
    const user = req.body;

    User.findOne({
        where:{email:user.email}
    }).then(user => {
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;
            User.create(user).then(() => {
                res.redirect('/');
            });  
        }else{
            
            res.redirect('/')
        }
    })

      
})


module.exports = router;
