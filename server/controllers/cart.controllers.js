import CartProductModel from "../models/cartproduct.models.js";
import UserModel from "../models/user.models.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item already in cart",
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res.json({
      data: save,
      message: "Item add successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return res.json({
      data: cartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { _id, qty } = req.body;

    if (!_id || !qty) {
      return res.status(400).json({
        message: "provide _id, qty",
      });
    }

    const updateCartitem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
      }
    );

    return res.json({
      message: "Update cart",
      success: true,
      error: false,
      data: updateCartitem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteItems = async (req, res) => {
  try {
    const userId = req.user.id; // middleware
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Provide _id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    return res.json({
      message: "Item remove",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
