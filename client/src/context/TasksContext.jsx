import { createContext, useContext, useState } from 'react';
import {
    createTaskRequest,
    getTasksRequest,
    deleteTaskRequest,
    getTaskRequest,
    updateTaskRequest,
    getOrdersRequest,
    deleteOrderRequest,
} from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
};

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const res = await getOrdersRequest();
        setOrders(res.data);
    };

    const deleteOrder = async (id) => {
        try {
            const res = await deleteOrderRequest(id);
            console.log(res);

            if (res.status == 204)
                setOrders(orders.filter((order) => order._id != id));
        } catch (error) {
            console.log(error);
        }
    };

    const getTasks = async () => {
        const res = await getTasksRequest();
        setTasks(res.data);
    };

    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        console.log(res);
    };

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            console.log(res);

            if (res.status == 204)
                setTasks(tasks.filter((task) => task._id != id));
        } catch (error) {
            console.log(error);
        }
    };

    const getTask = async (id) => {
        const res = await getTaskRequest(id);
        return res.data;
    };

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                orders,
                deleteOrder,
                createTask,
                getTasks,
                deleteTask,
                getTask,
                updateTask,
                getOrders,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
