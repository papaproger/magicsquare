//******************************************//
//                                          //
//       "Magic Square" by PapaProger       //
//   (игра, в которой можно и не выиграть)  //
//                                          //
//          version 1.1 13.04.2022          //
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
  // разрешено ли движение
  canMove: boolean
}

// Типы перемещений
type ActionType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

// Генерирует число в заданном диапазоне
function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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

// Массив значений клеток игрового поля
let grid = getNumberedGrid(magicTable)

//----------------------------------------------------------------------------------------------------//

const App = () => {

  // Инициализация состояния Магического Квадрата
  let [magicSquare, setMagicSquare] = useState<MagicSquareType>({rowGridNumber: 6, columnGridNumber: 9,
    value: getRandomValue(magicTable.minValue, magicTable.maxValue), x: 0, y: 0, canMove: false})

  // По нажатию кнопки Вверх
  function UpButtonClickHandler()  {
    setMagicSquare(MoveHandler(magicSquare, 'UP'))
  }
  
  // По нажатию кнопки Влево
  function LeftButtonClickHandler() {
    setMagicSquare(MoveHandler(magicSquare, 'LEFT'))
  }
  
  // По нажатию кнопки Вправо
  function RightButtonClickHandler() {
    setMagicSquare(MoveHandler(magicSquare, 'RIGHT'))
  }
  
  // По нажатию кнопки Вниз
  function DownButtonClickHandler() {
    setMagicSquare(MoveHandler(magicSquare, 'DOWN'))
  }

  // Обработчик перемещений
  function MoveHandler (ms: MagicSquareType, action: ActionType) {

    let msc = {...ms} // плохо

    switch(action) {

      case 'UP': {
        if (ms.value > 0 && ms.x > 0 && grid[ms.x - 1][ms.y] < 100) {

          msc.x = ms.x - 1
          msc.y = ms.y
          msc.canMove = true
        }
        break
      }

      case 'LEFT': {
        if (ms.value > 0 && ms.y > 0 && grid[ms.x][ms.y - 1] < 100) {

          msc.x = ms.x
          msc.y = ms.y - 1
          msc.canMove = true
        }
        break
      }

      case 'RIGHT': {
        if (ms.value > 0 && ms.y < ms.columnGridNumber - 1
          && grid[ms.x][ms.y + 1] < 100) {
    
            msc.x = ms.x
            msc.y = ms.y + 1
            msc.canMove = true
          }
        break
      }
      
      case 'DOWN': {
        if (ms.value > 0 && ms.x < ms.rowGridNumber - 1
          && grid[ms.x + 1][ms.y] < 100) {
          
            msc.x = ms.x + 1
            msc.y = ms.y
            msc.canMove = true
          }
        break
      }
    }
    
    if(msc.canMove) {
      
      msc.value = msc.value + grid[msc.x][msc.y] - 1
      grid[msc.x][msc.y] = 0
      grid[ms.x][ms.y] = 100
      msc.canMove = false
      
      return msc
    }
    
    return ms
}

  // Отрисовка
  return (
    <div className="App">

      <MagicTable value={grid} />
      <MagicSquare value={magicSquare.value}
      x={magicSquare.x}
      y={magicSquare.y}
      upButtonClickHandler={UpButtonClickHandler}
      leftButtonClickHandler={LeftButtonClickHandler}
      rightButtonClickHandler={RightButtonClickHandler}
      downButtonClickHandler={DownButtonClickHandler} />
      
    </div>
  )
}

export default App