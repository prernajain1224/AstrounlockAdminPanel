import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { he } from "date-fns/locale";

export default function Layout({ children }) {
  const currentPage = window.location.pathname;

  console.log(currentPage,"curent paage")
  const sidebarActiveTab = () => {
    if (currentPage.startsWith("/admin")) {
      return "admin";
    } else if (currentPage.startsWith("/astrologer")) {
      return "astrologer";
    } else if (currentPage.startsWith("/user")) {
      return "user";
    } else if (currentPage.startsWith("/session")) {
      return "session"; 
    } else if (currentPage.startsWith("/product")) {
      return "product";
    } else if (currentPage.startsWith("/roles")) {
      return "roles";
    }else if (currentPage.startsWith("/blogs")) {
      return "blogs";
    }else if (currentPage.startsWith("/categories")) {
      return "categories";
    }else if (currentPage.startsWith("/orders")) {
      return "orders";
    }else if (currentPage.startsWith("/wallet_balance")) {
      return "wallet_balance";
    }else if (currentPage.startsWith("/statics")) {
      return "statics";
    }
    
  };
  return (
    <>
      <div id="wrapper" style={{ maxHeight: "100vh" }}>
        <Sidebar activeTab={sidebarActiveTab()} />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid" style={{ "overflow-y": "scroll" }}>
              {children}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
