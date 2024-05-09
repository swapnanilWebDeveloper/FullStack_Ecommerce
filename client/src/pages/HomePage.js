import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  console.log(cart);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data) {
        if (data.success) {
          setProducts(data.products);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      if (data) {
        if (data.total) {
          setTotal(data.total);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data) {
        setProducts([...products, ...data.products]);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cat) => cat !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      if (data) {
        if (data.products) {
          setProducts(data.products);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Layout title={"All Products - Best offers"}>
        <div className="row mt-3">
          <div className="col-md-3">
            <h4 className="text-center">Filter by category</h4>
            <div className="d-flex flex-column">
              {categories
                ? categories.map((cat) => (
                    <Checkbox
                      key={cat._id}
                      onChange={(e) => handleFilter(e.target.checked, cat._id)}
                    >
                      {cat.name}
                    </Checkbox>
                  ))
                : null}
            </div>
            {/* Price filter */}
            <h4 className="text-center mt-4">Filter by Prices</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices
                  ? Prices.map((price) => (
                      <div key={price._id}>
                        <Radio value={price.array}>{price.name}</Radio>
                      </div>
                    ))
                  : null}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTER
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products
                ? products.map((prd) => (
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/product/product-photo/${prd._id}`}
                        className="card-img-top"
                        alt={prd.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{prd.name}</h5>
                        <p className="card-text">
                          {prd.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">price : ${prd.price}</p>
                        <p className="card-text">quanity : {prd.quantity}</p>
                        <p className="card-text">
                          category : {prd.category ? prd.category.name : null}
                        </p>
                        <button
                          class="btn btn-primary ms-2"
                          onClick={() => navigate(`/product/${prd.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          class="btn btn-secondary ms-2"
                          onClick={() => {
                            setCart([...cart, prd]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, prd])
                            );
                            toast.success("Item added to cart successfully...");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Loadmore..."}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
