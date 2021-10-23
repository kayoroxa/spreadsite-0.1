export function tryEval(code: string): any {
  const haveReturn = code.includes('return')
  try {
    return haveReturn ? eval(`(() => {${code}})()`) : eval(code)
  } catch (e) {
    return e
  }
}
