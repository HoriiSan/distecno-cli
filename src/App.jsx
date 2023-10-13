import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContex';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import Navbar from './components/Navbar';
import OrderPage from './pages/OrderPage';

function App() {
    return (
        <AuthProvider>
            <TaskProvider>
                <HashRouter>
                    <main className="container mx-auto px1">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/tasks" element={<TasksPage />} />
                                <Route
                                    path="/add-task"
                                    element={<TaskFormPage />}
                                />
                                <Route
                                    path="/tasks/:id"
                                    element={<TaskFormPage />}
                                />
                                <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                />
                                <Route path="/orders" element={<OrderPage />} />
                            </Route>
                        </Routes>
                    </main>
                </HashRouter>
            </TaskProvider>
        </AuthProvider>
    );
}

export default App;
