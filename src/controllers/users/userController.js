const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');


router.get('/admin/users', (req,res)=> {
    res.send("Listagem de usuarios")
})

router.get('/admin/create',(req,res)=>{
    res.render("admin/users/create");
})

router.post('/admin/create', (req,res)=>{
    const user = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    User.create(user).then(() => {
        res.redirect('/');
    });    
})


module.exports = router;
