export const standard = (tableHeaders, totalHeader = 50, totalRow = 2) => {
  const rows = []

  for (let j = 0; j <= totalRow; j++) {
    let rowObj

    for (let i = 0; i <= totalHeader; i++) {
      const header = tableHeaders[i].fieldName
      rowObj = { ...rowObj, [header]: 'test-data-' + j + '-' + i }
    }

    rows.push(rowObj)
  }

  return rows
}

export const tableHeaders = (totalHeader = 50): Object[] => {
  const headers = []
  for (let i = 0; i <= totalHeader; i++) {
    if (i === 0) {
      headers.push({
        headerTitle: 'Header' + i,
        fieldName: 'header' + i,
        isStackupTop: true,
      })
    } else if (i > 0 && i < 3) {
      headers.push({
        headerTitle: 'Header' + i,
        fieldName: 'header' + i,
        isStackup: true,
      })
    } else if (i === 3) {
      headers.push({
        headerTitle: 'Header' + i,
        fieldName: 'header' + i,
        afterStackup: true,
      })
    } else {
      headers.push({
        headerTitle: 'Header' + i,
        fieldName: 'header' + i,
      })
    }
  }

  return headers
}
