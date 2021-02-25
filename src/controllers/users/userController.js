const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/admin/users', (req,res)=> {
    res.send("Listagem de usuarios")
})

router.get('/admin/create',(req,res)=>{
    res.render("admin/users/create");
})

router.post('/admin/create', (req,res)=>{
    const user = req.body;
    User.
    console.log(user)
    
})


module.exports = router;
