import Movie from '../models/Movie.js';
import Genre from '../models/Genre.js';

class MovieController {
    async getAll(req, res) {
        try {
            const movies = await Movie.find({ active: true })
                .populate('genre', 'name')
                .select('-active');

            res.json({
                success: true,
                message: 'Películas obtenidas exitosamente',
                data: movies,
                count: movies.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las películas',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
            }

            const movie = await Movie.findById(id)
                .populate('genre', 'name description');

            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: 'Película no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Película obtenida exitosamente',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la película',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const { title, genre, releaseYear, director, synopsis, rating, poster } = req.body;

            if (!title || title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El título es obligatorio'
                });
            }

            if (!genre) {
                return res.status(400).json({
                    success: false,
                    message: 'El género es obligatorio'
                });
            }

            if (!releaseYear) {
                return res.status(400).json({
                    success: false,
                    message: 'El año de lanzamiento es obligatorio'
                });
            }

            if (!director || director.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El director es obligatorio'
                });
            }

            const genreExists = await Genre.findById(genre);
            if (!genreExists) {
                return res.status(404).json({
                    success: false,
                    message: 'El género especificado no existe'
                });
            }

            const movie = await Movie.create({
                title: title.trim(),
                genre,
                releaseYear: parseInt(releaseYear),
                director: director.trim(),
                synopsis: synopsis ? synopsis.trim() : '',
                rating: rating ? parseFloat(rating) : 0,
                poster: poster || undefined
            });

            await movie.populate('genre', 'name');

            res.status(201).json({
                success: true,
                message: 'Película creada exitosamente',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear la película',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, genre, releaseYear, director, synopsis, rating, poster, active } = req.body;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
            }

            const updateData = {};
            if (title) updateData.title = title.trim();
            if (genre) updateData.genre = genre;
            if (releaseYear) updateData.releaseYear = parseInt(releaseYear);
            if (director) updateData.director = director.trim();
            if (synopsis !== undefined) updateData.synopsis = synopsis.trim();
            if (rating !== undefined) updateData.rating = parseFloat(rating);
            if (poster) updateData.poster = poster;
            if (active !== undefined) updateData.active = active;

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Proporcione al menos un campo para actualizar'
                });
            }

            if (genre) {
                const genreExists = await Genre.findById(genre);
                if (!genreExists) {
                    return res.status(404).json({
                        success: false,
                        message: 'El género especificado no existe'
                    });
                }
            }

            const movie = await Movie.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            ).populate('genre', 'name');

            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: 'Película no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Película actualizada exitosamente',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la película',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
            }

            const movie = await Movie.findByIdAndDelete(id);

            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: 'Película no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Película eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la película',
                error: error.message
            });
        }
    }

    async searchByTitle(req, res) {
        try {
            const { title } = req.query;

            if (!title || title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El parámetro "title" es obligatorio'
                });
            }

            const movies = await Movie.find({
                title: { $regex: title, $options: 'i' },
                active: true
            }).populate('genre', 'name');

            res.json({
                success: true,
                message: 'Búsqueda realizada exitosamente',
                data: movies,
                count: movies.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en la búsqueda',
                error: error.message
            });
        }
    }

    async filterByYear(req, res) {
        try {
            const { year } = req.query;

            if (!year) {
                return res.status(400).json({
                    success: false,
                    message: 'El parámetro "year" es obligatorio'
                });
            }

            const movies = await Movie.find({
                releaseYear: parseInt(year),
                active: true
            }).populate('genre', 'name');

            res.json({
                success: true,
                message: 'Filtro aplicado exitosamente',
                data: movies,
                count: movies.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en el filtro',
                error: error.message
            });
        }
    }

    async filterByGenre(req, res) {
        try {
            const { genreId } = req.query;

            if (!genreId) {
                return res.status(400).json({
                    success: false,
                    message: 'El parámetro "genreId" es obligatorio'
                });
            }

            if (!genreId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de género inválido'
                });
            }

            const movies = await Movie.find({
                genre: genreId,
                active: true
            }).populate('genre', 'name');

            res.json({
                success: true,
                message: 'Filtro aplicado exitosamente',
                data: movies,
                count: movies.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en el filtro',
                error: error.message
            });
        }
    }
}

export default MovieController;