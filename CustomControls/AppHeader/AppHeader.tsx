import { Fragment } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link, routes, navigate } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { classNames, edFeatures, getMenuEntry } from 'src/lib/common'

import Logo from './LLogo.png'

type NavBarSideLayoutProps = {
  children?: React.ReactNode
}

const AppHeader = ({ children }: NavBarSideLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()
  const features = edFeatures(process.env.REDWOOD_ENV_ED)

  const onLogoutClick = async () => {
    try {
      await logOut()
    } catch (error) {
      toast.error(error.message)
    }
    toast.success('Successfully logged out')
    navigate(routes.login())
  }

  return (
    <Disclosure as="nav" className="h-16 bg-sky-600 shadow">
      {({ open }) => (
        <>
          <div className="rw-scaffold-main bg-sky-600">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="mr-2 h-10 w-10 rounded-md"
                    src={Logo}
                    alt="Timesheet App"
                    data-testid="app-header-logo"
                  />

                  <Link
                    className="text-yellow-400 transition duration-100 hover:text-blue-100"
                    to={routes.home()}
                    data-testid="app-header-home-link"
                  >
                    Omni App
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {features.map((feature) => {
                    const menuText = getMenuEntry(feature).name
                    return (
                      <Link
                        key={menuText}
                        className="rw-navbar-top-item"
                        to={routes[feature]()}
                      >
                        {menuText}
                      </Link>
                    )
                  })}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  data-testid="app-header-view-notifications"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="relative ml-3"
                  data-testid="app-header-user-menu-root"
                >
                  <div>
                    <Menu.Button
                      className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      data-testid="app-header-user-menu"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <>
                        {isAuthenticated ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  to={routes.home()}
                                  data-testid="app-header-profile-link"
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  to={routes.home()}
                                  data-testid="app-header-settings-link"
                                >
                                  Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={onLogoutClick}
                                  data-testid="app-header-logout-link"
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  to={routes.login()}
                                  data-testid="app-header-login-link"
                                >
                                  Login
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        )}
                      </>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Home
              </Disclosure.Button> */}

              {features.map((feature) => {
                const menuText = getMenuEntry(feature).name
                return (
                  <Disclosure.Button
                    key={menuText}
                    as="a"
                    href={routes[feature]()}
                    className="rw-nav-top-menu"
                  >
                    {menuText}
                  </Disclosure.Button>
                )
              })}
            </div>
          </Disclosure.Panel>

          <main>{children}</main>
        </>
      )}
    </Disclosure>
  )
}

export default AppHeader
