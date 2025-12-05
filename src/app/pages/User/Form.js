import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
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
  STATUS_OPTIONS,
  SUCCESS
} from "../../../utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getImageUrl } from "../../api/util"
import { useForm } from "react-hook-form";
import useSubmit from "../../hooks/useSubmit";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch } from "../../store";


const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, getValues, setValue } = useForm();
  const [image, setImage] = useState(null);
  const { apiData, isLoading, serverError } = useFetch(adminUserDetails, id);



  useEffect(() => {
    if (apiData) {
      setValue("id", apiData?.id);
      setValue("name", apiData?.data?.name);
      setValue("email", apiData?.data?.email);
      // setValue("password", apiData?.data?.password);
      setValue("phone_number", apiData?.data?.phone_number);
      setValue("user_type", apiData?.data?.user_type);
      setValue("dob", apiData?.data?.dob);
      setValue("time_of_birth", apiData?.data?.time_of_birth);
      setValue("place_of_birth", apiData?.data?.place_of_birth);
      setValue("about", apiData?.data?.about);
      setValue("display_name", apiData?.data?.display_name);
      setImage(apiData?.data?.avatar);


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
    obj.append("user_type", "User");
    obj.append("dob", getValues().dob);
    obj.append("time_of_birth", getValues().time_of_birth);
    obj.append("place_of_birth", getValues().place_of_birth);
    obj.append("about", getValues().about);
    obj.append("display_name", getValues().display_name);
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
      showSnackbar('User created successfully', SUCCESS);
      return navigate(RoutesList.user);
    } else if (data?.status === errorType) {
      console.log(errorType)
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

  const isDisabled = watch().name === apiData?.data?.name;

  if (isLoading || isSubmitLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <>
        {/* Page Heading */}
        <h1 className="h3 mb-4 text-gray-800">
          {id !== undefined ? "Edit" : "New"} User
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
                        {...register("name", { required: true })}
                        type="text"
                         placeholder="Enter Name"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                    </div>
                  </div>

                    <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Real Name
                      </label>

                      <input
                        {...register("display_name", { required: true })}
                        type="text"
                        placeholder="Enter Real Name"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Email
                      </label>

                      <input
                        {...register("email", { required: true })}
                        type="text"
                         placeholder="Enter Email"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
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
                              required: true,
                              minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                              },
                              // pattern: {
                              //   value: /^[a-zA-Z0-9]+$/,
                              //   message: "Password must be alphanumeric (letters and numbers only)",
                              // },
                            })}
                            type={showPassword ? "text" : "password"}
                             placeholder="Enter Password"
                            className="form-control bg-light border-2 small"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') e.preventDefault();
                            }}
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
                      <label className="col-form-label" htmlFor="occassion">
                        Date Of Birth
                      </label>

                      <input
                        {...register("dob", {})}
                        type="date"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Time of Birth
                      </label>

                      <input
                        {...register("time_of_birth", { required: true })}
                        type="time"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        Place of Birth
                      </label>

                      <input
                        {...register("place_of_birth", { required: true })}
                        type="text"
                         placeholder="Enter Place of birth"
                        className="form-control bg-light border-2 small"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="occassion">
                        About
                      </label>
                      <textarea
                        {...register("about", { required: true })}
                         placeholder="Enter About"
                        className="form-control bg-light border-2 small"
                        rows={4}
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                      //   disabled={isDisabled}
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
export default UserForm;
