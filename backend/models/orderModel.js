// import mongoose from "mongoose"

// const orderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     items: { type: Array, required: true },
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, default: "Food Processing" },
//     date: { type: Date, default: Date.now() },
//     payment: { type: Boolean, default: false },
// })

// const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)
// export default orderModel;

import mongoose from "mongoose";
import moment from "moment-timezone";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { 
    type: Date, 
    default: () => moment().tz("Asia/Ho_Chi_Minh").toDate(),
  },
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
