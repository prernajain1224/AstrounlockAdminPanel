import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
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


const TransactionDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUser = useAppSelector(selectUser);

    const { apiData: astrologerData, isLoading: astrologerLoading, error: astrologerError } = useFetch(adminUserDetails, id);
    const { apiData: balanceData, isLoading: balanceLoading, error: balanceError } = useFetch(walletBalanceDetails, id);


    const isLoading = balanceLoading;

    const hasError = balanceError;


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
                                <a href={value} target="_blank" rel="noopener noreferrer">
                                    Download
                                </a>
                            ) : (
                                "Not Available"
                            )

                        ) : title === "Wallet Transtion " ? (
                            <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th width="15%">Wallet ID</th>
                                                <th width="35%">Wallet Balance</th>
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

                        ) : title === "Wallet Transaction" ? (
                            <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <div className="table-responsive">
                                    {Array.isArray(value) && value.length > 0 ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Transaction Id</th>
                                                    <th width="25%">Transaction Type</th>
                                                    <th width="15%">Amount</th>
                                                    <th width="15%">Reason</th>
                                                    <th width="20%">Transaction Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {value.map((transactions) => (
                                                    <tr key={transactions.id}>
                                                        <td>{transactions.id}</td>
                                                        <td>{transactions.transaction_type_display}</td>
                                                        <td>{formatPrice(transactions.amount)}</td>
                                                        <td>{transactions.reason}</td>
                                                        <td>{formatDateTime(transactions.transaction_date)}</td>
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
                    <h1 className="h3 mb-2 text-gray-800">Wallet Details</h1>
                    <p className="mb-4"> {isLoading ? "Loading" : "Showing"} Details of Wallet</p>

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
                                        {detailRow("ID", balanceData?.data?.id)}
                                        {detailRow("Customer", (
                                            <Link to={`/astrologer/${balanceData?.data?.user?.id}/view`}>
                                                {balanceData?.data?.user?.name}
                                            </Link>
                                        ))}
                                        {detailRow("Wallet Transaction", balanceData?.data?.transactions)}
                                        {detailRow("Balance", formatPrice(balanceData?.data?.balance))}
                                        {detailRow("Created At", formatDateTime(balanceData?.data?.created_date))}
                                        {detailRow("Updated At", formatDateTime(balanceData?.data?.updated_date))}
                                    </>
                                ) : (
                                    <p>
                                        {balanceError || "An error occurred"}
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
export default TransactionDetails;
