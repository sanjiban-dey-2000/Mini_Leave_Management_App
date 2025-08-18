const express=require('express');
const { handleAdminSignup, handleAdminLogin } = require('../controllers/adminController');
const router=express.Router();

//admin signup route
router.post('/admin_signup',handleAdminSignup);

//admin login route
router.post('/admin_login',handleAdminLogin);


module.exports=router;