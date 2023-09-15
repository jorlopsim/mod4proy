import { Router } from 'express';
import {getCategorys , 
       createCategory, 
       getCategory, 
       updateCategory, 
       deleteCategory,
       getCategoryProducts,
       getCategorysProducts,
      } from '../controllers/categoria.controller.js';
import {verifytoken} from '../controllers/usuario.controller.js';
const router = Router();

// Routes
router.get('/',verifytoken,getCategorys);

router.post('/',verifytoken,createCategory);

router.get('/:id',verifytoken,getCategory);

router.put('/:id',verifytoken,updateCategory);

router.delete('/:id',verifytoken,deleteCategory);

router.get('/:id/productos',verifytoken,getCategoryProducts);

router.get('/productos/all', verifytoken,getCategorysProducts);

export default router;