import { Category } from "../models/Category.js"

class CategoryController {
    async create(req, res) {
        try {
            const category = await new Category(req.body).save();
            res.status(201).json(category)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
          const { id } = req.params;
          const { name, description} = req.body;
          const result = await Category.findByIdAndUpdate(
            id,
            { name, description},
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
            const result = await Category.findByIdAndDelete(id);
            res.json({ message: "Удален", deletedProduct: result });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
      }
}

export default new CategoryController();