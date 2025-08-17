const express=require('express');
const { protectRoute } = require('../middlewares/adminMiddleware');
const { handleAddingEmployees } = require('../controllers/employeeManagementController');
const router=express.Router();

router.post('/add_employee',protectRoute,handleAddingEmployees);

module.exports=router;