import { Router } from 'express';
import { getCategories, getCategoryById } from '../controllers/category.controller.js';
import { verifyJWT } from '../middlewares/authjwt.middleware.js';
const categoryRouter=Router();

categoryRouter.route('/category').get(getCategories);
categoryRouter.route('/category/:categoryId').get(verifyJWT,getCategoryById);
export default categoryRouter;