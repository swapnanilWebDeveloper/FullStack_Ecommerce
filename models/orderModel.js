import mongoose, { Schema, SchemaTypes, mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: SchemaTypes.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
