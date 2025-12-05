import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import { opportunityTypeDetails } from "../../api/opportunityTypes";
import Layout from "../Layout";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../store";
import RoutesList from "../../constants/RoutesList";
import {
  productrecommendationDetails,
} from "../../api/product_recommendations";
import {
  formatDateTime,
} from "../../../utils";
import { getImageUrl } from "../../api/util"

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useAppSelector(selectUser);
  const { apiData, isLoading, error } = useFetch(productrecommendationDetails, id);

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
            <h1 className="h3 mb-2 text-gray-800">Product Recommendations Details</h1>
            <p className="mb-4">Showing details of Product Recommendations</p>
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
                  {apiData?.data ? (
                    <>
                      {detailRow("ID", apiData.data.id)}
                      {detailRow("Product", apiData.data.product_name)}
                      {detailRow("Created By", apiData.data.created_by_name)}
                      {detailRow("Recommended To", apiData.data.recommended_to_name)}
                      {detailRow("Created At", formatDateTime(apiData.data.created_date))}
                      {detailRow("Updated At", formatDateTime(apiData.data.updated_date))}
                    </>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <p>No data available</p>
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
export default Details;
