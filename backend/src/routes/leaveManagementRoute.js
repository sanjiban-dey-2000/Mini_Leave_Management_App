const express=require('express');
const { protectEmployeeRoute } = require('../middlewares/employeeAuthMiddleWare');
const { handleLeaveApplication } = require('../controllers/leaveManagementController');
const router=express.Router();

router.post('/apply',protectEmployeeRoute,handleLeaveApplication);

module.exports=router;