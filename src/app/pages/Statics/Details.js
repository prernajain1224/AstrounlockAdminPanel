import React from "react";
import useFetch from "../../hooks/useFetch";
import { StatisticsList } from "../../api/adminUsers";
import { Link, useNavigate, useParams } from "react-router-dom";

import Layout from "../Layout";
import { getImageUrl } from "../../api/util";
import {
  formatDateTime,
  formatPrice
} from "../../../utils";

const StaticDetails = () => {
  // const { id } = useParams();

  const { apiData: listData, isLoading: listLoading, error: listError } = useFetch(StatisticsList);

  const isLoading = listLoading;

  const hasError = listError;

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
            ) : title === "Users" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="10%">Type</th>
                        <th width="10%">Total</th>
                        <th width="10%" >This Month</th>
                        <th width="10%" >End Month</th>
                        <th width="10%" >This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Astrologers</td>
                        <td>{value?.users?.astrologers?.total}</td>
                        <td>{value?.users?.astrologers?.month}</td>
                        <td>{value?.users?.astrologers?.end_month}</td>
                        <td>{value?.users?.astrologers?.year}</td>
                      </tr>
                      <tr>
                        <td>Administrators</td>
                        <td>{value?.users?.administrators?.total}</td>
                        <td>{value?.users?.administrators?.month}</td>
                        <td>{value?.users?.astrologers?.end_month}</td>
                        <td>{value?.users?.administrators?.year}</td>
                      </tr>
                      <tr>
                        <td>Users</td>
                        <td>{value?.users?.normal_users?.total}</td>
                        <td>{value?.users?.normal_users?.month}</td>
                        <td>{value?.users?.astrologers?.end_month}</td>
                        <td>{value?.users?.normal_users?.year}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            ) : title === "Orders" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>This Month</th>
                        <th>End Month</th>
                        <th>This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{value?.orders?.total}</td>
                        <td>{value?.orders?.month}</td>
                        <td>{value?.orders?.end_month}</td>

                        <td>{value?.orders?.year}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            ) : title === "Blogs" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive">
                  {/* Blog Posts Table */}
                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Total</th>
                        <th>This Month</th>
                        <th>End of Month</th>
                        <th>This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Blog Posts</strong></td>
                        <td>{value?.blogs?.total ?? "-"}</td>
                        <td>{value?.blogs?.month ?? "-"}</td>
                        <td>{value?.blogs?.end_month ?? "-"}</td>
                        <td>{value?.blogs?.year ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Blog Views Table */}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Total</th>
                        <th>This Month</th>
                        <th>End of Month</th>
                        <th>This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Blog Views</strong></td>
                        <td>{value?.blogs?.views?.total ?? "-"}</td>
                        <td>{value?.blogs?.views?.month ?? "-"}</td>
                        <td>{value?.blogs?.views?.end_month ?? "-"}</td>
                        <td>{value?.blogs?.views?.year ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>




            ) : title === "Products" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="table-responsive mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Total</th>
                        <th>This Month</th>
                        <th>End of Month</th>
                        <th>This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Items</strong></td>
                        <td>{value?.products?.item?.total ?? "-"}</td>
                        <td>{value?.products?.item?.month ?? "-"}</td>
                        <td>{value?.products?.item?.['end_month'] ?? "-"}</td>
                        <td>{value?.products?.item?.year ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Total</th>
                        <th>This Month</th>
                        <th>End of Month</th>
                        <th>This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Sessions</strong></td>
                        <td>{value?.products?.session?.total ?? "-"}</td>
                        <td>{value?.products?.session?.month ?? "-"}</td>
                        <td>{value?.products?.session?.['end_month'] ?? "-"}</td>
                        <td>{value?.products?.session?.year ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>



            ) : title === "Wallet Transactions" ? (
              <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>

                        <th>Total</th>
                        <th>This Month</th>
                        <th>End Month</th>
                        <th>This Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                        <td>{value?.wallet_transactions?.total}</td>
                        <td>{value?.wallet_transactions?.month}</td>
                        <td>{value?.wallet_transactions?.end_month}</td>
                        <td>{value?.wallet_transactions?.year}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h5>Wallet Transactions Type</h5>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Transaction Type</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value?.wallet_transactions?.by_type?.map((item, index) => (
                        <tr key={index}>
                           <td>{item.transaction_type.charAt(0).toUpperCase() + item.transaction_type.slice(1)}</td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
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
          <h1 className="h3 text-gray-800">Statistics Details</h1>
          <p className="mb-0">
            {isLoading ? "Loading" : "Showing"} details of Statistics

          </p>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading product data...</p>
          ) : (
            <>
              <div className="table-responsive">
                {!hasError ? (
                  <>
                    {detailRow("Users", listData?.data)}
                    {detailRow("Orders", listData?.data)}
                    {detailRow("Blogs", listData?.data)}
                    {detailRow("Products", listData?.data)}
                    {detailRow("Wallet Transactions", listData?.data)}
                  </>
                ) : (
                  <p>
                    {listError || "An error occurred"}

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

export default StaticDetails;