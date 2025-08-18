const express=require('express');
const { protectEmployeeRoute } = require('../middlewares/employeeAuthMiddleWare');
const { handleLeaveApplication, handleViewLeaveApplications, handleLeaveApplicationStatus, handleViewApplicationStatus, handleViewLeavesDetails } = require('../controllers/leaveManagementController');
const { protectRoute } = require('../middlewares/adminMiddleware');
const router=express.Router();

//leave application route
router.post('/apply',protectEmployeeRoute,handleLeaveApplication);

//get leave application route(admin end)
router.get('/view_requests',protectRoute,handleViewLeaveApplications);

//leave application approval route(admin end)
router.post('/update_application/:leaveId',protectRoute,handleLeaveApplicationStatus);

//view application status (employee end)
router.get('/view_status',protectEmployeeRoute,handleViewApplicationStatus);

module.exports=router;