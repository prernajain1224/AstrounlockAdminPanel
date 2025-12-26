import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { ordersDetails } from "../../api/orders";
import Layout from "../Layout";
import { formatDateTime, formatPrice } from "../../../utils";

const OrderItemDetails = () => {
    const { id } = useParams();
    const { apiData: orderitem, isLoading, error } = useFetch(ordersDetails, id);

    const detailRow = (title, value) => (
        <>
            <div className="small mb-1">
                <b>{title}:</b>
            </div>
            <nav className="navbar navbar-expand navbar-light bg-light mb-2">
                {value ?? "Not Available"}
            </nav>
        </>
    );

    return (
        <Layout>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 mb-2 text-gray-800">Order Item Details</h2>
                <p className="mb-4">{isLoading ? "Loading..." : "Detailed view of Order Item"}</p>
            </div>

            <div className="card shadow mb-4">
                <div className="card-body">
                    {isLoading ? (
                        <p>Loading Order Items data...</p>
                    ) : error ? (
                        <p>Error loading Order Items details.</p>
                    ) : (
                        <>
                            <h5>Order Items:</h5>
                            {orderitem?.data?.items?.map((item, index) => (
                                <div key={item.id} className="mb-4 p-3 border rounded">
                                {detailRow("Order Item ID", item.id)}
                                
                                    {detailRow("Product Name", (
                                        <Link to={`/product/${item?.product}/view`}>
                                            {item.product_name}
                                        </Link>
                                    ))}
                                    {detailRow("User", (
                                        <Link to={`/user/${item?.user}/view`}>
                                            {item.user.name}
                                        </Link>
                                    ))}

                                    {detailRow("Quantity", item.quantity)}
                                    {detailRow("GST", formatPrice(item.gst))}
                                    {detailRow("Price", formatPrice(item.price))}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default OrderItemDetails;
