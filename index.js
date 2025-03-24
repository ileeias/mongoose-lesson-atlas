import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js"
import {Order} from "./models/Order.js"
import {Product} from "./models/Product.js"


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const connectionString = process.env.CONNECTION_STRING;

async function connectDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log("Подключенно к базе данных!");
    } catch (error) {
        console.log("Error!");
    }
}

app.use(express.json());

app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/category", categoryRoutes)

app.get("/order", async (req, res) => {
    try {
        const order = await Order.find().populate("userId", "fullname number")
        .populate("products.productId", "name");
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/order", async (req, res) => {
    try {
        const { userId, totalPrice, status } = req.body;
        const order = await new Order({ userId, totalPrice, status }).save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete("/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Order.findByIdAndDelete(id);
        res.json({ message: "Удален", deletedProduct: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
//Добавляем продукты
app.post("/order/add", async (req, res) => {
    try {
        //получаем данные
        const { orderId, productId, quantity } = req.body;
        //провкряем заполненность
        if (!orderId || !productId || !quantity) {
            return res.status(400).json({ message: "Необходимо указать orderId, productId и quantity" });
        }
        //находим корзину
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Заказ не найден!" });
        }
        //проверяем наличие продукта
        const thereProduct = order.products.find(product => product.productId.toString() === productId);
        if (thereProduct) {
            return res.status(409).json({ message: "Продукт уже есть в этом заказе!" });
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Продукт не был найден!" });
        }
        const productPrice = product.price;
        const totalProductPrice = productPrice * quantity;

        const orderUpdate = await Order.findByIdAndUpdate(orderId, {
            $push: {products: {productId, quantity}},
            $inc: {totalPrice: totalProductPrice}
        }, { new: true });
        
        if (!orderUpdate) {
            return res.status(404).json({message: "Продукт не был найден!"})
        }
        res.json({message: `Продукт с id - ${productId} успешно добавлен! x ${quantity} шт. Обновленная сумма заказа: ${orderUpdate.totalPrice}`})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`Сервер запущен на localhost://${PORT}`);
});