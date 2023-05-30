import { Router } from 'express';
import path from 'path';

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

export default viewsRouter;
