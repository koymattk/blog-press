const express = require('express');
const router = express.Router();

router.get('/admin/new', (req,res)=>{
    res.render('admin/categories/new')
});

module.exports = router;

