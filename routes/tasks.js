import express from 'express';
import { validateInput, validateQuery } from '../controllers/validator.js';
import { getTasks, createTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', validateQuery, getTasks);
router.post('/', validateInput, createTask);

export default router;