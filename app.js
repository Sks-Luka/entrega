import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import { __dirname } from "./path.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import morgan from "morgan";
import  handlebars from 'express-handlebars';
import viewsRouter from  './routes/views.router.js';
import { Server } from "socket.io";


const app  = express();

app.use (express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/carts', cartRouter); 
app.use('/api/products', productRouter);

app.use(errorHandler);


app.use('/',viewsRouter);

const PORT = 8080;

app.engine('handlebars', handlebars.engine()); // Pasamos la funcionalidad del motor de plantillas 
app.set('views ', __dirname + '/views');// Le pasamos la carpeta de donde  se van a tomar  las vistas
app.set('view engine', 'handlebars' );// Setiamos el motor de plantillas


const httpServer = app.listen(PORT,()=>{
    console.log(`Servidor listo. Escuchando en el puerto ${PORT}`) 
});

const socketServer = new Server(httpServer);

const products = [];

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado : ${socket.id}`);

    socket.on('disconnect',()=>{
        console.log('Usuario desconectado');
    })

    socket.emit('saludodesdeback', 'Bienvenido a websocket')

    socket.on('respuestadesdefront',(message)=>{
        console.log(message);
    })

    socket.on('newproduct', (prod)=>{
        products.push(prod);
        socketServer.emit('products',products);
    })

    app.post('/', (req, res)=>{
        const {message} = req.body;
        socketServer.emit('message', message);
        res.send('Se envio un mensaje al socket del cliente');
    })

})

