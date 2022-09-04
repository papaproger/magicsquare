// Ячейка игрового поля

import React from "react"
import logo from './logo.svg'
import step from './step.svg'

type PropsType = {
    v: number
}

const MagicCell = React.memo((props: PropsType) => {

    return (
        <td>{props.v === 0 ? '' :
            props.v === 100 ? <img src={step} className="step" alt="X" /> :
                props.v === 101 ? <img src={logo} className="logo" alt="O" /> : props.v}</td>
    )
})

export default MagicCell