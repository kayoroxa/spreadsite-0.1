import { GenerateLayout } from './../type/types'
import _ from 'lodash'

export default function generateLayout(): GenerateLayout[] {
  const retornar = [
    {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: '1',
      code: '2*4',
    },
    {
      x: 1,
      y: 0,
      w: 4,
      h: 1,
      i: '2',
    },
  ]
  console.log(retornar)

  return retornar
}
