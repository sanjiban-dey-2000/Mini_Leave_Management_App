const express=require('express');
const { protectRoute } = require('../middlewares/adminMiddleware');
const { handleAddingEmployees, handleEmployeeSingup } = require('../controllers/employeeManagementController');
const router=express.Router();

router.post('/add_employee',protectRoute,handleAddingEmployees);

router.post('/signup',handleEmployeeSingup);

module.exports=router;