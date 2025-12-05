import React from "react";
import { useAppDispatch } from "../../store";
import useFetch from "../../hooks/useFetch";
import { userProfile } from "../../api/users";
import { setUser } from "../../store/user";
import Layout from "../Layout";
function Home() {
  const { apiData, isLoading, error } = useFetch(userProfile);
  const dispatch = useAppDispatch();

  if (!isLoading) {
    dispatch(setUser(apiData));
  }

  return (
    <Layout>
      <>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Home Dashboard</h1>
        </div>
      </>
    </Layout>
  );
}

export default Home;
