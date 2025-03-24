import { Product } from '../models/Product.js';

class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async create(req, res) {
    try {
      const product = await new Product(req.body).save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category} = req.body;
      const result = await Product.findByIdAndUpdate(
        id,
        { name, description, price, category},
        { new: true }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndDelete(id);
        res.json({ message: "Удален", deletedProduct: result });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }
}

export default new ProductController();
