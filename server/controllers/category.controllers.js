import CategoryModel from "../models/category.models.js";
import SubCategoryModel from "../models/subCategory.models.js";
import ProductModel from "../models/product.models.js"
import mongoose from "mongoose";


export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Add Category",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return res.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.messsage || error,
      error: true,
      success: false,
    });
  }
};

export const updateCategory = async(req,res) =>{
    try {
        const { _id ,name, image } = req.body 

        const update = await CategoryModel.updateOne({
            _id : _id
        },{
           name, 
           image 
        })

        return res.json({
            message : "Updated Category",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCategory = async(req,res) =>{
    try {
      console.log("Request Body:", req.body);

      const { _id } = req.body;

      if (!_id) {
          return res.status(400).json({
              message: "Category ID is required",
              error: true,
              success: false
          });
      }

      // Convert _id to ObjectId
      const objectId = new mongoose.Types.ObjectId(_id);

      console.log("Converted ObjectId:", objectId);

      // Check if the category exists before deletion
      const categoryExists = await CategoryModel.findOne({ _id: objectId });
      if (!categoryExists) {
          return res.status(404).json({
              message: "Category not found",
              error: true,
              success: false
          });
      }

      const checkSubCategory = await SubCategoryModel.countDocuments({ category: objectId });
      const checkProduct = await ProductModel.countDocuments({ category: objectId });

      if (checkSubCategory > 0 || checkProduct > 0) {
          return res.status(400).json({
              message: "Category is in use and can't be deleted",
              error: true,
              success: false
          });
      }

      const deleteCategory = await CategoryModel.deleteOne({ _id: objectId });

      console.log("Delete Response:", deleteCategory);

      return res.json({
          message: "Category deleted successfully",
          data: deleteCategory,
          error: false,
          success: true
      });


    } catch (error) {
       return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
       }) 
    }
}
