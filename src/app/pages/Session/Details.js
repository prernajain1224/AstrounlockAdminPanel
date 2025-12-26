import React from "react";
import useFetch from "../../hooks/useFetch";
import { productDetails, reviewsDetails, productStatusUpdate } from "../../api/product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faqsDetails } from "../../api/faqs";
import { astrologersByProduct } from "../../api/product";

import Layout from "../Layout";
import {
  formatDateTime,
  formatPrice,
  errorType,
  ok,
  SESSION_EXPIRED,
  showSnackbar,
  SOMETHING_WENT_WRONG,
} from "../../../utils";

import { getImageUrl } from "../../api/util"

const SessionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { apiData: productData, isLoading: productLoading, error: productError } = useFetch(productDetails, id);
  const { apiData: faqData, isLoading: faqLoading, error: faqError } = useFetch(faqsDetails, id);
  const { apiData: reviews, isLoading: reviewsLoading, error: reviewsError } = useFetch(reviewsDetails, id);
  const {
    apiData: astrologerData,
    isLoading: astrologerLoading,
    error: astrologerError
  } = useFetch(astrologersByProduct, id);


  const isLoading = productLoading || faqLoading || reviewsLoading || astrologerLoading;
  const hasError = productError || faqError || reviewsError || astrologerError;

  // Handle status change function
  const handleStatusChange = async (id, status) => {
    try {
      const response = await productStatusUpdate({ id, status });
      if (response.status === 'ok') { // Assuming 'ok' is a string
        showSnackbar(response.message, "success");
        window.location.reload();
      } else {
        showSnackbar(SOMETHING_WENT_WRONG, "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar(SOMETHING_WENT_WRONG, "error");
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "badge badge-warning",
      approved: "badge badge-success",
      rejected: "badge badge-danger"
    };

    return (
      <span className={statusClasses[status] || "badge badge-secondary"}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
      </span>
    );
  };

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
            ) : title === "Banner" ? (
              value?.length > 0 ? (
                <img
                  src={getImageUrl(value)}
                  alt="Image"
                  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              ) : (
                "Not Available"
              )
            ) : title === "Section Viedo" ? (
              value?.length > 0 ? (
                <video
                  src={getImageUrl(value)}
                  controls
                  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                "Not Available"
              )
            ) : title === "Status" ? (
              getStatusBadge(value)

            ) : title === "FAQ" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="15%">FAQ ID</th>
                        <th width="35%">Question</th>
                        <th width="35%">Answer</th>
                        <th width="15%">Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{value.id}</td>
                        <td>{value.question}</td>
                        <td>
                          <div dangerouslySetInnerHTML={{ __html: value.answer }} />
                        </td>
                        <td>{formatDateTime(value.created_date)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : title === "Astrologers" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  {Array.isArray(value) && value.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Languages</th>
                          <th>Experience</th>
                          <th>Session Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((astro) => (
                          <tr key={astro.id}>
                            <td>
                              <img
                                src={astro.avatar}
                                alt={astro.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>
                              <Link to={`/astrologer/${astro.id}/view`}>
                                {astro.name}
                              </Link>
                            </td>
                            <td>{astro.languages?.join(", ") || "NA"}</td>
                            <td>{astro.experience || "NA"} yrs</td>
                            <td>{formatPrice(astro.session_price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Not Available</p>
                  )}
                </div>
              </div>



            ) : title === "Reviews" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="15%">Reviewer Name</th>
                        <th width="35%">Reviewer Email</th>
                        <th width="35%">Session Name</th>
                        <th width="35%">Rating</th>
                        <th width="35%">Review Message</th>
                        <th width="15%">Created Date</th>
                        <th width="35%">Updated Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{value.reviewer_name}</td>
                        <td>{value.reviewer_email}</td>
                        <td>{value.product_name}</td>
                        <td>{value.rating}</td>
                        <td>{value.review_message}</td>
                        <td>{formatDateTime(value.created_date)}</td>
                        <td>{formatDateTime(value.updated_date)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              value || "Not Available"
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
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Session Detail</h1>
          <p className="mb-0">
            {isLoading ? "Loading" : "Showing"} details of Session
          </p>
        </div>

        {/* Status Change Action Buttons */}
        {!isLoading && !hasError && productData?.data && (
          <div className="btn-group" role="group">
            {productData.data.status !== "Approved" && (
              <button
                onClick={() => handleStatusChange(productData.data.id, "Approved")}
                className="btn btn-success btn-sm"
                type="button"
              >
                <i className="fas fa-check"></i> Approved
              </button>
            )}
            {productData.data.status !== "Rejected" && (
              <button
                onClick={() => handleStatusChange(productData.data.id, "Rejected")}
                className="btn btn-danger btn-sm"
                type="button"
                style={{ marginLeft: "5px" }}
              >
                <i className="fas fa-times"></i> Rejected
              </button>
            )}
            {productData.data.status !== "Pending" && (
              <button
                onClick={() => handleStatusChange(productData.data.id, "Pending")}
                className="btn btn-warning btn-sm"
                type="button"
                style={{ marginLeft: "5px" }}
              >
                <i className="fas fa-clock"></i> Mark Pending
              </button>
            )}
          </div>
        )}
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <div>
              <p>Loading Session data...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                {!hasError ? (
                  <>
                    {detailRow("Session ID", productData?.data?.id)}
                    {detailRow("Session Name", productData?.data?.product_name)}
                    {detailRow("Description", productData?.data?.description, true)}
                    {detailRow("Base Price", formatPrice(productData?.data?.base_price))}
                    {detailRow("Category", (
                      <Link to={`/categories/${productData?.data?.category}/view`}>
                        {productData?.data?.category_name}
                      </Link>
                    ))}
                    {detailRow("Session Type", productData?.data?.session_type)}
                    {detailRow("Status", productData?.data?.status)}

                    {detailRow("Created At", formatDateTime(productData?.data?.created_date))}
                    {detailRow("Banner", productData?.data?.banner)}
                    {detailRow("Section Viedo", productData?.data?.section_video)}
                    {detailRow("FAQ", faqData?.data)}
                    {detailRow("Reviews", reviews?.data)}
                    {detailRow("Astrologers", astrologerData?.astrologers)}

                  </>
                ) : (
                  <p>
                    {productError || faqError || reviewsError || "An error occurred"}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SessionDetails;