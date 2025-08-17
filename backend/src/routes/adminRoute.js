const express=require('express');
const { handleAdminSignup, handleAdminLogin } = require('../controllers/adminController');
const router=express.Router();

router.post('/admin_signup',handleAdminSignup);

router.post('/admin_login',handleAdminLogin);


module.exports=router;