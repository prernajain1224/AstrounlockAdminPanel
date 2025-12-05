import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";

import {
  productDetails,
  productCreate,
  productUpdate,
} from "../../api/product";

import { categorieList } from "../../api/categories";

import {
  ok,
  showSnackbar,
  SOMETHING_WENT_WRONG,
} from "../../../utils";

import RoutesList from "../../constants/RoutesList";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();
  const [banner, setBanner] = useState(null);

  // NEW: Categories
  const [categories, setCategories] = useState([]);

  const { apiData, isLoading } = useFetch(productDetails, id);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      const res = await categorieList();
      if (res?.status === "ok") {
        setCategories(res.data);
      }
    }
    loadCategories();
  }, []);

  // Load existing product values
  useEffect(() => {
    if (apiData?.data) {
      setValue("product_name", apiData.data.product_name);
      setValue("tagline", apiData.data.tagline);
      setValue("description", apiData.data.description);
      setValue("stock_available", apiData.data.stock_available);
      setValue("price", apiData.data.price);
      setValue("category", apiData.data.category);

      setBanner(apiData.data.banner);
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
    obj.append("stock_available", formData.stock_available);
    obj.append("price", formData.price);
    obj.append("category", formData.category);

    obj.append("product_type", "Item"); // FIXED for item product

    if (banner && typeof banner !== "string") obj.append("banner", banner);

    await makeRequest(obj);
  };

  // Redirect after save
  useEffect(() => {
    if (data?.status === ok) {
      showSnackbar("Product saved successfully!", "success");
      navigate(RoutesList.product);
    } else if (submitError) {
      showSnackbar(SOMETHING_WENT_WRONG, "error");
    }
  }, [data, submitError]);

  if (isLoading || isSubmitLoading) return <p>Loading...</p>;

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">
        {id ? "Edit Product" : "Add Product"}
      </h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

              <div className="col-sm-12">
                <label>Product Name</label>
                <input
                  {...register("product_name", { required: true })}
                  className="form-control"
                  placeholder="Enter Product Name"
                />
              </div>

              <div className="col-sm-12">
                <label>Tagline</label>
                <input
                  {...register("tagline")}
                  className="form-control"
                  placeholder="Enter Tagline"
                />
              </div>

              <div className="col-sm-12">
                <label>Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="form-control"
                  placeholder="Enter Description"
                ></textarea>
              </div>

              <div className="col-sm-12">
                <label>Stock</label>
                <input
                  {...register("stock_available", { required: true })}
                  type="number"
                  min={0}
                  className="form-control"
                />
              </div>

              <div className="col-sm-12">
                <label>Price</label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="form-control"
                />
              </div>

              {/* DYNAMIC CATEGORY DROPDOWN */}
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

              <div className="col-sm-12">
                <label>Banner</label>
                {id && typeof banner === "string" && (
                  <img src={banner} width={120} alt="banner" />
                )}
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
              </div>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              Save Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProductForm;
