import { Layout } from "antd";
import React from "react";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {values
              ? values.results.length < 1
                ? "No products Found"
                : `Found ${values ? values.results.length : null}`
              : null}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values
              ? values.results
                ? values.results.map((val) => (
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/product/product-photo/${val._id}`}
                        className="card-img-top"
                        alt={val.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{val.name}</h5>
                        <p className="card-text">
                          {val.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">price : ${val.price}</p>
                        <p className="card-text">quanity : {val.quantity}</p>
                        <p className="card-text">
                          category : {val.category ? val.category.name : null}
                        </p>
                        <button class="btn btn-primary ms-2">
                          More Details
                        </button>
                        <button class="btn btn-secondary ms-2">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))
                : null
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
