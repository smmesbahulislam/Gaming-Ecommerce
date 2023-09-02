import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending","confirmed", "shipping","shipped","delivering","delivered"],
      default: "pending",
    },
    orderTransactionId: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
