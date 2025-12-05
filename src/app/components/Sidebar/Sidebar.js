import React from "react";

import { Link, useNavigate } from "react-router-dom";
import RoutesList from "../../constants/RoutesList";

import ApartmentIcon from "@mui/icons-material/Apartment";
import CottageIcon from "@mui/icons-material/Cottage";

import { logo } from "../../constants/Images";
import { HomeRepairServiceOutlined } from "@mui/icons-material";

const Sidebar = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion position-sticky"
      id="accordionSidebar"
    >
      <Link
        to={RoutesList.home}
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div
          className="sidebar-brand-icon"
          style={{
            height: "65px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img src={logo} style={{ height: 50 }} />
        </div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li
        className={`nav-item ${activeTab === "landingPage" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.home} className="nav-link">
          <span style={{ paddingTop: 10 }}> Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Admin</div>
      {/* admin */}
      <li
        className={`nav-item ${activeTab === "admin" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.admin} className="nav-link">
          <span style={{ paddingTop: 10 }}>Administrator</span>
        </Link>
      </li>
      {/* astrologer */}
      <li
        className={`nav-item ${activeTab === "astrologer" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.astrologer} className="nav-link">
          <span style={{ paddingTop: 10 }}> Astrologers</span>
        </Link>
      </li>


       <li
        className={`nav-item ${activeTab === "recommendation" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.recommendation} className="nav-link">
          <span style={{ paddingTop: 10 }}> Product Recommendation</span>
        </Link>
      </li>

      {/* user */}
      <li
        className={`nav-item ${activeTab === "user" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.user} className="nav-link">
          <span style={{ paddingTop: 10 }}> Users</span>
        </Link>
      </li>

      <li
        className={`nav-item ${activeTab === "roles" ? "active" : "inactive"}`}
      >
        <Link to={RoutesList.roles} className="nav-link">
          <span style={{ paddingTop: 10 }}> Roles</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Blogs</div>
      <br></br>

      <li
        className={`nav-item ${activeTab === "blogs" ? "active" : "inactive"}`}
      >
        <Link to={RoutesList.blogs} className="nav-link">
          <span style={{ paddingTop: 10 }}>Blogs</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Products</div>
      <br></br>
      {/* Item */}
      <li
        className={`nav-item ${activeTab === "product" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.product} className="nav-link">
          <span style={{ paddingTop: 10 }}> Products</span>
        </Link>
      </li>


      {/* section  */}

      <li
        className={`nav-item ${activeTab === "session" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.session} className="nav-link">
          <span style={{ paddingTop: 10 }}> Sessions</span>
        </Link>
      </li>

      <li
        className={`nav-item ${activeTab === "categories" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.categories} className="nav-link">
          <span style={{ paddingTop: 10 }}> Categories</span>
        </Link>
      </li>

        <hr className="sidebar-divider" />
      <div className="sidebar-heading">Orders</div>
      <br></br>
     
      <li
        className={`nav-item ${activeTab === "order" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.orders} className="nav-link">
          <span style={{ paddingTop: 10 }}> Orders</span>
        </Link>
      </li>

        <hr className="sidebar-divider" />
      <div className="sidebar-heading">Wallet Balance</div>
      <br></br>
     
      <li
        className={`nav-item ${activeTab === "wallet_balance" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.wallet_balance} className="nav-link">
          <span style={{ paddingTop: 10 }}> Wallets</span>
        </Link>
      </li>

        <hr className="sidebar-divider" />
      <div className="sidebar-heading">Analysis</div>
      <br></br>
     
      <li
        className={`nav-item ${activeTab === "statics" ? "active" : "inactive"
          }`}
      >
        <Link to={RoutesList.statics} className="nav-link">
          <span style={{ paddingTop: 10 }}> Statistics</span>
        </Link>
      </li>

    </ul>
  );
};

export default Sidebar;
