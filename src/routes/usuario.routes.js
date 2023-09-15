import { Router } from 'express';
import {getUsers , 
       createUser, 
       getUser, 
       updateUser, 
       deleteUser, 
       getUserCategorys ,
       getUsersCategorys,
       getUserProducts,
       getUsersProducts,
       genToken,
    } from '../controllers/usuario.controller.js';
const router = Router();

// Routes
router.get('/',getUsers);

router.post('/',createUser);

router.post('/login',genToken);

router.get('/:id',getUser);

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);

router.get('/:id/categorias',getUserCategorys);

router.get('/categorias/all', getUsersCategorys);

router.get('/:id/productos',getUserProducts);

router.get('/productos/all', getUsersProducts);
export default router;