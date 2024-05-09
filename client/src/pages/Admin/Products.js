import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !!");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products
              ? products.map((prd) => (
                  <Link
                    to={`/dashboard/admin/product/${prd.slug}`}
                    key={prd._id}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/product/product-photo/${prd._id}`}
                        className="card-img-top"
                        alt={prd.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{prd.name}</h5>
                        <p className="card-text">{prd.description}</p>
                        <p className="card-text">price : ${prd.price}</p>
                        <p className="card-text">quanity : {prd.quantity}</p>
                        <p className="card-text">
                          category : {prd.category ? prd.category.name : null}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
