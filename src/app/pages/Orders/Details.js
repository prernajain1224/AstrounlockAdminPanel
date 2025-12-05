import React from "react";
import useFetch from "../../hooks/useFetch";
import { ordersDetails } from "../../api/orders";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faqsDetails } from "../../api/faqs";
import Layout from "../Layout";
import { getImageUrl } from "../../api/util";
import {
  formatDateTime,
  formatPrice
} from "../../../utils";

const OrderDetails = () => {
  const { id } = useParams();

  const { apiData: orderData, isLoading: orderLoading, error: orderError } = useFetch(ordersDetails, id);

  const isLoading = orderLoading;

  const hasError = orderError;

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

            ) : title === "Order Items" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  {Array.isArray(value) && value.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th width="20%">Order Item ID</th>
                          <th width="15%">Product Name</th>
                          <th width="25%">Astrologer</th>
                          <th width="15%">Quantity</th>
                          <th width="15%">GST</th>
                          <th width="10%">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((items) => (
                          <tr key={items.id}>
                            <td>{items.id}</td>
                            <td>
                              <Link to={`/product/${items.product}/view`}>
                                {items.product_name}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/astrologer/${items.user}/view`}>
                                {items.astrologer_name}
                              </Link>
                            </td>
                            <td>{items.quantity}</td>

                            <td>{formatPrice(items.gst)}</td>
                            <td>{formatPrice(items.price)}</td>


                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Not Available</p>
                  )}
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
          <h1 className="h3 text-gray-800">Order Details</h1>
          <p className="mb-0">
            {isLoading ? "Loading" : "Showing"} details of Order

          </p>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading Order data...</p>
          ) : (
            <>
              <div className="table-responsive">
                {!hasError ? (
                  <>
                    {detailRow("Order ID", orderData?.data?.id)}
                    {detailRow("Customer", (
                      <Link to={`/astrologer/${orderData?.data?.user}/view`}>
                        {orderData?.data?.username}
                      </Link>
                    ))}

                    {detailRow("Sub Total", formatPrice(orderData?.data?.sub_total))}
                    {detailRow("Gst", formatPrice(orderData?.data?.Gst))}
                    {detailRow("Order Total", formatPrice(orderData?.data?.total))}
                    {detailRow("Payment Method", orderData?.data?.payment_method)}
                    {detailRow("Payment Received", orderData?.data?.payment_received ? "Yes" : "No")}
                    {detailRow("Status", orderData?.data?.status)}
                    {detailRow("Order Items", orderData?.data?.items)}
                    {detailRow("Payment Status", orderData?.data?.payment_status?.charAt(0).toUpperCase() + orderData?.data?.payment_status?.slice(1))}
                    {detailRow("Wallet Balance Used", formatPrice(orderData?.data?.wallet_balance_used))}
                    {detailRow("Razor Payment", orderData?.data?.razorpay_payment_id)}
                    {detailRow("Created At", formatDateTime(orderData?.data?.created_at))}
                    {detailRow("Updated At", formatDateTime(orderData?.data?.updated_at))}

                  </>
                ) : (
                  <p>
                    {orderError || "An error occurred"}

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

export default OrderDetails;