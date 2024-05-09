import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get userData
  useEffect(() => {
    if (auth) {
      if (auth.user) {
        const { name, email, phone, address } = auth.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
      }
    }
  }, [auth ? auth.user : null]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data) {
        if (data.error) {
          toast.error(data.error);
        } else {
          if (data) {
            if (data.updatedUser) {
              setAuth({ ...auth, user: data.updatedUser });
              let ls = localStorage.getItem("auth");
              ls = JSON.parse(ls);
              ls.user = data.updatedUser;
              localStorage.setItem("auth", JSON.stringify(ls));
              toast.success("Profile updated successfully...");
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Somrthing went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h1>User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter your Name"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Email Address"
                    disabled
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
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Phone number"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter your Address"
                    autoFocus
                  />
                </div>

                <button type="submit" className="btn">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
