import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { connectDB } from './config/db.js';
import routerAPI from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

connectDB();

app.get('/', (req, res) => {
    res.sendFile(new URL('./public/index.html', import.meta.url).pathname);
});

routerAPI(app);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.path,
        method: req.method
    });
});

app.use((err, req, res, next) => {
    console.error(chalk.red('Error:'), err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error desconocido'
    });
});

app.listen(port, () => {
    console.log(chalk.green(`\n✓ Servidor ejecutándose en puerto ${port}`));
    console.log(chalk.cyan(`→ http://localhost:${port}\n`));
});