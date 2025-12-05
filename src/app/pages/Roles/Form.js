import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { roleDetails, roleUpdate, roleCreate } from "../../api/roles";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom/dist";
import Loading from "../../components/Loading/Loading";
import {
  BOOLEAN_OPTIONS,
  SESSION_EXPIRED,
  SESSION_TIMEOUT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  errorType,
  ok,
  showSnackbar,
} from "../../../utils";
import { useForm } from "react-hook-form";
import useSubmit from "../../hooks/useSubmit";
import RoutesList from "../../constants/RoutesList";
import { useAppDispatch } from "../../store";

const RoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, getValues, setValue } = useForm();
  const [permissions, setPermissions] = useState({
    Administrator: {
      checker: false,
      maker: false,
      read_only: false,
    },
    User: {
      checker: false,
      maker: false,
      read_only: false,
    },
    Astrologer: {
      checker: false,
      maker: false,
      read_only: false,
    },
    Role: {
      checker: false,
      maker: false,
      read_only: false,
    }
  });

  const { apiData, isLoading, serverError } = useFetch(roleDetails, id);
  useEffect(() => {
    if (apiData) {
      setValue("id", apiData?.id);
      setValue("name", apiData?.data?.role_name);
      setPermissions(
        Object.keys(apiData?.data?.permissions || {}).length > 0
          ? apiData?.data?.permissions
          : {
              Administrator: {
                checker: false,
                maker: false,
                read_only: false,
              },
              User: {
                checker: false,
                maker: false,
                read_only: false,
              },
              Astrologer: {
                checker: false,
                maker: false,
                read_only: false,
              },
              Role: {
                checker: false,
                maker: false,
                read_only: false,
              }
            }
      );
    }
  }, [apiData]);

  let handlePermissionsFieldChange = (k, e) => {
    let newFormValues = { ...permissions };
    newFormValues[k][e.target.name] = e.target.value;
    setPermissions(newFormValues);
  };

  const { makeRequest, data, isSubmitLoading, submitError } = useSubmit(
    id?.length > 0 ? roleUpdate : roleCreate
  );

  const setRole = async () => {
    const obj = id != null ? { id: id } : {};
    obj.role_name = getValues().name;
    obj.permissions = permissions;
    console.log(obj);
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
      showSnackbar("Role saved successfully", SUCCESS);
      return navigate(RoutesList.roles);
    } else if (data?.status === errorType) {
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
          {id?.length > 0 ? "Edit" : "New"} Role
        </h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(setRole)}>
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
                  {Object.entries(permissions || {})?.map((field, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="col-sm-3"
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                          <label className="col-form-label" htmlFor="title">
                            Permission
                          </label>
                          <p>
                            <strong>{field[0]}</strong>
                          </p>
                        </div>

                        <div
                          key={index}
                          className="col-sm-3"
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                          <label className="col-form-label" htmlFor="title">
                            Checker
                          </label>

                          <select
                            name={"checker"}
                            value={field[1].checker}
                            className="form-control"
                            onChange={(e) =>
                              handlePermissionsFieldChange(field[0], e)
                            }
                          >
                            {BOOLEAN_OPTIONS?.map((d) => {
                              return (
                                <option value={d?.value}>{d?.label}</option>
                              );
                            })}
                          </select>
                        </div>

                        <div
                          key={index}
                          className="col-sm-3"
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                          <label className="col-form-label" htmlFor="title">
                            Maker
                          </label>

                          <select
                            name={`maker`}
                            value={field[1].maker}
                            className="form-control"
                            onChange={(e) =>
                              handlePermissionsFieldChange(field[0], e)
                            }
                          >
                            {BOOLEAN_OPTIONS?.map((d) => {
                              return (
                                <option value={d?.value}>{d?.label}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div
                          key={index}
                          className="col-sm-3"
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                          <label className="col-form-label" htmlFor="title">
                            Read Only
                          </label>

                          <select
                            name={`read_only`}
                            value={field[1].read_only}
                            className="form-control"
                            onChange={(e) =>
                              handlePermissionsFieldChange(field[0], e)
                            }
                          >
                            {BOOLEAN_OPTIONS?.map((d) => {
                              return (
                                <option value={d?.value}>{d?.label}</option>
                              );
                            })}
                          </select>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-12">
                    <button
                      disabled={isDisabled}
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
export default RoleForm;
