import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already Exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    return res.status(201).send({
      success: true,
      message: "New Category created",
      category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      err,
      message: "Error in category",
    });
  }
};

// update category
export const updateCateegoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          slug: slugify(req.body.name),
        },
      },
      {
        returnDocument: "after",
      }
    );
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      err,
      message: "Error while updating category",
    });
  }
};

// get all categories
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "All categories List",
      category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      err,
      message: "Error while getting all categories",
    });
  }
};

// get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    return res.status(200).send({
      success: true,
      message: "Get a single Category",
      category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error while getting a single category",
      err,
    });
  }
};

// get single category of a specif product by ID
export const singleCategoryByIdController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Get a single Category by Id",
      category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error while getting a single category",
      err,
    });
  }
};

// delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error while deleting category",
      err,
    });
  }
};
