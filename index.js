const express = require('express');
const morgan = require('morgan');

const app = express();
const usuarios = require('./routes/usuarios');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", usuarios);
app.use(auth);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})