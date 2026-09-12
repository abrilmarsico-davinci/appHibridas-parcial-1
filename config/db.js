import mongoose from 'mongoose';
import chalk from 'chalk';

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        await mongoose.connect(mongoUri);
        console.log(chalk.green('Base de datos conectada exitosamente'));
    } catch (error) {
        console.error(chalk.red('Error al conectar la base de datos:'), error.message);
        process.exit(1);
    }
};