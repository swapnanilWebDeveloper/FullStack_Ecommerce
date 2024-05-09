import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data) {
        // console.log(data);
        if (data.category) {
          setCategories(data.category);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      console.log(categories);
    }
  }, [categories]);

  return categories;
}
