import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Layout from "../Layout";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../store";
import RoutesList from "../../constants/RoutesList";
import {
  formatDateTime, formatPrice
} from "../../../utils";
import {
  adminUserDetails,
} from "../../api/adminUsers";
import {
adminUserAddresses
} from "../../api/users";
import {
  wishlistDetails
} from "../../api/carts";
import { getImageUrl } from "../../api/util"
import {
  chatsDetails
} from "../../api/chats";
import { userProductRecommendations } from "../../api/product_recommendations";


const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { apiData: user, isLoading: isUserLoading, error: userError } = useFetch(adminUserDetails, id);
  const { apiData: wishlist, isLoading: isWishlistLoading, error: wishlistError } = useFetch(wishlistDetails, id);
  const { apiData: chatData, isLoading: chatLoading, error: chatError } = useFetch(chatsDetails, id);
  const { apiData: recommendations, isLoading: isRecommendationsLoading, error: recommendationsError } = useFetch(userProductRecommendations, id);
  const { apiData: addresses, isLoading: addressLoading, error: addressError } = 
    useFetch((id) => adminUserAddresses(id), id);



  const isLoading =
    isUserLoading || isWishlistLoading || chatLoading ||isRecommendationsLoading;

  const hasError = userError || wishlistError || chatError || recommendationsError;
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
            ) : title === "Wishlist Items" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Wishlist ID</th>
                        <th>Product</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(value) && value.length > 0 ? (
                        value.map((item) => (
                          <tr key={item.id}>
                            <td>{item.wishlist}</td>
                              <td>
                              <Link to={`/product/${item.product}/view`}>
                                {item.product_name}
                              </Link>
                            </td>
                          
                            <td>{formatDateTime(item.created_date)}</td>
                            <td>{formatDateTime(item.updated_date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-muted text-center">
                            No wishlist items found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            ) : title === "User Addresses" ? (
    <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>House No</th>
                        <th>Area</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(value) && value.length > 0 ? (
                        value.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.phone}</td>
                                <td>{item.house_no}</td>
                                <td>{item.area}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.pincode}</td>
                                <td>{item.country}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-muted text-center">
                                No addresses found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>



            ) : title === "Chat History" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="10%">Chat Id</th>
                        <th width="15%">Chat Member 1</th>
                        <th width="25%">Chat Member 2</th>
                        <th width="35%">Transaction Details</th>
                        <th width="10%">Amount</th>
                        <th width="25%">Last Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chatData?.data?.map((value) => (
                        <tr key={value.id}>
                          <td>{value.id}</td>
                          <td>{value.member_1_details?.username || "No Username"}</td>
                          <td>{value.member_2_details?.username || "No Username"}</td>
                          <td>{value.transaction_details}</td>
                          <td>{formatPrice(value.amount)}</td>
                          <td>{value.last_message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>


             ) :  title === "Product Remedies" ? (
  <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Created By</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(value) && value.length > 0 ? (
            value.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/product/${item.product}/view`}>
                    {item.product_name}
                  </Link>
                </td>
                <td>{item.created_by_name}</td>
                <td>{formatDateTime(item.created_date)}</td>
                <td>{formatDateTime(item.updated_date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-muted text-center">
                No product recommendations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>


            ) : (
              value ?? "Not Available"
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
            <h1 className="h3 mb-2 text-gray-800">User Details</h1>
            <p className="mb-4"> {isLoading ? "Loading" : "Showing"} details of User</p>
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
                  {!hasError ? (
                    <>
                      {detailRow("ID", user?.data?.id)}
                      {detailRow("Name", user?.data?.name)}
                      {detailRow("Real Name", user?.data?.display_name)}
                      {detailRow("Email", user?.data?.email)}
                      {detailRow("Phone Number", user?.data?.phone_number)}
                      {detailRow("User Type", user?.data?.user_type)}
                      {detailRow("DOB", user?.data?.dob)}
                      {detailRow("Time of Birth", user?.data?.time_of_birth)}
                      {detailRow("Place of Birth", user?.data?.place_of_birth)}
                      {detailRow("About", user?.data?.about)}
                      {detailRow("Avatar", user?.data?.avatar)}
                      {detailRow("Created At", formatDateTime(user?.data?.created_at))}
                      {detailRow("Wishlist Items", wishlist?.data?.items)}
                      {detailRow("Chat History", chatData?.data)}
                      {detailRow("User Addresses", addresses?.addresses)}

                       {detailRow("Product Remedies", recommendations?.data)}
                      <br />
                      <p>Carts : <Link to={`/carts/${user?.data?.id}`}>
                        View Cart Details
                      </Link> </p>

                    </>
                  ) : (
                    <p>
                      {userError || wishlistError || chatError || "An error occurred"}
                    </p>
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
export default UserDetails;
