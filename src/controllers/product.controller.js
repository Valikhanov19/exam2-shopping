import { read, write } from "../utils/model.js";

const GET = (req, res) => {
  try {
    const products = read("products");

    res.status(200).json({
      status: 200,
      message: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const GET_SINGLE_PPRODUCT = (req, res) => {
  try {
    const { id } = req.params;
    const products = read("products");

    const product = products.find((product) => product.product_id == id);

    if (!product) {
      throw new Error("product is not found");
    }

    res.status(200).json({
      status: 200,
      message: "success",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const CREATE_PRODUCT = (req, res) => {
  try {
    const products = read("products");
    const { name, price } = req.body;

    const product = products.find((product) => product.name == name);

    if (product) {
      throw new Error("product name already exists");
    }

    const newProduct = {
      product_id: products.at(-1).product_id + 1 || 1,
      name,
      price,
    };
    products.push(newProduct);
    write("products", products);

    res.status(200).json({
      status: 200,
      message: "successfully created",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const UPDATE_PRODUCT = (req, res) => {
  try {
    const products = read("products");
    const { id } = req.params;
    const { name, price } = req.body;

    const product = products.find((product) => product.product_id == id);

    if (!product) {
      throw new Error("Product is not found");
    }

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;

    write("products", products);

    res.status(200).json({
      status: 200,
      message: "successfully updated",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const DELETE_PRODUCT = (req, res) => {
  try {
    const products = read("products");
    const { id } = req.params;

    const product = products.find((product) => product.product_id == id);

    if (!product) {
      throw new Error("Product is not found");
    }

    const filteredP = products.filter((product) => product.product_id != id);

    write("products", filteredP);

    res.status(200).json({
      status: 200,
      message: "successfully deleted",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export default {
  GET,
  GET_SINGLE_PPRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
