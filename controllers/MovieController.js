import Movie from '../models/Movie.js';

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find().populate('createdBy', 'name email');
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener películas',
      error: error.message
    });
  }
}

export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id).populate('createdBy', 'name email');
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener película',
      error: error.message
    });
  }
}

export async function createMovie(req, res) {
  try {
    const { title, genre, year, description, director, rating } = req.body;

    if (!title || !genre || !year || !director) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios'
      });
    }

    const movie = new Movie({
      title,
      genre,
      year,
      description,
      director,
      rating,
      createdBy: req.userId
    });

    await movie.save();
    await movie.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Película creada exitosamente',
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear película',
      error: error.message
    });
  }
}

export async function updateMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }

    if (movie.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar esta película'
      });
    }

    const { title, genre, year, description, director, rating } = req.body;

    if (title) movie.title = title;
    if (genre) movie.genre = genre;
    if (year) movie.year = year;
    if (description) movie.description = description;
    if (director) movie.director = director;
    if (rating !== undefined) movie.rating = rating;

    await movie.save();
    await movie.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Película actualizada exitosamente',
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar película',
      error: error.message
    });
  }
}

export async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }

    if (movie.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para eliminar esta película'
      });
    }

    await Movie.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Película eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar película',
      error: error.message
    });
  }
}
