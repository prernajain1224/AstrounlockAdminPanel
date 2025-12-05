import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";

import {
  productDetails,
  productCreate,
  productUpdate
} from "../../api/product";

import {
  ok,
  showSnackbar,
  SOMETHING_WENT_WRONG,
} from "../../../utils";
import { categorieList } from "../../api/categories";

import RoutesList from "../../constants/RoutesList";

const SessionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();
  const [banner, setBanner] = useState(null);
  const [sectionVideo, setSectionVideo] = useState(null);
    const [categories, setCategories] = useState([]);
  

  const { apiData, isLoading } = useFetch(productDetails, id);

    useEffect(() => {
      async function loadCategories() {
        const res = await categorieList();
        if (res?.status === "ok") {
          setCategories(res.data);
        }
      }
      loadCategories();
    }, []);
  // Load existing session data
  useEffect(() => {
    if (apiData?.data) {
      setValue("product_name", apiData.data.product_name);
      setValue("tagline", apiData.data.tagline);
      setValue("description", apiData.data.description);
      setValue("base_price", apiData.data.base_price);
      setValue("category", apiData.data.category);
      setValue("session_type", apiData.data.session_type);

      setBanner(apiData.data.banner);
      setSectionVideo(apiData.data.section_video);
    }
  }, [apiData]);

  const { makeRequest, data, isSubmitLoading, submitError } = useSubmit(
    id ? productUpdate : productCreate
  );

  const onSubmit = async (formData) => {
    const obj = new FormData();

    if (id) obj.append("id", id);

    obj.append("product_name", formData.product_name);
    obj.append("tagline", formData.tagline);
    obj.append("description", formData.description);
    obj.append("base_price", formData.base_price);
    obj.append("category", formData.category);

    obj.append("product_type", "Session"); // FIXED
    obj.append("session_type", formData.session_type);

    if (banner && typeof banner !== "string") obj.append("banner", banner);
    if (sectionVideo && typeof sectionVideo !== "string")
      obj.append("section_video", sectionVideo);

    await makeRequest(obj);
  };

  // Redirect on save
  useEffect(() => {
    if (data?.status === ok) {
      showSnackbar("Session saved successfully!", "success");
      navigate(RoutesList.session); // Redirect to session list
    } else if (submitError) {
      showSnackbar(SOMETHING_WENT_WRONG, "error");
    }
  }, [data, submitError]);

  if (isLoading || isSubmitLoading) return <p>Loading...</p>;

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">
        {id ? "Edit Session" : "Add Session"}
      </h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

              {/* Session Name */}
              <div className="col-sm-12">
                <label>Session Name</label>
                <input
                  {...register("product_name", { required: true })}
                  className="form-control"
                  placeholder="Enter Session Name"
                />
              </div>

              {/* Tagline */}
              <div className="col-sm-12">
                <label>Tagline</label>
                <input
                  {...register("tagline")}
                  className="form-control"
                  placeholder="Enter tagline"
                />
              </div>

              {/* Description */}
              <div className="col-sm-12">
                <label>Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="form-control"
                  rows={4}
                ></textarea>
              </div>

              {/* Price */}
              <div className="col-sm-12">
                <label>Base Price</label>
                <input
                  {...register("base_price", { required: true })}
                  type="number"
                  step="0.01"
                  className="form-control"
                />
              </div>

              {/* Category */}
              <div className="col-sm-12">
                <label>Category</label>
                <select {...register("category")} className="form-control">
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Type */}
              <div className="col-sm-12">
                <label>Session Type</label>
                <select {...register("session_type")} className="form-control">
                  <option value="Palmistry">Palmistry</option>
                  <option value="Tarrot">Tarrot</option>
                </select>
              </div>

              {/* Banner */}
              <div className="col-sm-12">
                <label>Banner</label>
                {id && typeof banner === "string" && (
                  <img width="120" src={banner} alt="banner" className="mb-3" />
                )}
                <input type="file" className="form-control" onChange={(e) => setBanner(e.target.files[0])} />
              </div>

              {/* Session Video */}
              <div className="col-sm-12">
                <label>Session Video</label>
                {id && typeof sectionVideo === "string" && (
                  <video width="200" controls src={sectionVideo}></video>
                )}
                <input type="file" className="form-control" onChange={(e) => setSectionVideo(e.target.files[0])} />
              </div>

            </div>

            <button className="btn btn-primary mt-3" type="submit">
              Save Session
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SessionForm;
