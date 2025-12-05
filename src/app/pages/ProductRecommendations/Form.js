import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { productList } from "../../api/product";
import { adminUsersList } from "../../api/adminUsers";
import {
  productrecommendationDetails,
  productrecommendationUpdate ,
  productrecommendationCreate
} from "../../api/product_recommendations";
import { showSnackbar, SUCCESS, SOMETHING_WENT_WRONG } from "../../../utils";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [astrologers, setAstrologers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch users, astrologers, products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [astroRes, userRes, prodRes] = await Promise.all([
          adminUsersList({ user_type: "Astrologer" }),
          adminUsersList({ user_type: "User" }),
          productList()
        ]);
        setAstrologers(astroRes.data || []);
        setUsers(userRes.data || []);
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error(err);
        showSnackbar(SOMETHING_WENT_WRONG, "error");
      }
    };
    fetchData();
  }, []);

  // Prefill form if editing
  useEffect(() => {
    if (id) {
      const fetchRecommendation = async () => {
        try {
          const res = await productrecommendationDetails(id);
          setValue("created_by", res.data.created_by);
          setValue("recommended_to", res.data.recommended_to);
          setValue("product", res.data.product);
          setValue("created_at", res.data.created_at);
          setValue("updated_at", res.data.updated_at);
        } catch (err) {
          console.error(err);
          showSnackbar(SOMETHING_WENT_WRONG, "error");
        }
      };
      fetchRecommendation();
    }
  }, [id, setValue]);

 const onSubmit = async (data) => {
  setLoading(true);
  try {
    const payload = {
      created_by: data.created_by,
      recommended_to: data.recommended_to,
      product: data.product
    };

    if (id) {
      await productrecommendationUpdate({ id, ...payload }); // PUT to /recommendations/:id/
      showSnackbar("Recommendation updated successfully!", SUCCESS);
    } else {
      await productrecommendationCreate(payload); // POST to /recommendations
      showSnackbar("Recommendation created successfully!", SUCCESS);
    }

    navigate("/recommendation"); // correct route
  } catch (err) {
    console.error("Update API error:", err.response || err);
    showSnackbar(SOMETHING_WENT_WRONG, "error");
  } finally {
    setLoading(false);
  }
};



  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-body">
          <h4>{id ? "Edit Recommendation" : "New Recommendation"}</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Created By */}
            <div className="form-group">
              <label>Created By (Astrologer)</label>
              <select {...register("created_by", { required: true })} className="form-control">
                <option value="">Select Astrologer</option>
                {astrologers.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.email})</option>
                ))}
              </select>
              {errors.created_by && <small className="text-danger">Required</small>}
            </div>

            {/* Recommended To */}
            <div className="form-group">
              <label>Recommended To (User)</label>
              <select {...register("recommended_to", { required: true })} className="form-control">
                <option value="">Select User</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
              {errors.recommended_to && <small className="text-danger">Required</small>}
            </div>

            {/* Product */}
            <div className="form-group">
              <label>Product / Session</label>
              <select {...register("product", { required: true })} className="form-control">
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.product_name}</option>
                ))}
              </select>
              {errors.product && <small className="text-danger">Required</small>}
            </div>

           

            <div className="form-group mt-3">
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
