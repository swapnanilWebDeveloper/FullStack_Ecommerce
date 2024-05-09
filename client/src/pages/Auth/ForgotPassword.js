import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthStyle from "../../styles/AuthStyle.css";
import { token } from "morgan";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setTimeout(function () {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somrthing went wrong");
    }
  };
  return (
    <Layout title={"Forgot password - Ecommerce App"}>
      <div className="form-container">
        <h1>Reset Password</h1>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favourite Sport"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
              autoFocus
            />
          </div>

          <button type="submit" className="btn">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
