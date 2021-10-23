import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import EditInPlace from './EditInPlace'
import GridLayout from 'react-grid-layout'
import generateLayout from './generateLayout'
import { IShowcaseLayout, GenerateLayout } from '../type/types'

ShowcaseLayout.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: generateLayout(),
  fixed: false,
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
}

interface State {
  compactType: 'No Compaction' | 'horizontal' | 'vertical' | null | undefined
  currentBreakpoint: string
  mounted: boolean
  layouts: { lg: GenerateLayout[] }
}

export default function ShowcaseLayout(props: IShowcaseLayout) {
  const [state, setState] = useState<State>({
    currentBreakpoint: 'lg',
    compactType: 'No Compaction',
    mounted: false,
    layouts: { lg: props.initialLayout },
  })
  const [showCode, setShowCode] = useState(false)
  // const [fixed, setFixed] = useState(false)

  function componentDidMount() {
    setState(prev => ({ ...prev, mounted: true }))
  }

  const dom = useMemo(() => {
    return _.map(state.layouts.lg, function (__, i) {
      const code = state.layouts.lg[i]?.code
      return (
        <div key={(i + 1).toString()} className={props.fixed ? 'static' : ''}>
          {props.fixed ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i + 1}
            </span>
          ) : (
            <div>
              <span className="text">
                {showCode ? (
                  <EditInPlace
                    value={code || ''}
                    onChange={(value: string) => {
                      const layouts = _.cloneDeep(state.layouts)
                      layouts.lg[i].code = value
                      setState(prev => ({ ...prev, layouts }))
                    }}
                  />
                ) : (
                  code && eval(code)
                )}
              </span>
            </div>
          )}
        </div>
      )
    })
  }, [state.layouts.lg, showCode])

  function onBreakpointChange(breakpoint: string) {
    setState(prev => ({
      ...prev,
      currentBreakpoint: breakpoint,
    }))
  }

  function onCompactTypeChange() {
    const { compactType: oldCompactType } = state
    const compactType =
      oldCompactType === 'horizontal'
        ? 'vertical'
        : oldCompactType === 'vertical'
        ? null
        : 'horizontal'
    if (compactType) setState(prev => ({ ...prev, compactType }))
  }

  function onLayoutChange(layout: any) {
    props.onLayoutChange(layout)
  }

  function stringifyLayout() {
    return state.layouts.lg.map(function (l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      )
    })
  }

  return (
    <div>
      <div>
        Current Breakpoint: {state.currentBreakpoint} (
        {/* {props.cols[state.currentBreakpoint]} columns) */}
      </div>
      <div>{JSON.stringify(props.fixed)}</div>
      <div>
        Compaction type:{' '}
        {state.compactType ? _.capitalize(state.compactType) : 'No Compaction'}
      </div>
      <div>{stringifyLayout()}</div>
      <button onClick={() => setShowCode(prev => !prev)}>
        {showCode ? 'show visual' : 'show code'}
      </button>
      {/* <button onClick={onNewLayout}>Generate New Layout</button> */}
      {/* <button onClick={onCompactTypeChange}>Change Compaction Type</button> */}
      <GridLayout
        className="layout"
        layout={state.layouts.lg}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        compactType={state.compactType}
      >
        {dom}
      </GridLayout>
    </div>
  )
}
