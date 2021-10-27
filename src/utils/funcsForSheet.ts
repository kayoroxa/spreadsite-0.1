export function tryEval(code: string) {
  try {
    return eval(code.replace(/^=/g, ''))
  } catch (e: any) {
    return e.message
  }
}
