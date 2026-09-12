import { Router } from 'express';
import GenreController from '../controllers/GenreController.js';

const router = Router();
const controller = new GenreController();

// Rutas principales CRUD
router.get('/', controller.getAll.bind(controller));
router.get('/search', controller.searchByName.bind(controller)); // Búsqueda por nombre
router.get('/filter/active', controller.filterByActive.bind(controller)); // Filtro por estado
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;