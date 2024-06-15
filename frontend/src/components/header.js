/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

//<Header user={user} />

export default function Header(user) {
  console.log(user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/">
            <div class="text-white w-14 h-14">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 59 56">
                <path fill="currentColor" d="m0 7.667 1.82-1.81V1.81L3.64 0H59l-1.82 1.81v4.046l-1.82 1.81h-13.6l-3.64 3.62V44.19L36.3 46h-7.71l1.82-1.81V11.287l3.64-3.62z"></path>
                <path fill="currentColor" d="m41.66 10-1.83 1.81v42.38L38 56h7.754l1.83-1.81V31.195L49.414 33v21.19L47.585 56h7.754l1.831-1.81V11.81L59 10H41.661m7.755 15.336-1.831-1.813v-5.857h1.83zM3.66 10l-1.83 1.81v42.38L0 56h7.754l1.83-1.81V33.009l1.83-1.81v22.99L9.585 56h7.754l1.831-1.81V11.81L21 10zm5.924 7.667h1.83v5.862l-1.83 1.81z"></path>
                <path fill="currentColor" d="M38 48.333v5.857L36.185 56H19l1.814-1.81V11.81L22.63 10h7.685L28.5 11.81v32.903l-3.63 3.62z"></path>
              </svg>
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-white">
            HOME
          </a>
          <a href="/vip" className="text-sm font-semibold leading-6 text-white">
            VIP
          </a>
          <a href="/news" className="text-sm font-semibold leading-6 text-white">
            NOTÍCIAS
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            COMO JOGAR
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            CONTATO
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold leading-6 text-white">
            ENTRAR <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/">
              <div class="text-white w-14 h-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 59 56">
                  <path fill="currentColor" d="m0 7.667 1.82-1.81V1.81L3.64 0H59l-1.82 1.81v4.046l-1.82 1.81h-13.6l-3.64 3.62V44.19L36.3 46h-7.71l1.82-1.81V11.287l3.64-3.62z"></path>
                  <path fill="currentColor" d="m41.66 10-1.83 1.81v42.38L38 56h7.754l1.83-1.81V31.195L49.414 33v21.19L47.585 56h7.754l1.831-1.81V11.81L59 10H41.661m7.755 15.336-1.831-1.813v-5.857h1.83zM3.66 10l-1.83 1.81v42.38L0 56h7.754l1.83-1.81V33.009l1.83-1.81v22.99L9.585 56h7.754l1.831-1.81V11.81L21 10zm5.924 7.667h1.83v5.862l-1.83 1.81z"></path>
                  <path fill="currentColor" d="M38 48.333v5.857L36.185 56H19l1.814-1.81V11.81L22.63 10h7.685L28.5 11.81v32.903l-3.63 3.62z"></path>
                </svg>
              </div>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  HOME
                </a>
                <a
                  href="/vip"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  VIP
                </a>
                <a
                  href="/news"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  NOTÍCIAS
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  COMO JOGAR
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  CONTATO
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  ENTRAR <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
