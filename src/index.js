import express from "express";
import routerUsers from './routes/users.routes.js';
import routerProducts from './routes/products.routes.js';
import routerOrders from './routes/orders.router.js';
import sequelize from "./db.js";
import './models/Associations.js';




const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());

app.listen(port, () => console.log("Working! " + port));

app.use('/api', routerUsers, routerProducts, routerOrders);
// app.use('/api', routerProducts);

sequelize.sync({ force: false }) // Usar alter: true en producción
    .then(() => console.log('Modelos sincronizados'))
    .catch(error => console.error('Error de sincronización:', error));