import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // initial product details
  useEffect(() => {
    if (params) {
      if (params.slug) {
        getProduct();
      }
    }
  }, [params ? params.slug : null]);
  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data) {
        if (data.product) {
          setProduct(data.product);
          if (data.product.category) {
            getSimilarProduct(data.product._id, data.product.category._id);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      {product ? (
        <div>
          <div className="row container mt-2">
            <div className="col-md-6">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-center">Product Details</h2>
              <h6>Name : {product.name}</h6>
              <h6>Description : {product.description}</h6>
              <h6>Price : {product.price}</h6>
              <h6>
                Category : {product.category ? product.category.name : null}
              </h6>
              <button class="btn btn-secondary ms-2">Add To Cart</button>
            </div>
          </div>
          <hr />
          <div className="row ms-2 container">
            <h6>similar Product</h6>
            {relatedProducts.length < 1 && (
              <p className="text-center">No similar product Found</p>
            )}
            <div className="d-flex flex-wrap">
              {relatedProducts
                ? relatedProducts.map((prd) => (
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
      ) : null}
    </Layout>
  );
};

export default ProductDetails;
