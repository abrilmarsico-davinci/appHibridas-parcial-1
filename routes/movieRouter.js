import { Router } from 'express';
import MovieController from '../controllers/MovieController.js';

const router = Router();
const controller = new MovieController();

// Rutas principales CRUD
router.get('/', controller.getAll.bind(controller));
router.get('/search', controller.searchByTitle.bind(controller)); // Búsqueda por título
router.get('/filter/year', controller.filterByYear.bind(controller)); // Filtro por año
router.get('/filter/genre', controller.filterByGenre.bind(controller)); // Filtro por género
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;