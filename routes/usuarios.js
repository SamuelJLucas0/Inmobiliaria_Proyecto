const express = require('express');
const jwt = require('jsonwebtoken');
const usuarios = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configuración de Multer (guardar archivos en /uploads con su nombre original)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// ===================== LOGIN =====================
usuarios.post("/login", async (req, res) => {
    const { Correo, Contraseña } = req.body;
    const query = `SELECT * FROM usuarios WHERE mail = '${Correo}' AND password = '${Contraseña}';`;
    const rows = await db.query(query);

    if (Correo && Contraseña) {
        if (rows.length == 1) {
            const token = jwt.sign({
                id_user: rows[0].id_user,
                mail: rows[0].mail,
                name: rows[0].name
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } else {
            return res.status(230).json({ code: 401, message: "Usuario o contraseña incorrectos" });
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// ===================== REGISTRO =====================
usuarios.post("/signin", async (req, res) => {
    const { Nombre, Correo, Contraseña } = req.body;
    if (!Nombre || !Correo || !Contraseña) {
        return res.status(400).json({ code: 400, message: "Campos incompletos" });
    }

    const query1 = `SELECT * FROM usuarios WHERE mail = '${Correo}'`;
    const rows1 = await db.query(query1);
    if (rows1.length > 0) {
        return res.status(409).json({ code: 409, message: "Correo electrónico en uso" });
    }

    try {
        const query = "INSERT INTO usuarios (name, mail, password) VALUES (?, ?, ?)";
        const result = await db.query(query, [Nombre, Correo, Contraseña]);

        if (result.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "¡Registro exitoso!" });
        }
    } catch (error) {
        console.error("Error en /signin:", error.message);
        return res.status(500).json({ code: 500, message: "Error en el servidor", error: error.message });
    }
});

// ===================== SUBIR PUBLICACION =====================
usuarios.post('/subirpubli', auth, upload.array('imagenes', 10), async (req, res) => {
    const userId = req.userID;
    const archivos = req.files;

    const rutas = archivos.map(file => `/uploads/${file.originalname}`);
    const rutasJson = JSON.stringify(rutas);

    const {
        PRO, ESTADO, MUN, HAB, BAN, EST, AMU, TAM, PRE, DES
    } = req.body;

    try {
        const sql = `
            INSERT INTO publicaciones (
                id_user, imagenes, PRO, ESTADO, MUN, HAB,
                BAN, EST, AMU, TAM, PRE, DES
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            userId, rutasJson, PRO, ESTADO, MUN, HAB,
            BAN, EST, AMU, TAM, PRE, DES
        ];

        await db.query(sql, values);

        res.status(201).json({ code: 201, message: "Publicación creada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Error al guardar publicación" });
    }
});

// ===================== SUBIR VALIDACION =====================
usuarios.post('/verificar', auth, upload.fields([
    { name: 'ine_photo', maxCount: 1 },
    { name: 'photo_user', maxCount: 1 }
]), async (req, res) => {
    const userId = req.userID;
    const { phone, mail, curp, rfc } = req.body;

    try {
        const ine_photo = `/uploads/${req.files['ine_photo'][0].originalname}`;
        const photo_user = `/uploads/${req.files['photo_user'][0].originalname}`;

        const sql = `
            INSERT INTO validaru (
                id_user, phone, mail2, ine_photo, curp, rfc, photo_user
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            userId, phone, mail, ine_photo, curp, rfc, photo_user
        ];

        await db.query(sql, values);
        res.status(201).json({ code: 201, message: "Verificación enviada correctamente" });
    } catch (error) {
        console.error("Error al guardar verificación:", error.message);
        res.status(500).json({ code: 500, message: "Error al guardar verificación", error: error.message });
    }
});

// ===================== GET IMAGENES DE GALERIA =====================
usuarios.get("/getimg", auth, async (req, res) => {
    try {
        const query = `SELECT imagenes FROM imagenes WHERE id_user = ?`;
        const rows = await db.query(query, [req.userID]);

        if (rows.length > 0) {
            const imagenesJSON = JSON.parse(rows[0].imagenes);
            return res.status(200).json({ code: 200, imagenes: imagenesJSON });
        } else {
            return res.status(404).json({ code: 404, message: "Sin imágenes" });
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: "Error en el servidor", error: error.message });
    }
});

// ===================== Validaciones de admin =====================
usuarios.get('/validaciones', (req, res) => {
    const query = `
      SELECT 
        v.id_user,
        v.photo_user,
        v.ine_photo,
        v.mail2,
        v.phone,
        v.curp,
        v.rfc,
        u.name
      FROM validaru v
      JOIN usuarios u ON v.id_user = u.id_user
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener validaciones:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      res.json(results);
    });
  });
module.exports = usuarios;
