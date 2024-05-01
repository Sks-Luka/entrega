import express from "express";
import ProductManager from "./managerProducts/manager.js";

const productManager = new ProductManager('../users.json');

const app  = express();

app.use(express.json())


app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const { limit } = req.query;

        if (limit){
            const limitedList = products.slice(0, limit);
            return res.status(200).json(limitedList);
        }

        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        if (!product) res.status(404).json({ msg: "User not found" });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    });

const PORT = 8080;

app.listen(PORT,()=>console.log(`Servidor listo. Escuchando en el puerto ${PORT}`));