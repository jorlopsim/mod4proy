import { Router } from 'express';
import {getProducts ,
       createProduct, 
       getProduct, 
       updateProduct, 
       deleteProduct} from '../controllers/producto.controller.js';
import {verifytoken} from '../controllers/usuario.controller.js';

const router = Router();

// Routes
router.get('/',verifytoken,getProducts);

router.post('/',verifytoken,createProduct);

router.get('/:id',verifytoken,getProduct);

router.put('/:id',verifytoken,updateProduct);

router.delete('/:id',verifytoken,deleteProduct);

router.get('/:id/tasks');
export default router;