import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Loading from "../../components/Loading/Loading";

import { productList } from "../../api/product";
import { adminUsersList } from "../../api/adminUsers";
import {
  productrecommendationDetails,
  productrecommendationUpdate,
  productrecommendationCreate,
} from "../../api/product_recommendations";

import { showSnackbar, SUCCESS, SOMETHING_WENT_WRONG } from "../../../utils";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [astrologers, setAstrologers] = useState([]);
  const [products, setProducts] = useState([]);

  // ===============================
  // FETCH USERS / ASTROLOGERS / PRODUCTS
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [astroRes, userRes, prodRes] = await Promise.all([
          adminUsersList({ user_type: "Astrologer" }),
          adminUsersList({ user_type: "User" }),
          productList(),
        ]);

        setAstrologers(astroRes?.data || []);
        setUsers(userRes?.data || []);

        // ✅ ONLY ITEM PRODUCTS (NO SESSIONS)
        const itemProducts = (prodRes?.data || []).filter(
          (p) => p.product_type === "Item"
        );

        setProducts(itemProducts);
      } catch (err) {
        console.error(err);
        showSnackbar(SOMETHING_WENT_WRONG, "error");
      }
    };

    fetchData();
  }, []);

  // ===============================
  // PREFILL DATA (EDIT MODE)
  // ===============================
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const res = await productrecommendationDetails(id);
          const data = res?.data;

          setValue("created_by", data.created_by);
          setValue("recommended_to", data.recommended_to);
          setValue("product", data.product);
        } catch (err) {
          console.error(err);
          showSnackbar(SOMETHING_WENT_WRONG, "error");
        }
      };

      fetchDetails();
    }
  }, [id, setValue]);

  // ===============================
  // SUBMIT
  // ===============================
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        created_by: data.created_by,
        recommended_to: data.recommended_to,
        product: data.product,
      };

      if (id) {
        await productrecommendationUpdate({ id, ...payload });
        showSnackbar("Recommendation updated successfully!", SUCCESS);
      } else {
        await productrecommendationCreate(payload);
        showSnackbar("Recommendation created successfully!", SUCCESS);
      }

      navigate("/recommendation");
    } catch (err) {
      console.error(err);
      showSnackbar(SOMETHING_WENT_WRONG, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  // ===============================
  // UI
  // ===============================
  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-body">
          <h4 className="mb-3">
            {id ? "Edit Remedies" : "New Remedies"}
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* CREATED BY */}
            <div className="form-group">
              <label>Created By (Astrologer)</label>
              <select
                className="form-control"
                {...register("created_by", { required: true })}
              >
                <option value="">Select Astrologer</option>
                {astrologers.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.email})
                  </option>
                ))}
              </select>
              {errors.created_by && (
                <small className="text-danger">Required</small>
              )}
            </div>

            {/* RECOMMENDED TO */}
            <div className="form-group">
              <label>Recommended To (User)</label>
              <select
                className="form-control"
                {...register("recommended_to", { required: true })}
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
              {errors.recommended_to && (
                <small className="text-danger">Required</small>
              )}
            </div>

            {/* PRODUCT (ONLY ITEM) */}
            <div className="form-group">
              <label>Product (Item only)</label>
              <select
                className="form-control"
                {...register("product", { required: true })}
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.product_name}
                  </option>
                ))}
              </select>
              {errors.product && (
                <small className="text-danger">Required</small>
              )}
            </div>

            <div className="form-group mt-4">
              <button type="submit" className="btn btn-primary">
                {id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Form;
