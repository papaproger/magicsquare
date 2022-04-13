// Игровое поле

import logo from './logo.svg'

type PropsType = {
    value: Array<Array<number>>
}

const MagicTable = (props: PropsType) => {

    return (
        <table className="grid">
            {props.value.map(v =>
                (<tr>{v.map((v, index) =>
                    (<td key={index}>{v === 0 ? '' :
                        v === 100 ? 'X' :
                            v === 101 ? <img src={logo} className="logo" alt="O" /> : v}</td>))}</tr>))}
        </table>
    )
}

export default MagicTable