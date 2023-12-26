import { useEffect, useContext } from 'react'

import { BreadcrumbsContext } from 'src/context/BreadcrumbsContext'

export const useBreadcrumbs = (breadcrumbs) => {
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)

  useEffect(() => {
    setBreadcrumbs(breadcrumbs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
