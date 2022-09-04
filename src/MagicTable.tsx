// Игровое поле

import React from "react"
import MagicCell from "./MagicCell"

type PropsType = {
    grid: Array<Array<number>>
}

const MagicTable = React.memo((props: PropsType) => {

    return (
        <table className="grid">
            <tbody>
                {props.grid.map((v, i) =>
                    (<tr key={i}>{v.map((v, j) => <MagicCell key={`${i}-${j}`} v={v} />)}</tr>))}
            </tbody>
        </table>
    )
})

export default MagicTable