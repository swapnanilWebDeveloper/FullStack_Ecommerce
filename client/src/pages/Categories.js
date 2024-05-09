import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="row">
        {categories
          ? categories.map((cat) => (
              <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                <Link
                  to={`/categoryDestroying/${cat.slug}`}
                  className="btn btn-primary"
                >
                  {cat.name}
                </Link>
              </div>
            ))
          : null}
      </div>
    </Layout>
  );
};

export default Categories;
