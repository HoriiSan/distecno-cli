import Task from '../models/task.model.js';
import Order from '../models/order.model.js';

export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Task not found' });
        return res.status(204).json();
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createTasks = async (req, res) => {
    try {
        const {
            active,
            title,
            front,
            imgs,
            tags,
            mercadoLibre,
            price,
            features,
            description,
            promPrice,
        } = req.body;

        const tasks = await Task.find();

        const newCode = tasks.length + 170;
        console.log(newCode);

        const newTask = new Task({
            code: newCode,
            active,
            title,
            front,
            imgs,
            tags,
            mercadoLibre,
            price,
            features,
            description,
            promPrice,
        });

        const savedTask = await newTask.save();

        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        return res.status(204).json();
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' });
    }
};

export const updateTask = async (req, res) => {
    try {
        console.log(req.body);

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' });
    }
};
