const express = require('express');
const app = express();
const cors = require('cors');
// Rutas
const usersRoutes = require('./routes/users.routes');

// Middlewares para cliente
// Opciones avanzadas de configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Dominios autorizados
  methods: '*', // Métodos permitidos
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Uso de rutas
app.use('/api/users', usersRoutes)

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
