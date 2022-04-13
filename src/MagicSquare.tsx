// Магический Квадрат

import React from "react"
import {ActionType} from "./App"

type PropsType = {
    value: number
    x: number
    y: number
    preMoveHandler: (a: ActionType) => void
}

const MagicSquare = React.memo((props: PropsType) => {

    function upButtonClickHandler() {
        props.preMoveHandler('UP')
    }
    function leftButtonClickHandler() {
        props.preMoveHandler('LEFT')
    }
    function rightButtonClickHandler() {
        props.preMoveHandler('RIGHT')
    }
    function downButtonClickHandler() {
        props.preMoveHandler('DOWN')
    }

    return (
        <div className="magicsquare" style={{left:props.y*120+11, top:props.x*120+11}}>
            <div className="square1"></div>
            <div className="square2">
                <button onClick={upButtonClickHandler}>UP</button>
            </div>
            <div className="square3"></div>
            <div className="square4">
                <button onClick={leftButtonClickHandler}>L</button>
            </div>
            <div className="square5">
                <table><tr><td>{props.value}</td></tr></table>
            </div>
            <div className="square6">
                <button onClick={rightButtonClickHandler}>R</button>
            </div>
            <div className="square7"></div>
            <div className="square8">
                <button onClick={downButtonClickHandler}>DN</button>
            </div>
            <div className="square9"></div>
        </div>
    )
})

export default MagicSquare