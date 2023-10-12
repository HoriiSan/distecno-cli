function PathImage({ path, deleteFuntion }) {
    return (
        <div className="flex">
            <p className="mr-3">- {path}</p>
            <button onClick={deleteFuntion} className="font-bold text-red-500">
                Eliminar
            </button>
        </div>
    );
}

export default PathImage;
