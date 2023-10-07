import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        // const tasks = await Task.find({
        //     user: req.user.id,
        // }).populate('user');
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
            description,
            // features,
            promPrice,
        } = req.body;

        const tasks = await Task.find();
        const codes = tasks.map((task) => {
            return task.code;
        });

        const newCode = () => {
            if (codes) return Math.max(...codes) + 1;
            return 1;
        };

        const newTask = new Task({
            code: newCode(),
            active,
            title,
            tags,
            mercadoLibre,
            price,
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
