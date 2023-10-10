import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContex';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signin, errors: SigninErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated]);

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {SigninErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white my-2" key={i}>
                        {error}
                    </div>
                ))}
                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Correo"
                    />
                    {errors.email && (
                        <p className="text-red-500">Email requerido</p>
                    )}

                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Contraseña"
                    />
                    {errors.password && (
                        <p className="text-red-500">Contraseña requerida</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 mt-2 rounded-md"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
