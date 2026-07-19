import { Router } from 'express';
import { getAllCategoriesController } from '../controllers/category.controller.js';
const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesController);

export default categoryRouter;
