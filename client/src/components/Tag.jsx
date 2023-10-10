function Tag({ tag, deleteFuntion }) {
    return (
        <div className="flex">
            <p className="mr-3">- {tag}</p>
            <button onClick={deleteFuntion} className="font-bold text-red-500">
                Eliminar
            </button>
        </div>
    );
}

export default Tag;
