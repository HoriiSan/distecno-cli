import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                setValue('active', task.active);
                setValue('title', task.title);
                setValue('tags', task.tags);
                setValue('mercadoLibre', task.mercadoLibre);
                setValue('price', task.price);
                setValue('description', task.description);
                setValue('promPrice', task.promPrice);
            }
        }
        loadTask();
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, data);
        } else {
            createTask(data);
        }

        navigate('/tasks');
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    <button className="bg-indigo-500 px-3 py-2 mb-3 rounded-md block">
                        Save
                    </button>

                    <input
                        type="hidden"
                        value={1}
                        {...register('code')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="active">Disponibilidad</label>
                    <input
                        type="checkbox"
                        {...register('active')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="title">Titulo</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        {...register('title')}
                        autoFocus
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="tags">Etiquetas</label>
                    <input
                        type="text"
                        placeholder="Etiquetas"
                        {...register('tags')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="mercadoLibre">MercadoLibre</label>
                    <input
                        type="text"
                        placeholder="MercadoLibre"
                        {...register('mercadoLibre')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        placeholder="Precio"
                        {...register('price')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="price">Precio de promoción</label>
                    <input
                        type="number"
                        placeholder="Precio de promoción"
                        {...register('promPrice')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        rows="3"
                        placeholder="Description"
                        {...register('description')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    ></textarea>

                    <label htmlFor="front">Imagen de portada</label>
                    <input
                        type="file"
                        {...register('front')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="imgs">Imagen adicional</label>

                    <input
                        type="file"
                        {...register('imgs')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                </form>
                <button
                    className="bg-green-500 px-3 py-2 rounded-md"
                    onClick={() => {
                        console.log('clicked');
                    }}
                >
                    Agregar imagen
                </button>
            </div>
        </div>
    );
}

export default TaskFormPage;
