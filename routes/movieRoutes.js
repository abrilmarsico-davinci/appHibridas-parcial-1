import express from 'express';
import { authMiddleware } from '../auth/authMiddleware.js';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/MovieController.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', authMiddleware, createMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);

export default router;
