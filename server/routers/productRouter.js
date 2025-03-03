import expres from 'express';
import { addProduct, removeProduct, listProducts, updateProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = expres.Router();

// productRouter.post('/add', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1}]), addProduct);
productRouter.post('/add', addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/update', updateProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;