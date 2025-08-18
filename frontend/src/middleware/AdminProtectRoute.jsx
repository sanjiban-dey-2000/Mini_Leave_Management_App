import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const AdminProtectRoute = ({ children }) => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verifiedUser, setVerifiedUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/user/verify", {
          withCredentials: true,
        });

        if (res.data.user) {
          login(res.data.user);       // ✅ update context
          setVerifiedUser(res.data.user); // ✅ store locally for immediate check
        }
      } catch (error) {
        console.log("Verification failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [login]);

  if (loading) return <LoadingPage />;

  // check verified user or context user
  const currentUser = verifiedUser || user;

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectRoute;
