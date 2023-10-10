import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
    const { deleteTask } = useTasks();
    return (
        <div className="bg-zinc-800 flex flex-col justify-between  w-full p-7 rounded-md">
            <div>
                <h1 className="text-2xl font-bold mb-3">{task.title}</h1>
                <h3 className="text-slate-300 font-bold">
                    Código: {task.code}
                </h3>
                <p className="text-slate-300">
                    {task.description.slice(0, 75)}...
                </p>
            </div>
            <div className="flex gap-x-2 items-center mt-5">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        deleteTask(task._id);
                    }}
                >
                    Borrar
                </button>
                <Link
                    to={`/tasks/${task._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Editar
                </Link>
            </div>
        </div>
    );
}

export default TaskCard;
