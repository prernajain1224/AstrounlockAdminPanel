import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import { opportunityTypeDetails } from "../../api/opportunityTypes";
import Layout from "../Layout";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../store";
import RoutesList from "../../constants/RoutesList";
import {
  adminUserDetails, walletBalanceDetails
} from "../../api/adminUsers";
import {
  bankdetailsDetails
} from "../../api/bankdetails";

import {
  chatsDetails
} from "../../api/chats";

import { getImageUrl } from "../../api/util"
import {
  formatDateTime, formatPrice
} from "../../../utils";


const AstrologerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useAppSelector(selectUser);

  const { apiData: astrologerData, isLoading: astrologerLoading, error: astrologerError } = useFetch(adminUserDetails, id);
  const { apiData: bankData, isLoading: bankLoading, error: bankError } = useFetch(bankdetailsDetails, id);
  const { apiData: balanceData, isLoading: balanceLoading, error: balanceError } = useFetch(walletBalanceDetails, id);
  const { apiData: chatData, isLoading: chatLoading, error: chatError } = useFetch(chatsDetails, id);


  const isLoading = astrologerLoading || bankLoading || balanceLoading || chatLoading;

  const hasError = astrologerError || bankError || balanceError || chatError;


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

            ) : title === "Bank Details" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="15%">Bank ID</th>
                        <th width="35%">Bank Account Number</th>
                        <th width="35%">Bank Name</th>
                        <th width="15%">Account Holder Name</th>
                        <th width="15%">IFSC CODE</th>
                        <th width="15%">Status</th>
                        <th width="15%">Bank Passbook Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{value.id}</td>
                        <td>{value.bank_account_number}</td>
                        <td>{value.bank_name}</td>
                        <td>{value.account_holder_name}</td>
                        <td>{value.ifsc_code}</td>
                        <td>{value.status}</td>
                        <td>
                          {value.attachment?.length > 0 ? (
                            <a href={value.attachment} target="_blank">
                              Download
                            </a>
                          ) : (
                            "Not Available"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            ) : title === "Wallet" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="15%">Wallet ID</th>
                        <th width="35%"> Balance</th>
                        <th width="35%">Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{value.id}</td>
                        <td>{formatPrice(value.balance)}</td>
                        <td>
                          <p>
                            <Link to={`/wallet/${astrologerData?.data?.id}`}>View</Link>
                          </p>
                        </td>

                      </tr>
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
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Astrologer Details</h1>
          <p className="mb-4"> {isLoading ? "Loading" : "Showing"} details of Astrologer</p>

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
                    {detailRow("ID", astrologerData?.data?.id)}
                    {detailRow("Real Name", astrologerData?.data?.name)}
                    {detailRow("Dispaly Name", astrologerData?.data?.display_name)}
                    {detailRow("Email", astrologerData?.data?.email)}
                    {detailRow("Phone Number", astrologerData?.data?.phone_number)}
                    {detailRow("Alternative Number", astrologerData?.data?.alternative_number)}
                    {detailRow("User Type", astrologerData?.data?.user_type)}
                    {detailRow("DOB", astrologerData?.data?.dob)}
                    {detailRow("Time of Birth", astrologerData?.data?.time_of_birth)}
                    {detailRow("Place of Birth", astrologerData?.data?.place_of_birth)}
                    {detailRow("About", astrologerData?.data?.about)}
                    {detailRow("Religion", astrologerData?.data?.religion)}
                    {detailRow("Chat Price (per minute)", `₹ ${astrologerData?.data?.chat_price_min}`)}
                    {detailRow("Experience", astrologerData?.data?.experience)}
                    {detailRow(
                      "Languages",
                      astrologerData?.data?.languages?.length
                        ? astrologerData.data.languages.join(", ")
                        : "Not Available"
                    )}

                    {detailRow("Avatar", astrologerData?.data?.avatar)}
                    {detailRow("Created At", formatDateTime(astrologerData?.data?.created_at))}
                    {detailRow("Bank Details", bankData?.data)}
                    {detailRow("Wallet", balanceData?.data)}
                    {detailRow("Chat History", chatData?.data)}


                  </>
                ) : (
                  <p>
                    {astrologerError || bankError || balanceError || "An error occurred"}
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
export default AstrologerDetails;
