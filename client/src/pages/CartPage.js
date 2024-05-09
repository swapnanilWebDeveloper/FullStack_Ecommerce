import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import CartStyle from "../styles/CartStyle.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      if (cart) {
        cart.map((item) => (total = total + item.price));
        return total.toLocaleString("en-us", {
          style: "currency",
          currency: "USD",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // delete item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  // get payemnt gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      if (data) {
        if (data.clientToken) {
          console.log(data);
          console.log(data.clientToken);
          setClientToken(data.clientToken);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      setTimeout(() => {
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed successfully..");
      }, 1500);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-ligh p-2">
              {`Hello ${
                ((auth ? auth.token : null) ? auth.user : null)
                  ? auth.user.name
                  : ""
              }`}
            </h1>
            <h4 className="text-center">
              {(cart ? cart.length : null)
                ? `You have ${cart.length} items in your cart ${
                    (auth ? auth.token : null) ? "" : "Please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart
              ? cart.map((prd) => (
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
                      <p>{prd.description.substring(0, 30)}....</p>
                      <p>price : $ {prd.price}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(prd._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total : Checkout || Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {((auth ? auth.user : null) ? auth.user.address : null) ? (
              <div>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>
                    {(auth ? auth.user : null) ? auth.user.address : null}
                  </h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-3">
                {(auth ? auth.token : null) ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {clientToken && cart.length ? (
                <div className="mt-1">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  {((auth ? auth.user : null) ? auth.user.address : null) ? (
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      // disabled={!loading || !instance}
                      disabled={loading && instance}
                    >
                      {loading ? "Processing" : "Make Payment"}
                    </button>
                  ) : null}
                </div>
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
