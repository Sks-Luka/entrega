import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import { __dirname } from "./path.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import morgan from "morgan";

const app  = express();

app.use (express.static(__dirname + 'public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/carts', cartRouter); 
app.use('/api/products', productRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Servidor listo. Escuchando en el puerto ${PORT}`) 
});