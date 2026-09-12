import Genre from '../models/Genre.js';
import Movie from '../models/Movie.js';

class GenreController {
    async getAll(req, res) {
        try {
            const genres = await Genre.find({ active: true })
                .select('name description createdAt');

            res.json({
                success: true,
                message: 'Géneros obtenidos exitosamente',
                data: genres,
                count: genres.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los géneros',
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

            const genre = await Genre.findById(id);

            if (!genre) {
                return res.status(404).json({
                    success: false,
                    message: 'Género no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Género obtenido exitosamente',
                data: genre
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el género',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const { name, description } = req.body;

            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre del género es obligatorio'
                });
            }

            const existingGenre = await Genre.findOne({ 
                name: { $regex: `^${name}$`, $options: 'i' } 
            });

            if (existingGenre) {
                return res.status(400).json({
                    success: false,
                    message: 'El género ya existe'
                });
            }

            const genre = await Genre.create({
                name: name.trim(),
                description: description ? description.trim() : ''
            });

            res.status(201).json({
                success: true,
                message: 'Género creado exitosamente',
                data: genre
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear el género',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, active } = req.body;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
            }

            const updateData = {};
            if (name) updateData.name = name.trim();
            if (description !== undefined) updateData.description = description.trim();
            if (active !== undefined) updateData.active = active;

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Proporcione al menos un campo para actualizar'
                });
            }

            const genre = await Genre.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!genre) {
                return res.status(404).json({
                    success: false,
                    message: 'Género no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Género actualizado exitosamente',
                data: genre
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el género',
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

            const moviesWithGenre = await Movie.find({ genre: id });

            if (moviesWithGenre.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `No se puede eliminar el género. Hay ${moviesWithGenre.length} película(s) asociada(s)`
                });
            }

            const genre = await Genre.findByIdAndDelete(id);

            if (!genre) {
                return res.status(404).json({
                    success: false,
                    message: 'Género no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Género eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el género',
                error: error.message
            });
        }
    }

    async searchByName(req, res) {
        try {
            const { name } = req.query;

            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'El parámetro "name" es obligatorio'
                });
            }

            const genres = await Genre.find({
                name: { $regex: name, $options: 'i' },
                active: true
            });

            res.json({
                success: true,
                message: 'Búsqueda realizada exitosamente',
                data: genres,
                count: genres.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en la búsqueda',
                error: error.message
            });
        }
    }

    async filterByActive(req, res) {
        try {
            const { active } = req.query;

            if (active === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'El parámetro "active" es obligatorio (true o false)'
                });
            }

            const isActive = active === 'true';
            const genres = await Genre.find({ active: isActive });

            res.json({
                success: true,
                message: 'Filtro aplicado exitosamente',
                data: genres,
                count: genres.length
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

export default GenreController;