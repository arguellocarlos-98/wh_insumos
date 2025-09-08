export const generarSQLLog = (query, params = []) => {
  const clonarParams = [...params]

  return query.replace(/\?/g, () => {
    const valor = clonarParams.shift()
    if (valor === null || valor === undefined) return 'NULL'
    if (typeof valor === 'number') return valor
    return `'${String(valor).replace(/'/g, "''")}'` // Escapa comillas simples
  })
}
