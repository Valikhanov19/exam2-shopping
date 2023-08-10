import { read, write } from "../utils/model.js";

const GET = (req, res) => {
  try {
    const clients = read("clients");

    res.status(200).json({
      status: 200,
      message: "success",
      data: clients,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const GET_SINGLE_USER = (req, res) => {
  try {
    const {id} = req.params;
    const clients = read("clients");
    const orders = read("orders");
    const products = read("products");

    const client = clients.find(client => client.client_id == id);
    const order = orders.filter(o => o.client_id == id);

    client.orders = []

    order.forEach(o => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].product_id == o.product_id) {
                client.orders.push(products[i])
            }
        
        }
    });

    res.status(200).json({
      status: 200,
      message: "success",
      data: client,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const CLIENT_REGISTER = (req, res) => {
  try {
    const clients = read("clients");
    const { username } = req.body;

    const user = clients.find((user) => user.username == username);

    if (user) {
      throw new Error("username already exists");
    }
    const newUser = {
      id: clients.at(-1).id + 1 || 1,
      username
    };
    clients.push(newUser);
    write("clients", clients);

    delete newUser.password;
    res.status(201).json({
      status: 201,
      message: "success",
      data: newUser,
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
  GET_SINGLE_USER,
  CLIENT_REGISTER,
};
