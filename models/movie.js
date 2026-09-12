import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true,
            minlength: [2, 'El título debe tener al menos 2 caracteres'],
            maxlength: [100, 'El título no puede exceder 100 caracteres']
        },
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'genre',
            required: [true, 'El género es obligatorio']
        },
        releaseYear: {
            type: Number,
            required: [true, 'El año de lanzamiento es obligatorio'],
            min: [1800, 'El año debe ser mayor a 1800'],
            max: [new Date().getFullYear(), 'El año no puede ser futuro']
        },
        director: {
            type: String,
            required: [true, 'El director es obligatorio'],
            trim: true,
            minlength: [2, 'El director debe tener al menos 2 caracteres']
        },
        synopsis: {
            type: String,
            trim: true,
            maxlength: [1000, 'La sinopsis no puede exceder 1000 caracteres']
        },
        rating: {
            type: Number,
            min: [0, 'La calificación debe ser mayor a 0'],
            max: [10, 'La calificación no puede exceder 10'],
            default: 0
        },
        poster: {
            type: String,
            default: 'https://via.placeholder.com/300x450?text=No+Image'
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Movie = mongoose.model('movie', movieSchema);

export default Movie;