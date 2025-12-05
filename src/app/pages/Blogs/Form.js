import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Layout from "../Layout";
import { adminUsersList } from "../../api/adminUsers";
import Loading from "../../components/Loading/Loading";
import {
  SESSION_EXPIRED,
  SESSION_TIMEOUT,
  SOMETHING_WENT_WRONG,
  errorType,
  ok,
  showSnackbar,
  formatDateTime,
  SUCCESS
} from "../../../utils";
import { useForm } from "react-hook-form";
import useSubmit from "../../hooks/useSubmit";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch } from "../../store";
import {
  blogsCreate,
  blogsDetails,
  blogsUpdate,
} from "../../api/blogs";
import { getImageUrl } from "../../api/util"
import { Bolt, Height } from "@mui/icons-material";
import "trix/dist/trix.css";
import "trix";
import { Button } from "@mui/material";

const TrixEditor = ({ value, onChange }) => {
  const trixInput = useRef(null);
  const trixEditor = useRef(null);

  useEffect(() => {
    const editorElement = trixEditor.current;

    const handleChange = () => {
      if (editorElement) {
        onChange(editorElement.innerHTML);
      }
    };

    document.addEventListener("trix-change", handleChange);

    return () => {
      document.removeEventListener("trix-change", handleChange);
    };
  }, [onChange]);

  useEffect(() => {
    if (trixEditor.current && value) {
      // Use timeout to allow Trix to initialize
      setTimeout(() => {
        trixEditor.current.editor.loadHTML(value);
      }, 0);
    }
  }, [value]);

  return (
    <div className="trix-wrapper">
      <input id="trix-input" type="hidden" ref={trixInput} />
      <trix-editor input="trix-input" className="form-control trix-content" style={{ minHeight: "300px" }} ref={trixEditor}></trix-editor>
    </div>
  );
};





const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const { register, handleSubmit, watch, getValues, setValue } = useForm();

  const [banner_image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const { apiData, isLoading, serverError } = useFetch(blogsDetails, id);



  const { apiData: user, isLoading: isGetUserLoading, serverError: getUsersLoadingError } = useFetch(() =>
    adminUsersList({ user_type: "Astrologer" }), []
  );

  useEffect(() => {
    if (apiData) {
      setValue("id", apiData?.id);
      setValue("title", apiData?.data?.title);
      setDescription(apiData?.data?.description || "");
      // setValue("description", apiData?.data?.description || "");

      setValue("post_by", apiData?.data?.post_by);
      setImage(apiData?.data?.banner_image);

    }
  }, [apiData]);



  const { makeRequest, data, isSubmitLoading, submitError } = useSubmit(
    id !== undefined ? blogsUpdate : blogsCreate
  );

  const setBlogs = async () => {
    const obj = new FormData();
    if (id !== undefined) {
      obj.append("id", id);
    }
    obj.append("title", getValues().title);
    // obj.append("description", getValues().description);
    obj.append("description", description);
    obj.append("post_by", getValues().post_by);
    if (banner_image && typeof banner_image !== "string") {
      obj.append("banner_image", banner_image);
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
      showSnackbar("Blogs created successfully!", SUCCESS);
      return navigate(RoutesList.blogs);
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

  const isDisabled = watch().location === apiData?.data?.location;

  if ((isLoading && isGetUserLoading) || isSubmitLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <>
        {/* Page Heading */}
        <h1 className="h3 mb-4 text-gray-800">
          {id !== undefined ? "Edit" : "New"} Blogs
        </h1>

        {id && (
          <Link
            to={`/blogs/${id}/view`}
            className="btn btn-primary mb-3"
          >
            ← Back to Blog
          </Link>
        )}
        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(setBlogs)}>
              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Title
                      </label>

                      <input
                        {...register("title", { required: true })}
                         placeholder="Enter Title"
                        type="text"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                    </div>
                  </div>
                  {/* <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Description
                      </label>

                      <textarea
                        {...register("description", { required: true })}
                        type="text"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      >
                       {getValues().description}
                    </textarea>
                      
                    </div>
                  </div> */}

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="description">
                        Content
                      </label>

                      {/* Replace textarea with Trix editor */}
                      <TrixEditor

                        value={description}
                        onChange={(html) => setDescription(html)}
                      />
                    </div>
                  </div>



                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Author
                      </label>

                      <select
                        {...register("post_by", { required: true })}
                        className="form-control bg-light border-2 small"
                        disabled={isGetUserLoading}
                        defaultValue={apiData?.data?.post_by || ""}
                      >
                        <option value="">Select User</option>
                        {user?.data?.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="banner_image">
                        <strong>Banner Image: </strong>
                      </label>
                      <br />
                      {id !== undefined && banner_image && typeof banner_image === "string" && (
                        <div>
                          <img
                            src={getImageUrl(banner_image)}
                            alt="Current Banner"
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
export default BlogForm;
