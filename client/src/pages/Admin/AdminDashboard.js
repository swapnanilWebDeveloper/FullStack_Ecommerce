import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <div className="card w-75 p-3">
              <h4>
                Admin Name : {(auth ? auth.user : null) ? auth.user.name : null}
              </h4>
              <h4>
                Admin Email :{" "}
                {(auth ? auth.user : null) ? auth.user.email : null}
              </h4>
              <h4>
                Admin Contact :{" "}
                {(auth ? auth.user : null) ? auth.user.phone : null}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
