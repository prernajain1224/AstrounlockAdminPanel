import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  adminUserDetails,
  adminUserUpdate,
  adminUserCreate,
} from "../../api/adminUsers";
import { useAppSelector } from "../../store";
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
  SUCCESS,
  STATUS_OPTIONS
} from "../../../utils";

import { useForm } from "react-hook-form";
import useSubmit from "../../hooks/useSubmit";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch } from "../../store";
import { getImageUrl } from "../../api/util"


const AdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm();


  const { apiData, isLoading, serverError } = useFetch(adminUserDetails, id);



  useEffect(() => {
    if (apiData) {
      setValue("id", apiData?.id);
      setValue("name", apiData?.data?.name);
      setValue("email", apiData?.data?.email);
      setValue("password", apiData?.data?.password);
      setValue("phone_number", apiData?.data?.phone_number);
      setValue("user_type", apiData?.data?.user_type);
      setImage(apiData?.data?.avatar);
      //   setValue("image", apiData?.data?.images?.images);
    }
  }, [apiData]);

  const { makeRequest, data, isSubmitLoading, submitError } = useSubmit(
    id !== undefined ? adminUserUpdate : adminUserCreate
  );

  const setAdmin = async () => {

    const obj = new FormData();

    if (id !== undefined) {
      obj.append("id", id);
    }
    obj.append("name", getValues().name);
    obj.append("email", getValues().email);
    obj.append("password", getValues().password);
    obj.append("phone_number", getValues().phone_number);
    obj.append("user_type", "Administrator");
    if (image && typeof image !== "string") {
    obj.append("avatar", image);
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
      showSnackbar("Administrator created successfully!", SUCCESS);
      return navigate(RoutesList.admin);
    } else if (data?.status === errorType) {
      console.log(errorType)
      showSnackbar(SOMETHING_WENT_WRONG, errorType);
    }
  }, [data]);


  const isDisabled = watch().name === apiData?.data?.name;

  if (isLoading || isSubmitLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <>
        {/* Page Heading */}
        <h1 className="h3 mb-4 text-gray-800">
          {id !== undefined ? "Edit" : "New"} Admin
        </h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(setAdmin)}>
              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Name
                      </label>

                      <input
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                          }
                        })}
                        type="text"
                        placeholder="Enter Name"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      {errors.name && <small className="text-danger">{errors.name.message}</small>}
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Email
                      </label>

                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email format"
                          }
                        })}
                        type="text"
                        placeholder="Enter Email"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      {errors.email && <small className="text-danger">{errors.email.message}</small>}

                    </div>
                  </div>
                  {id === undefined &&
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label className="col-form-label" htmlFor="password">
                          Password
                        </label>

                        <div className="input-group">
                          <input
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                              },
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                message: "Password must contain at least one letter, one number, and one special character"
                              }
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className="form-control bg-light border-2 small"
                          />

                          <div className="input-group-append">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowPassword(!showPassword)}
                              tabIndex={-1}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        {errors.password && <small className="text-danger">{errors.password.message}</small>}
                      </div>
                    </div>

                  }


                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="phone_number">
                        Phone Number
                      </label>

                      <input
                        {...register("phone_number", {
                          required: true,
                          pattern: {
                            value: /^[0-9]{1,12}$/,
                            message: "Enter up to 12 digits only",
                          },
                        })}
                        type="text"
                        maxLength={12}
                        className="form-control bg-light border-2 small"
                         placeholder="Enter Phone Number"
                        onKeyPress={(e) => {
                          // Prevent non-numeric input
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                          // Prevent submitting on Enter
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>

                     <div className="col-sm-12">
                                      <div className="form-group">
                                        <label className="col-form-label" htmlFor="image">
                                          <strong>Avatar: </strong>
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
                      // disabled={isDisabled}
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => console.log("Button clicked")}
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
export default AdminForm;
