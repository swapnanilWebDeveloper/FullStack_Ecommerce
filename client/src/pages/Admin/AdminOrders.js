import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);

  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title={"All orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All orders</h1>
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(order._id, value)}
                            defaultValue={order.status}
                          >
                            {status.map((stat, ind) => (
                              <Option key={ind} value={stat}>
                                {stat}
                              </Option>
                            ))}
                          </Select>
                        </td>
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
    </Layout>
  );
};

export default AdminOrders;
