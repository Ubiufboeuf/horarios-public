export function getFinalObject (ob) {
  const finalObject = []
  let prev = ''
  for (const d in ob) {
    const dia = ob[d]
    const horas = []
    for (const h in dia.horas) {
      const hora = dia.horas[h]
      if (hora === '') {
        // continue
        horas[h] = { hora: 'recreo' }
      } else if (hora === '(vacío)') {
        horas[h] = { hora: '' }
      } else {
        if (prev === hora && horas[h-2]?.hora === hora) {
          horas[h-2] = { hora, span: 3 }
        } else if (prev === hora) {
          horas[h-1] = { hora, span: 2 }
        } else {
          horas[h] = { hora }
        }
      }
      prev = hora
    }
    prev = ''
    finalObject[d] = { dia: dia.dia, horas }
  }
  return finalObject
}