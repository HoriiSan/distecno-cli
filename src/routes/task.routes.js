import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getTask,
    getTasks,
    deleteTask,
    updateTask,
    createTasks,
    getOrder,
    deleteOrder,
} from '../controllers/tasks.controllers.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/orders', authRequired, getOrder);

router.delete('/orders/:id', authRequired, deleteOrder);

router.get('/tasks', authRequired, getTasks);

router.get('/tasks/:id', authRequired, getTask);

router.post(
    '/tasks',
    authRequired,
    validateSchema(createTaskSchema),
    createTasks
);

router.delete('/tasks/:id', authRequired, deleteTask);

router.put('/tasks/:id', authRequired, updateTask);

export default router;
