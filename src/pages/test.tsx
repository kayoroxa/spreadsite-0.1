import GridLayout from 'react-grid-layout'
import { useState, useEffect, useMemo, useCallback } from 'react'
import _ from 'lodash'
import EditInPlace from '../components/EditInPlace'
import { tryEval } from '../utils/funcsUtils'

export default function MyFirstGrid() {
  // layout is an array of objects, see the demo for more complete usage
  const [layout, setLayout] = useState([
    { code: '5+2', css: '', i: '1', x: 0, y: 0, w: 1, h: 2 }, //static: true },
    {
      code: `4+5`,
      css: '',
      view: '',
      i: '2',
      x: 1,
      y: 0,
      w: 3,
      h: 2,
    },
    { code: '', css: '', i: '3', x: 4, y: 0, w: 1, h: 2 },
    {
      code: `onClick(() => pegar(1).set.code('5+5')); return "123"`,
      css: '',
      i: '4',
      x: 4,
      y: 1,
      w: 1,
      h: 2,
    },
  ])

  new Date().toLocaleDateString('pt-br')

  function valor(id: number) {
    const celula = _.find(layout, { i: id.toString() })
    if (celula) {
      return eval(celula.code)
    } else return 'Não achou'
  }
  function pegar(id: number) {
    const celula = _.find(layout, { i: id.toString() })
    if (celula) {
      return {
        set: {
          code: (value: any) => {
            const newLayout = _.cloneDeep(layout)
            newLayout[id - 1].code = value
            setLayout(newLayout)
          },
        },
      }
    } else return ''
  }

  const [showCode, setShowCode] = useState(false)

  function handleClick(id: number) {
    const celula = _.find(layout, { i: (id + 1).toString() })
    if (celula?.code.includes('onClick')) {
      const allFuncs = celula.code.match(/onClick\((.*)\);*/g)
      if (allFuncs) {
        allFuncs.forEach(func => {
          const funcName = func.match(/onClick\((.*)\);*/)?.[1]
          if (funcName) {
            eval(`(${funcName})()`)
          }
        })
      }
    }
  }

  return (
    <div>
      <button onClick={() => setShowCode(prev => !prev)}>
        {showCode ? 'show view' : 'show code'}
      </button>
      <button
        onClick={() => {
          const newLayout = _.cloneDeep(layout)
          newLayout[0].code = '2+2'
          setLayout(newLayout)
        }}
      >
        mudar
      </button>
      <button
        onClick={() =>
          setLayout(prev => [
            ...prev,
            { code: '', css: '', i: '4', x: 0, y: 1, w: 1, h: 2 },
          ])
        }
      >
        Criar Quadrado
      </button>
      <GridLayout
        compactType="No Compaction"
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {layout.map((v, i) => {
          return (
            <div key={(i + 1).toString()} onClick={() => handleClick(i)}>
              {useMemo(() => {
                // const isShow = layout[i].code && layout[i].code[0] === ';'
                // const code = isShow
                //   ? tryEval(layout[i].code.slice(1))
                //   : layout[i].code
                const haveReturn = layout[i].code.includes('return')
                const codeSemOnClick = layout[i].code.replace(
                  /onClick\(.*\)\;*/g,
                  ''
                )
                const code = haveReturn
                  ? eval(`(() => {${codeSemOnClick}})()`)
                  : eval(codeSemOnClick)

                return (
                  <span className="text" onClick={() => handleClick(i)}>
                    {showCode ? (
                      <EditInPlace
                        breakLine={true}
                        colors={true}
                        value={layout[i].code || ''}
                        onChange={(value: string) => {
                          const newLayout = _.cloneDeep(layout)
                          newLayout[i].code = value
                          setLayout(newLayout)
                        }}
                      />
                    ) : (
                      code
                    )}
                  </span>
                )
              }, [layout[i].code, showCode])}
            </div>
          )
        })}
      </GridLayout>
    </div>
  )
}
