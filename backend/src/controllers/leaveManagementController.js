const Leave = require("../models/leaveModel");
const Employee = require("../models/employeeModel");
const sendEmail = require("../utils/sendEmail");

//leave application handler
async function handleLeaveApplication(req, res) {
  try {
    const { leaveType, startDate, endDate, numberOfDays, reason } = req.body;

    //edge cases
    const existingEmployee = await Employee.findById(req.user._id);
    if (!existingEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    if (new Date(startDate) < new Date(existingEmployee.joiningDate)) {
      return res.status(403).json({
        message: "You can not apply for leave before joining",
      });
    }
    if (existingEmployee.totalLeaves < numberOfDays) {
      return res.status(400).json({
        message: "Insufficient leave balance",
      });
    }

    //creating leave application
    const leave = await Leave.create({
      employeeId: req.user._id,
      leaveType,
      startDate,
      endDate,
      numberOfDays,
      reason,
      leaveBalanceBefore: existingEmployee.totalLeaves,
      leaveBalanceAfter: existingEmployee.totalLeaves - numberOfDays,
    });

    //updating employee model
   /* existingEmployee.totalLeaves -= numberOfDays;
    await existingEmployee.save();*/

    res.status(200).json({
      message: "Leave applied successfully.Wait for furthe updates",
      leave,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error in leave application route",
    });
  }
}

//all leave application view controller (admin end)
async function handleViewLeaveApplications(req, res) {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "fullName email department joiningDate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All leave requests fetched successfully",
      leaves,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error in viewing applications route",
    });
  }
}

//leave application approval controller(admin end)
async function handleLeaveApplicationStatus(req, res) {
  try {
    const { status } = req.body;
    const { leaveId } = req.params;

    const leave = await Leave.findById(leaveId).populate("employeeId");

    if (!leave) {
      return res.status(404).json({
        message: "Leave application not found",
      });
    }

    //updating status of the application
    leave.status = status;
    leave.approvedBy = req.user._id;
    await leave.save();

    //fetching employee email to notify
    const employee = leave.employeeId;

    if (!employee) {
      return res.status(404).json({
        message: "Employee email not found",
      });
    }

    if (status === "Approved") {
      // Deduct the number of days from employee's totalLeaves
      employee.totalLeaves = employee.totalLeaves - leave.numberOfDays;

      // Set leaveBalanceAfter for this leave record
      leave.leaveBalanceAfter = employee.totalLeaves;

      await employee.save();
      await leave.save();
    } else if (status === "Cancelled") {
      // Restore previous leave balance
      employee.totalLeaves = leave.leaveBalanceBefore;
      leave.leaveBalanceAfter = leave.leaveBalanceBefore;

      await employee.save();
      await leave.save();
    } else {
      // For Rejected, just save the leave status
      await leave.save();
    }

    //send email notification
    const subject = `Leave Application ${status}`;
    const text = `Hello ${
      employee.fullName
    },\n\nYour leave application from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been ${status}.\n\nReason: ${
      leave.reason
    }\n\n- Leave Management Team`;
    const html = `
            <p>Hello <b>${employee.fullName}</b>,</p>
            <p>Your leave application from <b>${leave.startDate.toDateString()}</b> to <b>${leave.endDate.toDateString()}</b> has been <b>${status}</b>.</p>
            <p><b>Reason:</b> ${leave.reason}</p>
            <br/>
            <p>Regards,<br/>Leave Management Team</p>
        `;

    await sendEmail(employee.email, subject, text, html);

    return res.status(200).json({
      message: `Leave ${status} successfully and email notification sent.`,
      leave,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error in application approval route",
    });
  }
}

//application status view controller(employee end)
async function handleViewApplicationStatus(req, res) {
  try {
    const leaveStatus = await Leave.find({ employeeId: req.user._id });

    if (!leaveStatus || leaveStatus.length === 0) {
      return res.status(400).json({
        message: "No application is there to view",
      });
    }

    res.status(200).json({
      message: "Application status fetched successfully",
      leaveStatus,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error in viewing application status route",
    });
  }
}

module.exports = {
  handleLeaveApplication,
  handleViewLeaveApplications,
  handleLeaveApplicationStatus,
  handleViewApplicationStatus,
};
