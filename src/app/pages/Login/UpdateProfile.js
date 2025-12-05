import React, { useEffect, useState } from 'react';

import Layout from '../Layout';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUser } from '../../store/user/selectors';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom/dist";
import {
  SESSION_EXPIRED,
  SESSION_TIMEOUT,
  SOMETHING_WENT_WRONG,
  errorType,
  ok,
  showSnackbar,
  SUCCESS,
  STATUS_OPTIONS
} from '../../../utils';
import Loading from '../../components/Loading/Loading';
import RoutesList from '../../constants/RoutesList';
import { EditProfile } from '../../api/adminUsers';
import useSubmit from '../../hooks/useSubmit';
import { setUser } from '../../store/user';
import { getImageUrl } from "../../api/util"

const UserProfileUpdate = () => {
  const { id } = useParams();
  const currentUser = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [image, setImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);


  const { register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue('name', currentUser?.name);
    setValue('email', currentUser?.email);
    setValue('password', currentUser?.password);

    setImage(currentUser.avatar);

  }, [currentUser]);

  const { makeRequest, data, isSubmitLoading, submitError } =
    useSubmit(EditProfile);

  const { name, password } = watch();

  // const updateUser = async () => {
  //   if (password.length >= 6) {
  //     await makeRequest({
  //       id: currentUser?.id,
  //       name: getValues().name,
  //       email: getValues().email,
  //       // password: getValues().password,
  //     });
  //   } else {
  //     await makeRequest({
  //       id: currentUser?.id,
  //       name: getValues().name,
  //       email: getValues().email,
  //     });
  //   }
  // };

  const updateUser = async () => {
    const values = getValues();

    const formData = new FormData();
    // formData.append('id', currentUser?.id);
    formData.append('name', values.name);
    formData.append('email', values.email);

    // Append password only if provided
    if (values.password && values.password.length >= 6) {
      formData.append('password', values.password);
    }

    // Append image if selected
    if (image && typeof image !== 'string') {
      formData.append('avatar', image);  // key must match the backend field name
    }

    await makeRequest({ id: currentUser?.id, data: formData });

    // use formData instead of a plain object
  };


  useEffect(() => {
    if (data?.status === ok) {
      dispatch(
        setUser({
          id: currentUser?.id,
          name: getValues().name,
          email: getValues().email,
          password: getValues().password,
          avatar: getValues().avatar,
        })
      );
      showSnackbar('User profile is successfully updated', SUCCESS);
      return navigate(RoutesList.userProfile);
    } else if (data?.status === errorType) {
      showSnackbar(SOMETHING_WENT_WRONG, errorType);
    }
  }, [data]);

  if (isSubmitLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <>
        {/* Page Heading */}
        <h1 className="h3 mb-4 text-gray-800">Edit Details</h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(updateUser)}>
              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        className="form-control bg-light border-2 small"
                        id="name"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label
                        className="col-form-label"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        {...register('email')}
                        type="text"
                        className="form-control bg-light border-2 small"
                        id="email"
                        placeholder="Enter Email"
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

               <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="password">
                        Password (Leave blank to keep current password)
                      </label>
                      <div className="input-group">
                        <input
                          {...register("password", {
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
                          placeholder="Enter New Password"
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
                </div>
              </div>

           


              <div className="form-group justify-content-md-center">
                <div className="justify-content-md-center row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="image">
                        <strong>Avatar: </strong>
                      </label>
                      <br />
                      {image && (
                        <div>
                          <img
                            src={typeof image === 'string' ? getImageUrl(image) : URL.createObjectURL(image)}
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
                  <div className="col-sm-10">
                    <button
                      // disabled={!name || password.length <= 6}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update
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
export default UserProfileUpdate;
