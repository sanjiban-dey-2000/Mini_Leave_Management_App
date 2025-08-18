import React from "react";
import { Outlet } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

const PublicLayout = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            padding: "16px",
            fontSize: "18px",
            color: "#713200",
          },
        }}
      />
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
