import GridLayout from 'react-grid-layout'
import { useState, useEffect, useMemo, useCallback } from 'react'
import _ from 'lodash'
import EditInPlace from '../components/EditInPlace'
export default function MyFirstGrid() {
  // layout is an array of objects, see the demo for more complete usage
  const [layout, setLayout] = useState([
    { code: '5+2', css: '', i: '1', x: 0, y: 0, w: 1, h: 2 }, //static: true },
    {
      code: '(() => {pegar(1).set.code("5+3"); return "oi";})()',
      css: '',
      view: '',
      i: '2',
      x: 1,
      y: 0,
      w: 3,
      h: 2,
      minW: 2,
      maxW: 4,
    },
    { code: '', css: '', i: '3', x: 4, y: 0, w: 1, h: 2 },
  ])

  function valor(id: number) {
    const celula = _.find(layout, { i: id.toString() })
    console.log(celula)
    if (celula) {
      return eval(celula.code)
    } else return 'Não achou'
  }
  function pegar(id: number) {
    console.log('pegar')
    const celula = _.find(layout, { i: id.toString() })
    if (celula) {
      return {
        set: {
          code: (value: any) => {
            const newLayout = _.cloneDeep(layout)
            newLayout[0].code = value
            setLayout(newLayout)
            console.log('code')
          },
        },
      }
    } else return ''
  }

  useEffect(() => {
    console.log(layout[1].code)
  }, [layout[1].code])

  const [showCode, setShowCode] = useState(false)
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
            { code: 'asd', css: '', i: '3', x: 0, y: 1, w: 1, h: 2 },
          ])
        }
      >
        Criar Quadrado
      </button>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {layout.map((v, i) => {
          return (
            <div key={(i + 1).toString()}>
              {useMemo(() => {
                const isShow = layout[i].code && layout[i].code[i] === '='
                // const code = isShow
                //   ? eval(layout[i].code.slice(1))
                //   : layout[i].code
                const haveReturn = layout[i].code.includes('return')
                const code = haveReturn
                  ? eval(`(() => {${layout[i].code}})()`)
                  : eval(layout[i].code)
                return (
                  <span className="text">
                    {showCode ? (
                      <EditInPlace
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
