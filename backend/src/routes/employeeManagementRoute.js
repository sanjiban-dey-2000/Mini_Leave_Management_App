const express=require('express');
const { protectRoute } = require('../middlewares/adminMiddleware');
const { handleAddingEmployees, handleEmployeeSingup, handleEmployeeLogin } = require('../controllers/employeeManagementController');
const router=express.Router();

router.post('/add_employee',protectRoute,handleAddingEmployees);

router.post('/signup',handleEmployeeSingup);

router.post('/login',handleEmployeeLogin);

module.exports=router;