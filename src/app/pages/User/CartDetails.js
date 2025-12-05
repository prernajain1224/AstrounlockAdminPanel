import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { cartdetailsDetails } from "../../api/carts";
import Layout from "../Layout";
import {
 formatDateTime,formatPrice
} from "../../../utils";


const CartDetails = () => {
  const { cartId } = useParams();
  const { apiData: cart, isLoading, error } = useFetch(cartdetailsDetails, cartId);

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
        <h2 className="h3 mb-2 text-gray-800">Cart Details</h2>
        <p className="mb-4">{isLoading ? "Loading..." : "Detailed view of cart"}</p>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading cart data...</p>
          ) : error ? (
            <p>Error loading cart details.</p>
          ) : (
            <>
              {detailRow("Cart ID", cart?.data?.id)}
              {detailRow("Coupon Code", cart?.data?.coupon_code || "None")}
              {detailRow("Discount", formatPrice(cart?.data?.coupon_discount))}
              {detailRow("Total Amount", formatPrice(cart?.data?.total_amount))}
              {detailRow("Created At", formatDateTime(cart?.data?.created_date))}
              {detailRow("Updated At", formatDateTime(cart?.data?.updated_date))}

              {cart?.data?.cart_items?.length > 0 ? (
                <>
                  <div className="small mb-1"><b>Cart Items:</b></div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>GST</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.data.cart_items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>{formatPrice(item.price)}</td>
                            <td>{item.gst}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                detailRow("Cart Items", "No cart items found.")
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartDetails;
