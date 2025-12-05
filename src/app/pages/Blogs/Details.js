import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Layout from "../Layout";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../store";
import RoutesList from "../../constants/RoutesList";
import { blogsDetails } from "../../api/blogs";
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
  formatDateTime
} from "../../../utils";
import { getImageUrl } from "../../api/util"

const BlogsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useAppSelector(selectUser);
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditModelClose = () => {
    setOpenEdit(false);
  };
  const { apiData, isLoading, error } = useFetch(blogsDetails, id);

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
            ) : title === "Tags" ? (
              <div
                className="col-12"
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="75%">Name</th>
                        <th>Priority</th>
                        <th>Color Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value.map((item) => {
                        return (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.priority}</td>
                            <td>{item.color_code}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            ) : title === "Banner Image" ? (
              value ? (
                <img
                  src={getImageUrl(value)}
                  alt="Banner"
                  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              ) : (
                "Not Available"
              )
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
            <h1 className="h3 mb-2 text-gray-800">Blogs Details</h1>
            <p className="mb-4">Showing details of Blogs</p>
          </div>

          <Link
            onClick={() => {

              setOpenEdit(true)
            }}

            className="btn btn-primary"
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
                      {detailRow("Title", apiData?.data?.title)}
                      {detailRow("Description", apiData?.data?.description)}
                      {detailRow("Author", (
                        <Link to={`/astrologer/${apiData?.data?.post_by}/view`}>
                          {apiData?.data?.post_by_name}
                        </Link>
                      ))}
                      {detailRow("Status", apiData?.data?.status)}
                      {detailRow("Viewer", apiData?.data?.viewer_count)}
                      {detailRow("Banner Image", apiData?.data?.banner_image)}
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
      {/* edit */}
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
            href={`/blogs/${id}/edit`}
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
export default BlogsDetails;
