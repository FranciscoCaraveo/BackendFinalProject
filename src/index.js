import express from "express";
import sequelize from "./db.js";
// import routerClient from ".routers/"
import './models/Associations.js'
const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());

app.listen(port, () => console.log("Working! " + port));

sequelize.sync({ force: true }) // Usar alter: true en producción
    .then(() => console.log('Modelos sincronizados'))
    .catch(error => console.error('Error de sincronización:', error));