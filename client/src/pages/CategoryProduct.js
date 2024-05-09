import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params) {
      if (params.slug) {
        getProductsByCat();
      }
    }
  }, [params ? params.slug : null]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      if (data) {
        if (data.products) {
          setProducts(data.products);
        }
        if (data.category) {
          setCategory(data.category);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(category);
    console.log(products);
  });
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">
          Category : {category ? category.name : null}
        </h4>
        <h6 className="text-center">
          {products ? products.length : null} result found
        </h6>
        <div className="row">
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
                      <button class="btn btn-secondary ms-2">
                        Add To Cart
                      </button>
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

export default CategoryProduct;
