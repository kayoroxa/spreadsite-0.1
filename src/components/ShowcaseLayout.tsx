import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import generateLayout from './generateLayout'

interface IProps {
  className: string
  rowHeight: number
  onLayoutChange: (layout: any, layouts: any) => void
  cols: { lg: number; md: number; sm: number; xs: number; xxs: number }
  initialLayout: Function
  fixed: boolean
}

interface GenerateLayout {
  x: number
  y: number
  w: number
  h: number
  i: string
  static: boolean
}

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
  layouts: any
}

export default function ShowcaseLayout(props: IProps) {
  const [state, setState] = useState<State>({
    currentBreakpoint: 'lg',
    compactType: 'No Compaction',
    mounted: false,
    layouts: { lg: props.initialLayout },
  })
  // const [fixed, setFixed] = useState(false)

  function componentDidMount() {
    setState(prev => ({ ...prev, mounted: true }))
  }

  const dom = useMemo(() => {
    return _.map(state.layouts.lg, function (l, i) {
      return (
        <div key={i} className={props.fixed ? 'static' : ''}>
          {props.fixed ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      )
    })
  }, [state.layouts.lg, props.fixed])

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

  function onLayoutChange(layout: any, layouts: any) {
    props.onLayoutChange(layout, layouts)
  }

  // function onNewLayout() {
  //   setState(prev => ({ ...prev, layouts: { lg: generateLayout() } }))
  // }

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
      {/* <button onClick={onNewLayout}>Generate New Layout</button> */}
      {/* <button onClick={onCompactTypeChange}>Change Compaction Type</button> */}
      <ResponsiveReactGridLayout
        {...props}
        layouts={state.layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={state.mounted}
        compactType={state.compactType}
        preventCollision={!state.compactType}
      >
        {dom}
      </ResponsiveReactGridLayout>
    </div>
  )
}
