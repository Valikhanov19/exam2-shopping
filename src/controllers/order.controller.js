import { read, write } from "../utils/model.js";

const GET = (req, res) => {
  try {
    const orders = read("orders");

    res.status(200).json({
      status: 200,
      message: "success",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const GET_SINGLE_ORDER = (req, res) => {
  try {
    const { id } = req.params;
    const orders = read("orders");

    const order = orders.find((order) => order.order_id == id);

    if (!order) {
      throw new Error("order is not found");
    }

    res.status(200).json({
      status: 200,
      message: "success",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const ORDER_PRODUCT = (req, res) => {
  try {
    const orders = read("orders");
    const products = read("products");
    const clients = read("clients");
    const { client_id, product_id, count } = req.body;

    const pr = products.find((product) => product.product_id == product_id)
    if (!pr) {
        throw new Error("product_id is not found");
    }

    const client = clients.find((c) =>c.client_id == client_id)
    if (!client) {
        throw new Error("client_id is not found");
    }

    const newOrder = {
      order_id: orders.at(-1).order_id + 1 || 1,
      client_id,
      product_id,
      count: count || 0
    };
    orders.push(newOrder);
    write("orders", orders);

    res.status(200).json({
      status: 200,
      message: "successfully ordered",
      data: newOrder,
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
    const orders = read("orders");
    const { id } = req.params;

    const order = orders.find((order) => order.order_id == id);

    if (!order) {
      throw new Error("order is not found");
    }

    const filteredOrder = orders.filter((order) => order.order_id != id);

    write("orders", filteredOrder);

    res.status(200).json({
      status: 200,
      message: "successfully deleted",
      data: order,
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
  GET_SINGLE_ORDER,
  ORDER_PRODUCT,
  DELETE_PRODUCT,
};
