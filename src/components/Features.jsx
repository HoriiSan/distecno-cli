function Features({ featureValue, deleteFuntion }) {
    return (
        <div className="flex">
            <p className="mr-3">
                - {featureValue[0]}: {featureValue[1]}
            </p>
            <button onClick={deleteFuntion} className="font-bold text-red-500">
                Eliminar
            </button>
        </div>
    );
}

export default Features;
