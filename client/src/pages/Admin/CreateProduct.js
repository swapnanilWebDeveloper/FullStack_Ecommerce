import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get All category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data) {
        if (data.success) {
          setCategories(data.category);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data) {
        if (data.success) {
          setTimeout(() => {
            toast.success("Product created sucessfully....");
          }, 1000);
          navigate("/dashboard/admin/products");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong..!!");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-control mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories
                  ? categories.map((cat) => (
                      <Option key={cat._id} value={cat._id}>
                        {cat.name}
                      </Option>
                    ))
                  : null}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="Number"
                  value={price}
                  placeholder="insert price of product"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="Number"
                  value={quantity}
                  placeholder="insert quantity of product"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button onClick={handleCreate}>CREATE Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
