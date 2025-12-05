import React, { useEffect,useState } from "react";
import ListingTable from "../../components/ListingTable/ListingTable";
import useFetch from "../../hooks/useFetch";
import { selectUser } from '../../store/user/selectors';
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import {
  errorType,
  ok,
  SESSION_EXPIRED,
  showSnackbar,
  SOMETHING_WENT_WRONG,
  formatDateTime,
} from "../../../utils";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch,useAppSelector } from "../../store";
import {
  adminUsersList,
  adminUserdelete,
} from "../../api/adminUsers";
import useSubmit from "../../hooks/useSubmit";

const AdminList = () => {
  const currentUser = useAppSelector(selectUser);
  const currentUserId = currentUser?.id;

    const [open, setOpen] = useState(false);
    const [objId,setObjID] = useState();
    const handleClose = () => {
      setOpen(false);
    };
  // const { apiData, isLoading, serverError } = useFetch(adminUsersList, {});

   const { apiData, isLoading, serverError } = useFetch(() =>
  adminUsersList({ user_type: "Administrator" }), []
);

  const { makeRequest, data, isSubmitLoading, submitError } =
    useSubmit(adminUserdelete);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (serverError === "sessionTimeout") {
      dispatch({ type: "RESET" });
      localStorage.removeItem("Token");
      showSnackbar(SESSION_EXPIRED, "error");
      return navigate(RoutesList.login);
    }
  }, [serverError]);

  useEffect(() => {
    if (data?.status === ok) {
      setTimeout(function () {
        window.location.reload();
      }, 1000);
      showSnackbar(data?.message, "success");
    } else if (submitError?.status === errorType) {
      showSnackbar(SOMETHING_WENT_WRONG, "error");
    } else if (data?.status === "error") {
      showSnackbar(data?.message || "You cannot delete your own account.", "error");
    }
  }, [data, submitError]);

  const columns = [
    { name: "ID", selector: (row) => row?.id ?? row?.id, sortable: false },
    { name: "Name", selector: (row) => row?.name },
    { name: "Email", selector: (row) => row?.email },
    { name: "Created At", selector: (row) => formatDateTime(row?.created_at) },

    {
      name: "Actions",
      cell: (row) => {
        

        const isCurrentUser = currentUserId && (
          String(row?.id) === String(currentUserId) ||
          Number(row?.id) === Number(currentUserId) ||
          row?.id == currentUserId
        );
        
        return (
          <>
            <Link
              to={`/admin/${row.id}/view`}
              className="btn btn-success btn-xs action-btn"
            >
              View
            </Link>
            <Link
               to={`/admin/${row.id}/edit`}
              className="btn btn-warning btn-xs action-btn"
            >
              Edit
            </Link>
            {/* Hide delete button for current user's own account */}
            {!isCurrentUser ? (
              <Link
                onClick={() => {
                  setObjID(row?.id)
                  setOpen(true)
                }}
                className="btn btn-danger btn-xs action-btn"
                // style={{ cursor: 'pointer' }}
              >
                Delete
              </Link>
            ) : (
              <span className="btn btn-danger btn-xs action-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                Delete
              </span>


              
            )}
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <>
        <h1 className="h3 mb-2 text-gray-800">Admin</h1>
        <p className="mb-4">Showing the list of Admin</p>

        <div className="card shadow mb-4">
          <div className="card-body">
            {isLoading ? (
              <div>
                <p>Loading data...</p>
              </div>
            ) : (
              <div className="table-responsive">
                {apiData?.data?.length > 0 ? (
                  <ListingTable
                    columns={columns}
                    data={apiData?.data}
                    // data={apiData?.data?.filter((user) => user.user_type === "Administrator")}
                    isLoading={isLoading}
                    filterColumn={["id","name","email"]}
                  />
                ) : null}
              </div>
            )}
            <Link
              to={`${RoutesList.admin}/new`}
              className="btn btn-primary"
            >
              Add new
            </Link>
          </div>
        </div>
      </>
       <Dialog open={open} onClose={handleClose} fullWidth>
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
                        Are you sure you want to delete this?
                      </Typography>
                      <DialogContent style={{ alignSelf: "center" }}>
                        <Button
                          color="warning"
                          variant="contained"
                          className="mr-3"
                          onClick={() => {
                            makeRequest(objId);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="contained"
                          className="info"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogContent>
                    </Dialog>


    </Layout>
  );
};
export default AdminList;