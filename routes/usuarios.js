const express = require('express');
const jwt = require('jsonwebtoken');
const usuarios = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

usuarios.post("/login", async (req, res, next) =>{
    const { Correo, Contraseña} = req.body;
    const query = `SELECT * FROM usuarios WHERE mail = '${Correo}' AND password = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña){
        if(rows.length == 1){
            const token =jwt.sign({
                ID: rows[0].ID,
                Correo: rows[0].Correo,
                Nombre: rows[0].Nombre
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else {
            return res.status(230).json({code: 401, message: "Usuario o contraseña incorrectos"});
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

usuarios.post("/signin", async (req, res, next) =>{
    const { Nombre, Correo, Contraseña } = req.body;
    if (!Nombre || !Correo || !Contraseña) {
        return res.status(400).json({ code: 400, message: "Campos incompletos" });
    }
    const query1 = `SELECT * FROM usuarios WHERE mail = '${Correo}'`;
    const rows1 = await db.query(query1);
    if(rows1.length > 0){
        return res.status(409).json({code: 409, message: "Correo electronico en uso, ocurrio un error"});
        };
    try{
        const query = "INSERT INTO usuarios (name, mail, password) VALUES (?, ?, ?)";
        const rows = await db.query(query, [Nombre, Correo, Contraseña]);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "¡Registro exitoso!" });
        }
    }catch (error) {
        console.error("Error en la ruta /alta:", error.message);
        return res.status(500).json({ code: 500, message: "Error en el servidor", error: error.message });
    }
 
});
module.exports = usuarios;