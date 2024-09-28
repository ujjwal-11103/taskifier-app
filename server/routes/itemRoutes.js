import express from 'express';
import { createItem, getItems, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.route('/').post(createItem).get(getItems);
router.route('/:id').delete(deleteItem);

export default router;
