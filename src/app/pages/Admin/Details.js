import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import { opportunityTypeDetails } from "../../api/opportunityTypes";
import Layout from "../Layout";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../store";
import RoutesList from "../../constants/RoutesList";
import {
  adminUserDetails,
} from "../../api/adminUsers";
import {
  formatDateTime,
} from "../../../utils";
import { getImageUrl } from "../../api/util"

const AdminDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useAppSelector(selectUser);
  const { apiData, isLoading, error } = useFetch(adminUserDetails, id);

const detailRow = (title, value) => {
  return (
    <>
      <div className="small mb-1">
        <b>{title}:</b>
      </div>
      <nav className="navbar navbar-expand navbar-light bg-light mb-2">
        {value ? (
          title === "Assignee" ? (
            <Link to={`/users/${value?.id}`}>{value?.name}</Link>
          ) : title === "Description" ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : title === "Avatar" ? (
            value?.length > 0 ? (
              <img
                src={getImageUrl(value)}
                alt="Image"
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            ) : (
              "Not Available"
            )
          ) : (
            value
          )
        ) : (
          "Not Available"
        )}
      </nav>
    </>
  );
};


  return (
    <Layout>
      <>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h3 mb-2 text-gray-800">Admin Details</h1>
            <p className="mb-4">Showing details of Admin</p>
          </div>

        </div>

        <div className="card shadow mb-4">
          <div className="card-body">
            {isLoading ? (
              <div>
                <p>Loading data...</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  {apiData.status !== error ? (
                    <>
                      {detailRow("ID", apiData?.data?.id)}
                      {detailRow("Name", apiData?.data?.name)}
                      {detailRow("Email", apiData?.data?.email)}
                      {detailRow("User Type", apiData?.data?.user_type)}
                      {detailRow("Phone Number", apiData?.data?.phone_number)}
                      {detailRow("Avatar", apiData?.data?.avatar)}
                      {detailRow("Created At", formatDateTime(apiData?.data?.created_at))}
                    </>
                  ) : (
                    <p>{apiData.error}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};
export default AdminDetails;
