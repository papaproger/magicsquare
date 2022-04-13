// Игровое поле

import React from "react"
import MagicCell from "./MagicCell"

type PropsType = {
    grid: Array<Array<number>>
}

const MagicTable = React.memo((props: PropsType) => {

    return (
        <table className="grid">
            {props.grid.map(v =>
                (<tr>{v.map((v, index) => <MagicCell v={v} index={index} />)}</tr>))}
        </table>
    )
})

export default MagicTable