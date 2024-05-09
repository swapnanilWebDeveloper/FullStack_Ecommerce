import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AuthStyle from "../../styles/AuthStyle.css";
import { useAuth } from "../../context/auth";
import { token } from "morgan";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setTimeout(function () {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        }, 3000);
      } else {
        setTimeout(() => {
          toast.error(res.data.message);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong : " + err.response.data.message);
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email Address"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
