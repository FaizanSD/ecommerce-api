const Product = require("../models/product");

module.exports.products = async function (req, res) {
  try {
    const foundProducts = await Product.find({});
    res.send(foundProducts);
  } catch (err) {
    res.send(err);
  }
};

module.exports.create = async function (req, res) {
  const { name, quantity } = req.body;
  const newProduct = new Product({ name, quantity });

  try {
    await newProduct.save();
    res.send("New product added successfully.");
  } catch (err) {
    res.send(err);
  }
};

module.exports.delete = async function (req, res) {
  const { productID } = req.params;

  try {
    await Product.deleteOne({ _id: productID });
    res.send({ message: "Product deleted" });
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateQuantity = async function (req, res) {
  const { productID } = req.params;
  const { number } = req.query;

  try {
    const foundProduct = await Product.findById(productID);
    if (!foundProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    const newQty = parseInt(foundProduct.quantity) + parseInt(number);
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      { quantity: newQty },
      { new: true } // To return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send({
      product: updatedProduct,
      message: "Updated successfully",
    });
  } catch (err) {
    res.send(err);
  }
};
