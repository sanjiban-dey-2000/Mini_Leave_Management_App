const express=require('express');
const { protectRoute } = require('../middlewares/adminMiddleware');
const { handleAddingEmployees, handleEmployeeSingup, handleEmployeeLogin } = require('../controllers/employeeManagementController');
const router=express.Router();

//employee adding route
router.post('/add_employee',protectRoute,handleAddingEmployees);

//employee signup route
router.post('/signup',handleEmployeeSingup);


//employee login route
router.post('/login',handleEmployeeLogin);

module.exports=router;