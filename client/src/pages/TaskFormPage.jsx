import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PathImage from '../components/PathImage';
import Tag from '../components/Tag';
import Features from '../components/Features';

function TaskFormPage() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                setValue('active', task.active);
                setValue('code', task.code);
                setValue('title', task.title);
                setValue('mercadoLibre', task.mercadoLibre);
                setValue('price', task.price);
                setValue('description', task.description);
                setValue('promPrice', task.promPrice);
                setValue('front', task.front);
            }
        }
        loadTask();
    }, []);

    const [img, setImg] = useState([]);
    const [tags, setTags] = useState([]);
    const [features, setFeatures] = useState({});

    useEffect(() => {
        async function loadProps() {
            if (params.id) {
                const task = await getTask(params.id);
                setImg(task.imgs);
                setTags(task.tags);
                setFeatures(task.features);
            }
        }
        loadProps();
    }, []);

    const onSubmit = handleSubmit((data) => {
        data.imgs = img;
        data.tags = tags;
        data.price = parseInt(data.price);
        data.promPrice = parseInt(data.promPrice);
        data.code = parseInt(data.code);
        data.features = features;

        if (params.id) {
            updateTask(params.id, data);
        } else {
            createTask(data);
        }

        navigate('/tasks');
    });

    return (
        <div className="flex items-start justify-center">
            <div className="bg-zinc-800 w-1/3 p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    <h3 className="text-3xl font-bold mb-7">
                        Datos del producto
                    </h3>
                    <input
                        type="hidden"
                        value={1}
                        {...register('code')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    <input
                        type="hidden"
                        {...register('features')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="active" className="mr-5 ">
                        Disponibilidad
                    </label>
                    <input
                        type="checkbox"
                        {...register('active')}
                        className="mb-5"
                    />

                    <label htmlFor="title" className="block">
                        Titulo
                    </label>
                    <input
                        type="text"
                        placeholder="Aire Acondicionado Split - 12000 BTU Omega"
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

                    <p
                        className="bg-green-500 text-center px-3 py-2 rounded-md mb-5"
                        onClick={() => {
                            if (watch('tags')) {
                                const tag = watch('tags');
                                setTags([...tags, tag]);
                                setValue('tags', '');
                            }
                        }}
                    >
                        Agregar Etiqueta
                    </p>

                    <label htmlFor="mercadoLibre">MercadoLibre</label>
                    <input
                        type="text"
                        placeholder="https://articulo.mercadolibre.com.ve"
                        {...register('mercadoLibre')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        placeholder="50"
                        {...register('price')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="promPrice">Precio de promoción</label>
                    <input
                        type="number"
                        placeholder="40"
                        {...register('promPrice')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="description">Descripción</label>
                    <textarea
                        rows="3"
                        placeholder="Nuestro aire acondicionado OMEGA OAS-12W de alto rendimiento, te permite..."
                        {...register('description')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    ></textarea>

                    <label htmlFor="front">Imagen de portada</label>
                    <input
                        type="text"
                        placeholder="Imagen de portada"
                        {...register('front')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />

                    <label htmlFor="text">Imagen adicional</label>

                    <input
                        type="text"
                        placeholder="Imagen adicional"
                        {...register('imgs')}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    <p
                        className="bg-green-500 text-center px-3 py-2 rounded-md mb-5"
                        onClick={() => {
                            if (watch('imgs')) {
                                const imgs = watch('imgs');
                                setImg([...img, imgs]);
                                setValue('imgs', '');
                            }
                        }}
                    >
                        Agregar imagen
                    </p>

                    <label htmlFor="text">Características</label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Color"
                            {...register('key')}
                            className="w-1/2 bg-zinc-700 text-white px-4 py-2 mr-2 rounded-md my-2"
                        />
                        <input
                            type="text"
                            placeholder="Negro"
                            {...register('keyValue')}
                            className="w-1/2 bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        />
                    </div>

                    <p
                        className="bg-green-500 text-center px-3 py-2 rounded-md mb-5"
                        onClick={() => {
                            if (watch('keyValue') && watch('key')) {
                                const value = watch('keyValue');
                                const key = watch('key');

                                const newFeat = JSON.parse(
                                    `{"${key}": ["${key}","${value}"]}`
                                );

                                setFeatures({
                                    ...features,
                                    ...newFeat,
                                });

                                setValue('keyValue', '');
                                setValue('key', '');

                                console.log(features);
                                console.log(features);
                            }
                        }}
                    >
                        Agregar características
                    </p>

                    <button className="bg-indigo-500 w-full  px-3 py-2 mb-3 rounded-md block">
                        Guardar Producto
                    </button>
                </form>
            </div>
            <div className="w-1/3 p-5">
                <h4 className="text-2xl font-bold mb-3  text-zinc-400">
                    Imagenes adicionales
                </h4>
                {img.map((path, index) => {
                    return (
                        <div key={index}>
                            <PathImage
                                path={path}
                                deleteFuntion={() => {
                                    setImg(img.filter((x) => x != img[index]));
                                }}
                            ></PathImage>
                        </div>
                    );
                })}
                <h4 className="text-2xl font-bold mb-3 mt-7 text-zinc-400">
                    Etiquetas del producto
                </h4>

                {tags.map((tag, index) => {
                    return (
                        <div key={index}>
                            <Tag
                                tag={tag}
                                deleteFuntion={() => {
                                    setTags(
                                        tags.filter((x) => x != tags[index])
                                    );
                                }}
                            ></Tag>
                        </div>
                    );
                })}

                <h4 className="text-2xl font-bold mb-3 mt-7 text-zinc-400">
                    Caracteristicas
                </h4>

                {Object.keys(features).map((feature, index) => {
                    return (
                        <div key={index}>
                            <Features
                                deleteFuntion={() => {
                                    const remainObject = features;
                                    delete remainObject[`${feature}`];

                                    setFeatures({ ...{}, ...remainObject });
                                }}
                                featureValue={features[`${feature}`]}
                            ></Features>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TaskFormPage;
