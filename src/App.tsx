//******************************************//
//                                          //
//       "Magic Square" by PapaProger       //
//   (игра, в которой можно и не выиграть)  //
//                                          //
//          version 1.2 14.04.2022          //
//                                          //
//******************************************//

import React, {useState} from 'react'
import './App.css'
import MagicSquare from './MagicSquare'
import MagicTable from './MagicTable'

// Определение типа игрового поля
type MagicTableType = {
  // число строк и столбцов соответственно
  rowGridNumber: number
  columnGridNumber: number
  // диапазон значений ходов
  minValue: number
  maxValue: number
  // число запасных ходов
  papaGivesAdditionalSteps: number
  // число блоков непроходимости
  papaBlocksYourWayOff: number
}

// Задание параметров игрового поля
let magicTable: MagicTableType = {
  rowGridNumber: 6,
  columnGridNumber: 9,
  minValue: 3,
  maxValue: 15,
  papaGivesAdditionalSteps: 7,
  papaBlocksYourWayOff: 5,
}

// Определение типа Магического Квадрата
type MagicSquareType = {
  // дублируют поля, задаваемые в игровом поле (колхоз)
  rowGridNumber: number
  columnGridNumber: number
  // число оставшихся ходов
  value: number
  // count from 0
  x: number // horizontal, row
  y: number // vertical, column
  // разрешено ли движение; не использую для коллбэков; для обработчика перемещений;
  canMove: boolean
}

// Типы перемещений
export type ActionType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

// Генерирует число в заданном диапазоне
function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min /* + 1 */
}

// Установка значений клеток игрового поля
function getNumberedGrid(mt: MagicTableType): Array<Array<number>> {

  let masterArray = new Array<Array<number>>(mt.rowGridNumber)
  let slaveArray = new Array<number>(mt.columnGridNumber)

  for (let i = 0; i < mt.rowGridNumber; i++) {
    for (let j = 0; j < mt.columnGridNumber; j++) {
      slaveArray[j] = 0
    }
    masterArray[i] = [...slaveArray] // (!)
  }

  for(let i = 1; i <= mt.papaGivesAdditionalSteps; i++) {
    masterArray[getRandomValue(0, mt.rowGridNumber - 1)][getRandomValue(0, mt.columnGridNumber - 1)] = getRandomValue(mt.minValue, mt.maxValue)
  }

  for(let i = 1; i <= mt.papaBlocksYourWayOff; i++) {
    masterArray[getRandomValue(0, mt.rowGridNumber - 1)][getRandomValue(0, mt.columnGridNumber - 1)] = 101
  }

  masterArray[0][0] = 0 // не парясь
  return masterArray
}

//----------------------------------------------------------------------------------------------------//

const App = () => {

  // Инициализация массива значений клеток игрового поля и состояния Магического Квадрата
  let [[grid, magicSquare], setGameParams] = useState<[Array<Array<number>>, MagicSquareType]>([
    getNumberedGrid(magicTable),
    {
      rowGridNumber: magicTable.rowGridNumber,
      columnGridNumber: magicTable.columnGridNumber,
      value: getRandomValue(magicTable.minValue, magicTable.maxValue),
      x: 0,
      y: 0,
      canMove: false
    }
  ])

  // Передаем тип движения в обработчик перемещений
  function preMoveHandler(a: ActionType): void {
    setGameParams(MoveHandler(grid, magicSquare, a))
  }

  // Обработчик перемещений
  function MoveHandler (g: Array<Array<number>>, ms: MagicSquareType, action: ActionType):
    [Array<Array<number>>, MagicSquareType] {

    // плохо
    let gc = [...g]
    let msc = {...ms}

    switch(action) {

      case 'UP': {
        if (ms.value > 0 && ms.x > 0 && g[ms.x - 1][ms.y] < 100) {

          msc.x = ms.x - 1
          msc.y = ms.y
          msc.canMove = true
        }
        break
      }

      case 'LEFT': {
        if (ms.value > 0 && ms.y > 0 && g[ms.x][ms.y - 1] < 100) {

          msc.x = ms.x
          msc.y = ms.y - 1
          msc.canMove = true
        }
        break
      }

      case 'RIGHT': {
        if (ms.value > 0 && ms.y < ms.columnGridNumber - 1
          && g[ms.x][ms.y + 1] < 100) {
    
            msc.x = ms.x
            msc.y = ms.y + 1
            msc.canMove = true
          }
        break
      }
      
      case 'DOWN': {
        if (ms.value > 0 && ms.x < ms.rowGridNumber - 1
          && g[ms.x + 1][ms.y] < 100) {
          
            msc.x = ms.x + 1
            msc.y = ms.y
            msc.canMove = true
          }
        break
      }
    }
    
    if(msc.canMove) {
      
      msc.value += g[msc.x][msc.y] - 1
      gc[msc.x][msc.y] = 0
      gc[ms.x][ms.y] = 100
      msc.canMove = false
      
      return [gc, msc]
    }
    
    return [g, ms]
}

  // Отрисовка
  return (
    <div className="App">

      <MagicTable grid={grid} />
      <MagicSquare value={magicSquare.value}
      x={magicSquare.x}
      y={magicSquare.y}
      preMoveHandler={preMoveHandler} />
      
    </div>
  )
}

export default App