import genreRouter from './genreRouter.js';

export default function routerAPI(app) {
    app.use('/api/genres', genreRouter);
}