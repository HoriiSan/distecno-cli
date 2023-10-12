import { useEffect } from 'react';
import { useTasks } from '../context/TasksContext';

function OrderPage() {
    const { getOrders, orders, deleteOrder } = useTasks();

    useEffect(() => {
        getOrders();
    }, []);

    const newOrd = orders[0];
    //console.log(newOrd.order);

    return (
        <div>
            {orders.map((item, index) => (
                <div
                    key={index}
                    className="flex p-5 bg-zinc-800 mb-5 rounded-md"
                >
                    <div className="w-1/2">
                        <h2 className="font-bold text-2xl mb-3">
                            Datos del cliente
                        </h2>
                        <p>Nombre: {item.order.nombre}</p>
                        <p>Apellido: {item.order.apellido}</p>
                        <p>Cédula: {item.order.ci}</p>
                        <p>Teléfono: {item.order.telefono}</p>
                        <p>Estado: {item.order.estado}</p>
                        <p>Ciudad: {item.order.ciudad}</p>
                        <p>Correo: {item.order.correo}</p>
                        <p>Dirección 'Delivery': {item.order.envioDireccion}</p>
                        <p>Código de oficina: {item.order.envioCodigo}</p>
                        <p>Método de Envío: {item.order.metodoEnvio}</p>
                        <p>
                            Método de Pago:{' '}
                            {item.order.metodoPago.map((metodo) => {
                                return `${metodo}, `;
                            })}
                        </p>
                    </div>

                    <div className="w-1/2">
                        <h2 className="font-bold text-2xl mb-3">
                            Datos del pedido
                        </h2>
                        {item.cart.map((item2, index2) => (
                            <div key={index2}>
                                <p>Código de producto: {item2.product}</p>
                                <p>Cantidad: {item2.quantity}</p>
                            </div>
                        ))}
                        <h2 className="font-bold text-2xl mb-3 mt-5">
                            Fecha del pedido
                        </h2>
                        {item.createdAt}
                    </div>
                    <button
                        className="font-bold text-red-500"
                        onClick={() => {
                            deleteOrder(item._id);
                        }}
                    >
                        Borrar
                    </button>
                </div>
            ))}
        </div>
    );
}

export default OrderPage;
