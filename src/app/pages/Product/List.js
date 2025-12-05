import React, { useEffect, useState } from "react";
import ListingTable from "../../components/ListingTable/ListingTable";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import {
  errorType,
  ok,
  SESSION_EXPIRED,
  showSnackbar,
  SOMETHING_WENT_WRONG,
  formatDateTime,
  formatPrice
} from "../../../utils";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Stack
} from "@mui/material";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch } from "../../store";
import {
  productList,
  productdelete,
  productStatusUpdate
} from "../../api/product";
import useSubmit from "../../hooks/useSubmit";

const ProductList = () => {




  const [openEdit, setOpenEdit] = useState(false);
  const handleEditModelClose = () => {
    setOpenEdit(false);
  };


  const [open, setOpen] = useState(false);
  const [objId, setObjID] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const { apiData, isLoading, serverError } = useFetch(productList, {});
  // const { apiData:status, isLoading:statusisLoading, serverError:statusError } = useFetch(productStatusUpdate);

  const { makeRequest, data, isSubmitLoading, submitError } =
    useSubmit(productdelete);

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
    }
  }, [data, submitError]);


  const handleStatusChange = async (id, status) => {
    try {
      const response = await productStatusUpdate({ id, status });
      if (response.status === ok) {
        showSnackbar(response.message, "success");
        window.location.reload();
      } else {
        showSnackbar(SOMETHING_WENT_WRONG, "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar(SOMETHING_WENT_WRONG, "error");
    }
  };


  const columns = [
    { name: "ID", selector: (row) => row?.id ?? row?.id, sortable: false },
    { name: "Product Name", selector: (row) => row?.product_name },
    {
      name: "Price",
      selector: (row) => formatPrice(row?.price)
    },
    { name: "Category", selector: (row) => row?.category_name },
    // { name: "Owner", selector: (row) => row?.author_name },
    { name: "Status", selector: (row) => row?.status },
    { name: "Created At", selector: (row) => formatDateTime(row?.created_date) },


    {
      name: "Actions",
      cell: (row) => {

        return (
          <>

            <Link
              to={`/product/${row.id}/view`}
              className="btn btn-info btn-xs action-btn"

            >
              View
            </Link>

            <Link
              onClick={() => {

                setObjID(row?.id)
                setOpenEdit(true)
              }}
              className="btn btn-warning btn-xs action-btn"
            >
              Edit
            </Link>



          </>
        );
      },
    },


  ];

  return (
    <Layout>
      <>
        <h1 className="h3 mb-2 text-gray-800">Product</h1>
        <p className="mb-4">Showing the list of Product</p>

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
                    data={apiData?.data?.filter((item) => item?.product_type === "Item")}
                    isLoading={isLoading}
                    filterColumn={["id", "product_name"]}
                  />
                ) : null}
              </div>
            )}
            <Link
              to={`${RoutesList.product}/new`}
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
            href={`/product/${objId}/edit`}
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
export default ProductList;
