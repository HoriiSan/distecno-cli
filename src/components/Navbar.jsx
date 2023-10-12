import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContex';

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? '/tasks' : '/'}>
                <h1 className="text-2xl font-bold">
                    Administrador de productos
                </h1>
            </Link>

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link
                                to="/add-task"
                                className="bg-indigo-500 px-4 py-2 rounded-sm"
                            >
                                Añadir
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/orders"
                                className="bg-indigo-500 px-4 py-2 rounded-sm"
                            >
                                Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={() => {
                                    logout();
                                }}
                                className="bg-indigo-500 px-4 py-2 rounded-sm"
                            >
                                Salir
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="bg-indigo-500 px-4 py-2 rounded-sm"
                            >
                                Iniciar Sesión
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
