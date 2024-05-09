import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>
                Name is :{(auth ? auth.user : null) ? auth.user.name : null}
              </h3>
              <h3>
                Email is :{(auth ? auth.user : null) ? auth.user.email : null}
              </h3>
              <h3>
                Address is :
                {(auth ? auth.user : null) ? auth.user.address : null}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
