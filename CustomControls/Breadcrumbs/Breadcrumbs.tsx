import { useContext } from 'react'

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

import { BreadcrumbsContext } from 'src/context/BreadcrumbsContext'

type BreakcrumbsProps = {
  children?: React.ReactNode
}

const Breadcrumbs = ({ children }: BreakcrumbsProps) => {
  const { breadcrumbs } = useContext(BreadcrumbsContext)

  return (
    <>
      <nav className="rw-scaffold-main flex h-16" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-500"
                data-testid="breadcrumbs-item-root"
              >
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Omni App</span>
              </a>
            </div>
          </li>
          {breadcrumbs &&
            Array.isArray(breadcrumbs) &&
            breadcrumbs.map((page) => (
              <li key={page.name} data-testid={`breadcrumbs-item-` + page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {page.current ? (
                    <>
                      <button
                        onClick={() => {}}
                        className="rw-breadcrumb-link cursor-not-allowed"
                        aria-current={undefined}
                      >
                        {page.name}
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={page.href}
                        className="rw-breadcrumb-link"
                        aria-current={'page'}
                        data-testid={`breadcrumbs-link-` + page.name}
                      >
                        {page.name}
                      </a>
                    </>
                  )}
                </div>
              </li>
            ))}
        </ol>
      </nav>
      {children}
    </>
  )
}

export default Breadcrumbs
