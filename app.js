import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import {Router_Categories, Router_Order, Router_OrderDetails, Router_Products, Router_User } from "./routes/routes.js";
import multer from "multer";
import path from "path";
import userModel from "./models/UserModel.js";
import { fileURLToPath } from "url";

import ChatRouter from "./routes/chatRoutes.js";


//! para JWT
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

app.use(cors());
app.use(express.json())
// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/products', Router_Products)
app.use('/user', Router_User)
app.use('/categories', Router_Categories)
app.use('/order', Router_Order)
app.use('/orderdetails', Router_OrderDetails)

app.use('/chat', ChatRouter);

// app.use('/frauds', Router_Frauds)



const startServer = async () => {
    try {
        await db.authenticate();


        console.log("Conexión exitosa a la BD");

        app.listen(8000, () => {
            console.log("Server Up running in http://localhost:8000/");
        });
    } catch (error) {
        console.error(`Error de conexión: ${error}`);
    }
};

startServer();

app.get('/', (req, res) => {
    res.send("hola mundo")
})


// ⬇ Servir archivos estáticos desde Public (con mayúscula)
app.use('/public', express.static(path.join(__dirname, 'Public')));

// app.use('/public', express.static('public'));

const SECRETKEY = 'cocacolaEspuma'; // clave secreta

// app.post('/auth', async (req, res) => {

//     const { email, password } = req.body;
//     try {
//         const usuario = await userModel.findOne({
//             where: { email: email, password: password },
//         });

//         if (!usuario) {
//             return res.json({ status: "failed" });
//         }
//         const { role } = usuario;
//         const { first_name } = usuario;
//         const { last_name } = usuario;
//         const { user_id } = usuario;
//         // const token = jwt.sign({ username: req.body.user }, SECRETKEY, { expiresIn: '1m' });

//         res.json({
//             message: `Bienvenido ${first_name}`,
//             first_name: first_name,
//             last_name: last_name,
//             role: role,
//             user_id: user_id,
//             status: "success"
//         });

//     } catch (error) {
//         return res.status(500).json({ message: "Error al Auntentificar", error });
//     }

// });


import jwt from 'jsonwebtoken';

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await userModel.findOne({
            where: { email, password },
        });

        if (!usuario) {
            return res.json({ status: "failed" });
        }

        const payload = {
            user_id: usuario.user_id,
            role: usuario.role,
            email: usuario.email
        };

        // Generar TOKEN
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        return res.json({
            message: `Bienvenido ${usuario.first_name}`,
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            role: usuario.role,
            user_id: usuario.user_id,
            token,                        
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al autenticar", error });
    }
});


