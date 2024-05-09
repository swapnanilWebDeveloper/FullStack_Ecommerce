import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      if (data) {
        console.log(data);
        setOrders(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth) {
      if (auth.token) {
        getOrders();
      }
    }
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">All Orders</h3>
            {orders
              ? orders.map((order, index) => (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Orders</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order.status}</td>
                          <td>{order.buyer.name}</td>
                          <td>{moment(order.createdAt).fromNow()}</td>
                          {order.payment ? (
                            <td>
                              {order.payment.success ? "Success" : "Failed"}
                            </td>
                          ) : null}
                          <td></td>
                          <td>{order.products.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {order.products.map((prd) => (
                        <div className="row mb-4 p-3 card flex-row">
                          <div className="col-md-4">
                            <img
                              src={`/api/v1/product/product-photo/${prd._id}`}
                              className="card-img-top"
                              alt={prd.name}
                              style={{
                                width: "8rem",
                                height: "10rem",
                                marginTop: "14px",
                                marginBottom: "14px",
                              }}
                            />
                          </div>
                          <div className="col-md-8 mt-4">
                            <p>{prd.name}</p>
                            <p>{prd.description}....</p>
                            <p>price : $ {prd.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
