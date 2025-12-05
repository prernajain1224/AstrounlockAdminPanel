import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom/dist";
import Loading from "../../components/Loading/Loading";
import {
  SESSION_EXPIRED,
  SESSION_TIMEOUT,
  SOMETHING_WENT_WRONG,
  errorType,
  ok,
  showSnackbar,
  formatDateTime,
  BOOLEAN_OPTIONS,
  SUCCESS
} from "../../../utils";
import { useForm } from "react-hook-form";
import useSubmit from "../../hooks/useSubmit";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch } from "../../store";
import {

  categorieCreate,
  categorieDetails,
  categorieUpdate,
} from "../../api/categories";
import { getImageUrl } from "../../api/util"
import { Bolt } from "@mui/icons-material";
import "trix/dist/trix.css";
import "trix";

const CategorieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, getValues, setValue } = useForm();

  const [image, setImage] = useState(null);

  const { apiData, isLoading, serverError } = useFetch(categorieDetails, id);

  useEffect(() => {
    if (apiData) {
      setValue("id", apiData?.id);
      setValue("name", apiData?.data?.name);
      setValue("featured", apiData?.data?.featured);
      setImage(apiData?.data?.image);
    }
  }, [apiData]);

  const { makeRequest, data, isSubmitLoading, submitError } = useSubmit(
    id !== undefined ? categorieUpdate : categorieCreate
  );

  const setCategorie = async () => {
    const obj = new FormData();
    if (id !== undefined) {
      obj.append("id", id);
    }
    obj.append("name", getValues().name);
    obj.append("featured", getValues().featured);
    // obj.append("image", image);
    if (image && typeof image !== "string") {
    obj.append("image", image);
  }
    await makeRequest(obj);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (serverError === SESSION_TIMEOUT || submitError === SESSION_TIMEOUT) {
      dispatch({ type: "RESET" });
      localStorage.removeItem("Token");
      showSnackbar(SESSION_EXPIRED, "error");
      return navigate(RoutesList.login);
    }
  }, [serverError, submitError]);

  useEffect(() => {
    if (data?.status === ok) {
      showSnackbar("Categories created successfully!", SUCCESS);
      return navigate(RoutesList.categories);
    } else if (data?.status === errorType) {
      showSnackbar(SOMETHING_WENT_WRONG, errorType);
    }
  }, [data]);

  const fileFieldLabel = (fieldName, fieldColObj) => {
    return typeof fieldColObj == "string" ? (
      fieldColObj?.startsWith("https") ? (
        <label className="col-form-label" htmlFor="title">
          {fieldName} (Current: <a href={fieldColObj}>Download</a>)
        </label>
      ) : (
        <label className="col-form-label" htmlFor="title">
          {fieldName} (Current: NA)
        </label>
      )
    ) : (
      <label className="col-form-label" htmlFor="title">
        {fieldName} (Current: NA)
      </label>
    );
  };

  const isDisabled = watch().location === apiData?.data?.name;

  if (isLoading || isSubmitLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <>
        {/* Page Heading */}
        <h1 className="h3 mb-4 text-gray-800">
          {id !== undefined ? "Edit" : "New"} Categories
        </h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(setCategorie)}>
              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Name
                      </label>

                      <input
                        {...register("name", { required: true })}
                        type="text"
                         placeholder="Enter name"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <label className="col-form-label" htmlFor="title">
                      Featured
                    </label>

                    <select
                      {...register("featured", {})}
                      className="form-control bg-light border-2 small"
                    >
                      {BOOLEAN_OPTIONS?.map((d) => {
                        return <option value={d?.value}>{d?.label}</option>;
                      })}
                    </select>
                    <br />
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="image">
                        <strong>Image: </strong>
                      </label>
                      <br />
                      {id !== undefined && image && typeof image === "string" && (
                        <div>
                          <img
                            src={getImageUrl(image)}
                            alt="Current image"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "200px",
                              objectFit: "cover",
                              marginBottom: "10px",
                            }}
                          />
                          <br />
                        </div>
                      )}
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        className="form-control bg-light border-2 small"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};
export default CategorieForm;
