// Игровое поле

type PropsType = {
    value: Array<Array<number>>
}

const MagicTable = (props: PropsType) => {

    return (
        <table className="grid">
            {props.value.map(v =>
                (<tr>{v.map((v, index) =>
                    (<td key={index}>{v === 0 ? '' : v === 100 ? 'X' : v}</td>))}</tr>))}
        </table>
    )
}

export default MagicTable