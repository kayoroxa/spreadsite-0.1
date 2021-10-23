export function tryEval(code: string): any {
  try {
    return eval(code)
  } catch (e) {
    return e
  }
}
