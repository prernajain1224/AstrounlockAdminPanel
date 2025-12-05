import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { roleDetails } from "../../api/roles";
import Layout from "../Layout";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../store";
import RoutesList from "../../constants/RoutesList";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import {
  errorType,
  ok,
  SESSION_EXPIRED,
  showSnackbar,
  SOMETHING_WENT_WRONG,
  formatDateTime
} from "../../../utils";

const RoleDetails = () => {
   const [openEdit, setOpenEdit] = useState(false);
    const handleEditModelClose = () => {
      setOpenEdit(false);
    };
  const navigate = useNavigate();
  const { id } = useParams();

  const { apiData, isLoading, error } = useFetch(roleDetails, id);

  const detailRow = (title, value) => {
    return (
      <>
        <div className="small mb-1">
          <b>{title}:</b>
        </div>
        <nav className="navbar navbar-expand navbar-light bg-light mb-2">
          {value ? (
            title === "Permissions" ? (
              <div
                className="col-12"
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="75%">Name</th>
                        <th>Checker</th>
                        <th>Maker</th>
                        <th>Read Only</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(value).map((item) => {
                        return (
                          <tr>
                            <td>{item[0]}</td>
                            <td>{item[1].checker ? "Yes" : "No"}</td>
                            <td>{item[1].maker ? "Yes" : "No"}</td>
                            <td>{item[1].read_only ? "Yes" : "No"}</td>
                          </tr>
                        );
                      })}
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
            <h1 className="h3 mb-2 text-gray-800">Role Details</h1>
            <p className="mb-4">
              Showing details of Role:{" "}
              {isLoading ? "Loading..." : apiData?.data?.title}
            </p>
          </div>

          <Link
          
            onClick={() => {
              
              // setObjID(row?.id)
              setOpenEdit(true)
            }}
            className="btn btn-primary btn-xs"
          >
            Edit
          </Link>
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
                      {detailRow("Name", apiData?.data?.role_name)}
                      {detailRow("Permissions", apiData?.data?.permissions)}

                      {detailRow("Created At", formatDateTime(apiData?.data?.created_date))}
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
      <Dialog open={openEdit} onClose={handleEditModelClose} fullWidth>
                            <DialogTitle variant="inherit" fontSize={20} fontWeight="bold">
                              Are you sure?
                            </DialogTitle>
                            <Divider />
                            <Typography
                              variant="inherit"
                              fontSize={18}
                              fontWeight="600"
                              className="mx-4 my-3"
                            >
                              Are you sure you want to Edit this?
                            </Typography>
                            <DialogContent style={{ alignSelf: "center" }}>
                              <a
                                color="warning"
                                variant="contained"
                                className="btn btn-success btn-xs action-btn"
                                href={`/roles/${id}/edit`}
                              >
                                Yes
                              </a>
                              <a
                                variant="contained"
                                className="btn btn-danger btn-xs action-btn"
                                onClick={() => {
                                  setOpenEdit(false);
                                }}
                              >
                                No
                              </a>
                            </DialogContent>
                          </Dialog>
    </Layout>
  );
};
export default RoleDetails;
