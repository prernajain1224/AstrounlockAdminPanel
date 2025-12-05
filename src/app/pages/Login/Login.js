import React, { useState, useEffect } from "react";

import useSubmit from "../../hooks/useSubmit";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Loading from "../../components/Loading/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../api/auth";
import { Link } from 'react-router-dom';

import {
  SOMETHING_WENT_WRONG,
  errorType,
  ok,
  showSnackbar,
} from "../../../utils";

import styles from "./styles";
import RoutesList from "../../constants/RoutesList";
import { logo } from "../../constants/Images";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/user";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { makeRequest, data, isSubmitLoading, submitError } = useSubmit(login);
  const dispatch = useAppDispatch();

  const loginUser = async () => {
    await makeRequest({ email, password });

    if (data?.status === "ok") {
      console.log(data,"setUser data hseresr")
      dispatch(setUser({id: data?.user_id,name: data?.name ,email:data?.email,phone_number:data?.phone_number,user_type:data?.user_type,avatar:data?.avatar,token:data?.token}));
      localStorage.setItem("Token", data?.token);
      // localStorage.setItem("Avatar", data?.avatar);
      return navigate(RoutesList.home);
    } else if (data?.status === errorType) {
      showSnackbar(SOMETHING_WENT_WRONG, errorType);
    }
  };

  useEffect(() => {
    if (data?.status === "ok") {
      // dispatch(setUser(data?.user));
      console.log(data,"data hrer")
      dispatch(setUser({
        id: data?.user_id,
        name: data?.name ,
        email:data?.email,
        phone_number:data?.phone_number,
        user_type:data?.user_type,
        avatar:data?.avatar,
        token:data?.token}));
      localStorage.setItem("Token", data?.token);
      // localStorage.setItem("Avatar", data?.avatar);
      return navigate(RoutesList.home);
    } else if (data?.status === errorType) {
      showSnackbar(data?.error ?? SOMETHING_WENT_WRONG, errorType);
    }
  }, [data]);

  useEffect(() => {
    if (!!localStorage.getItem("Token")) {
      navigate(RoutesList.home);
    }
  }, []);

  return isSubmitLoading ? (
    <Loading />
  ) : (
    <div className="bg-gradient-primary" style={styles.loginPage}>
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div
          className="row justify-content-center"
          style={{ alignSelf: "center" }}
        >
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div
                    className="col-lg-6 "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <img src={logo} style={{ height: 100 }} />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form
                        className="user"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (email.length > 0 && password.length > 0) {
                            loginUser();
                          } else {
                            // setShowErrorFields(true);
                          }
                        }}
                      >
                        <div className="form-group">
                          <InputField
                            fieldName={"Email"}
                            field={email}
                            setField={setEmail}
                            error=""
                            helperText={""}
                            placeholder={"Enter E-Mail Address..."}
                            type="email"
                          />
                        </div>
                        <div className="form-group" style={{ position: "relative" }}>
                          <InputField
                            fieldName={"Password"}
                            field={password}
                            setField={setPassword}
                            error=""
                            helperText={""}
                            placeholder={"Enter Password..."}
                            type={showPassword ? "text" : "password"}
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "70%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "#6c757d",
                            }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                        <SubmitButton
                          btnClass={"btn btn-primary btn-user btn-block"}
                          btnText={"Login"}
                        />
                        <hr />
                      </form>
                      <div className="text-center">
                      <Link to={RoutesList.forgotPassword} className="small">
                          Forgot Password?
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
