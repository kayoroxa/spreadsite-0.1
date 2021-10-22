import styled from 'styled-components'
import mySheet from '../../mySheet.js'
import _ from 'lodash'
import { useEffect } from 'react'

const IndexStyle = styled.div`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;

    width: 100vw;
    height: 100vh;

    .grid-item {
      border: 1px solid black;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      padding: 0.5rem;
      background-color: #f5f5f5;
      color: #000;
      font-family: 'Roboto', sans-serif;
    }
    .grid-item:hover {
      background-color: #000;
      color: #f5f5f5;
      cursor: pointer;
    }

    /* grid-template-columns: 12px 12px 12px;
grid-template-rows: 12px 12px 12px; */
  }
`
interface IMySheet {
  group: string[]
  value: string
}

const generateGrid = (grid: IMySheet[]) => {
  return grid.map((cell, i) => {
    return (
      <div
        key={i}
        className="grid-item"
        onClick={() => console.log(cell.value)}
        style={{ gridArea: "'" + cell.group.join('') + "'" }}
      >
        {cell.value}
      </div>
    )
  })
}

const generateLetterGrid = (letters: string[], numberHorizontal: number) => {
  const grid = letters.map(letter => {
    return Array(numberHorizontal)
      .fill('')
      .map((_, i) => letter + (i + 1))
  })
  return grid
}

export default function Home() {
  useEffect(() => {
    const element = document.querySelector<HTMLElement>('.container')
    if (element) {
      const template = _.chunk(mySheet, 10)
        .map((row: IMySheet[]) => {
          return '"' + row.map(col => col.group.join('')).join(' ') + '"'
        })
        .join(' ')
      console.log({ template })
      element.style.gridTemplateAreas = "'" + template + "'"
    }
  }, [])

  // const grid = generateLetterGrid(mySheet)
  // const grid = generateLetterGrid(
  //   ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
  //   10
  // )

  return (
    <IndexStyle>
      <div className="container">{generateGrid(mySheet)}</div>
    </IndexStyle>
  )
}
