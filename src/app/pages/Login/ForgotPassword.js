import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Loading from '../../components/Loading/Loading';
import { forgotPassword, resetPassword } from '../../api/auth';
import { showSnackbar } from '../../../utils';
import styles from './styles';
import RoutesList from '../../constants/RoutesList';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('email'); // 'email' | 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    if (!email) return showSnackbar('Please enter your email', 'error');
    setLoading(true);
    const res = await forgotPassword({ email });
    setLoading(false);
    if (res?.status === 'ok') {
      showSnackbar('OTP sent to your email', 'success');
      setStep('reset');
    } else {
      showSnackbar(res?.error || 'Something went wrong', 'error');
    }
  };

  const submitReset = async () => {
    if (!otp || !newPassword) return showSnackbar('Please fill all fields', 'error');
    setLoading(true);
    const res = await resetPassword({ email, otp, new_password: newPassword });
    setLoading(false);
    if (res?.status === 'ok') {
      showSnackbar('Password reset successfully', 'success');
      navigate(RoutesList.login);
    } else {
      showSnackbar(res?.error || 'Something went wrong', 'error');
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-gradient-primary" style={styles.loginPage}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-password-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        <p className="mb-4">
                          {step === 'email'
                            ? "We get it, stuff happens. Enter your email and we'll send an OTP!"
                            : 'Enter the OTP and your new password'}
                        </p>
                      </div>
                      <form
                        className="user"
                        onSubmit={(e) => {
                          e.preventDefault();
                          step === 'email' ? requestOtp() : submitReset();
                        }}
                      >
                        <div className="form-group">
                          <InputField
                            fieldName={'Email'}
                            field={email}
                            setField={setEmail}
                            error=""
                            helperText=""
                            placeholder={'Enter E-Mail Address...'}
                            type="email"
                          />
                        </div>

                        {step === 'reset' && (
                          <>
                            <div className="form-group">
                              <InputField
                                fieldName={'OTP'}
                                field={otp}
                                setField={setOtp}
                                error=""
                                helperText=""
                                placeholder={'Enter OTP...'}
                                type="text"
                              />
                            </div>
                            {/* <div className="form-group">
                              <InputField
                                fieldName={'New Password'}
                                field={newPassword}
                                setField={setNewPassword}
                                error=""
                                helperText=""
                                placeholder={'Enter New Password...'}
                                type="password"
                              />
                            </div> */}
                                <div className="form-group" style={{ position: "relative" }}>
                                                      <InputField
                                                        fieldName={"New Password"}
                                                        field={newPassword}
                                                        setField={setNewPassword}
                                                        error=""
                                                        helperText={""}
                                                        placeholder={"Enter New Password..."}
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
                          </>
                        )}

                        <SubmitButton
                          btnClass={'btn btn-primary btn-user btn-block'}
                          btnText={step === 'email' ? 'Send OTP' : 'Reset Password'}
                        />
                      </form>

                      <hr />
                      <div className="text-center">
                        <a className="small" href={RoutesList.login}>
                          Already have an account? Login!
                        </a>
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

export default ForgotPassword;
