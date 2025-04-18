import mongoose from "mongoose";

const stateProductSchema = new mongoose.Schema({
  id: String,
  url: String,
  detailUrl: String,
  title: {
    shortTitle: String,
    longTitle: String,
  },
  price: {
    mrp: Number,
    cost: Number,
    discount: String,
  },
  quantity: Number,
  description: String,
  discount: String,
  tagline: String,
  state: String
});

const StatesProduct = mongoose.model("StatesProduct", stateProductSchema);

export default StatesProduct;
