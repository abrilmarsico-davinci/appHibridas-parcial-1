import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del género es obligatorio'],
            unique: true,
            trim: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
            maxlength: [50, 'El nombre no puede exceder 50 caracteres']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'La descripción no puede exceder 500 caracteres']
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Genre = mongoose.model('genre', genreSchema);

export default Genre;