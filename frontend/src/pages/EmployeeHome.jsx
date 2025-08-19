// src/pages/employee/EmployeeHome.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { applyLeave, checkBalance, getEmployeeLeaves} from "../service/axiosInstance";

const EmployeeHome = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    numberOfDays: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(null); 

  const handleInputChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const postLeaveApplication = async (data) => {
    try {
      const res = await applyLeave(data);
      toast.success(res.data?.message);
      fetchLeaves();
      fetchLeaveBalance(); // refresh balance after applying
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong. Please try again!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postLeaveApplication(leaveData);
    setLeaveData({
      leaveType: "",
      startDate: "",
      endDate: "",
      numberOfDays: "",
      reason: "",
    });
  };

  const fetchLeaves = async () => {
    try {
      const res = await getEmployeeLeaves();
      setLeaves(res.data.leaveStatus);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLeaveBalance = async () => {
    try {
      const res = await checkBalance(); 
      console.log(res.data);
      setLeaveBalance(res.data?.balance?.totalLeaves);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchLeaveBalance();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Leave Balance Card */}
      <section className="bg-indigo-50 border border-indigo-200 shadow-md rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-indigo-700">Remaining Leave Balance</h2>
        <p className="text-3xl font-extrabold text-indigo-900 mt-2">
          {leaveBalance !== null ? leaveBalance : "Loading..."}
        </p>
        <p className="text-sm text-gray-500">days left</p>
      </section>

      {/* Leave Application Form */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Leave Type</label>
            <select
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Paid Leave">Paid Leave</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={leaveData.startDate}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={leaveData.endDate}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Number of Days</label>
            <input
              type="number"
              name="numberOfDays"
              value={leaveData.numberOfDays}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium">Reason for Leave</label>
            <textarea
              name="reason"
              value={leaveData.reason}
              onChange={handleInputChange}
              placeholder="Enter reason"
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition col-span-full"
          >
            Submit Leave Application
          </button>
        </form>
      </section>

      {/* Leave Requests Table */}
      <section className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">My Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Type</th>
                <th className="border px-3 py-2">Start</th>
                <th className="border px-3 py-2">End</th>
                <th className="border px-3 py-2">Days</th>
                <th className="border px-3 py-2">Reason</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave._id} className="text-center">
                    <td className="border px-3 py-2">{leave.leaveType}</td>
                    <td className="border px-3 py-2">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="border px-3 py-2">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="border px-3 py-2">{leave.numberOfDays}</td>
                    <td className="border px-3 py-2">{leave.reason}</td>
                    <td className="border px-3 py-2">{leave.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmployeeHome;
