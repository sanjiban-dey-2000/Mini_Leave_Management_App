// src/pages/admin/AdminHome.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addEmployee } from "../service/axiosInstance";

const AdminHome = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    department: "",
    joiningDate: "",
  });

  const [leaves,setLeaves]=useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const postEmployee = async (data) => {
    try {
      const res = await addEmployee(data);
      console.log(res.data);
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong.Please try again!!");
    }
  };

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    postEmployee(formData);
    setFormData({
      fullName: "",
      email: "",
      gender: "",
      department: "",
      joiningDate: "",
    });
  };

  useEffect(()=>{

  },[]);

  return (
    <div className="space-y-8">
      {/* Add Employee Form */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>
        <form
          onSubmit={handleAddEmployeeSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border px-3 py-2 rounded w-full"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition col-span-full"
          >
            Add Employee
          </button>
        </form>
      </section>

      {/* Leave Requests Table */}
     <section className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Employee</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Start</th>
              <th className="border px-3 py-2">End</th>
              <th className="border px-3 py-2">Days</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="text-center">
                <td className="border px-3 py-2">{leave.employeeName}</td>
                <td className="border px-3 py-2">{leave.leaveType}</td>
                <td className="border px-3 py-2">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2">{leave.numberOfDays}</td>
                <td className="border px-3 py-2">{leave.status}</td>
                <td className="border px-3 py-2 flex justify-center gap-2">
                  {leave.status === "Pending" && (
                    <>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        onClick={() => handleLeaveAction(leave._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => handleLeaveAction(leave._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHome;
