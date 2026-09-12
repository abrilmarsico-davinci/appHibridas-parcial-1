import genreRouter from './genreRouter.js';
import movieRouter from './movieRouter.js';

export default function routerAPI(app) {
    app.use('/api/genres', genreRouter);
    app.use('/api/movies', movieRouter);
}