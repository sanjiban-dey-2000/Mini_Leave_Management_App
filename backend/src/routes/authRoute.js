const express=require('express');
const { handleAdminSignup } = require('../controllers/authController');
const router=express.Router();

router.post('/admin_signup',handleAdminSignup);


module.exports=router;