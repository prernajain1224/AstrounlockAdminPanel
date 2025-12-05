import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useAppSelector } from "../../store";
import { selectUser } from "../../store/user/selectors";
import RoutesList from "../../constants/RoutesList";
import { adminUserDetails } from "../../api/adminUsers";
import { getImageUrl } from "../../api/util";
import {
  errorType,
  ok,
  SESSION_EXPIRED,
  showSnackbar,
  formatDateTime,
  SOMETHING_WENT_WRONG,
} from "../../../utils";

const UserProfile = () => {
  const currentUser = useAppSelector(selectUser);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      adminUserDetails(currentUser.id)
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setLoading(false);
        });
    }
  }, [currentUser]);

  // const detailRow = (title, value) => (
  //   <div className="mb-3">
  //     <strong>{title}:</strong> {value || "Not Available"}
  //   </div>
  // );

  const detailRow = (title, value) => (
  <div className="mb-3">
    <strong>{title}:</strong>{" "}
    {title === "Profile Photo" ? (
      value?.length > 0 ? (
        <img
          src={getImageUrl(value)}
          alt="Image"
          style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" ,marginTop:"12px",display: "block",width:"14%"}}
        />
      ) : (
        "Not Available"
      )
    ) : (
      value || "Not Available"
    )}
  </div>
);


  return (
    <Layout>
      <>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h3 mb-2 text-gray-800">My Profile</h1>
            <p className="mb-4">Showing profile of {currentUser?.name}</p>
          </div>
          <Link to={RoutesList.userProfileUpdate} className="btn btn-primary">
            Edit
          </Link>
        </div>

        <div className="card shadow mb-4">
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-responsive">
                {detailRow("Name", userData?.name)}
                {detailRow("Email", userData?.email)}  
                 {detailRow("Profile Photo", userData?.avatar)}   
                {detailRow("Created At", formatDateTime(userData?.created_at))}
              </div>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default UserProfile;
