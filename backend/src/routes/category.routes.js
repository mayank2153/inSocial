import { Router } from 'express';
import { getCategoryById } from '../controllers/category.controller.js';
import { verifyJWT } from '../middlewares/authjwt.middleware.js';
const categoryRouter=Router();
categoryRouter.route('/category/:categoryId').get(verifyJWT,getCategoryById);
export default categoryRouter;