export const generarSQLLog = (query, params = []) => {
  if (typeof query !== 'string') {
    return `[Query inválida: ${JSON.stringify(query)}]`
  }

  const clonarParams = [...params]
  return query.replace(/\?/g, () => {
    const valor = clonarParams.shift()
    if (valor === null || valor === undefined) return 'NULL'
    if (typeof valor === 'number') return valor
    return `'${String(valor).replace(/'/g, "''")}'`
  })
}
