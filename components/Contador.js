const Contador = () => {
    const [contador, setContador] = React.useState(0);

    const aumentar = () => setContador(contador + 1);
    const disminuir = () => setContador(contador - 1);
    return (
        <div>
            <h1>Contador: <span className={contador < 0 ? 'menor' : 'mayor'}>{contador}</span></h1>
            <hr/>
            <button onClick={aumentar}>Aumentar</button>
            <button onClick={disminuir}>Disminuir</button>
        </div>
    )
}