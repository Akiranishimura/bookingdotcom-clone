/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
  Dialog,
  Disclosure,
  PopoverGroup,
  Popover,
  Transition,
  PopoverButton,
  PopoverPanel,
  DialogPanel,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Book a Stay",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: HomeIcon,
  },
  {
    name: "Book a Flight",
    description: "Speak directly to your customers",
    href: "#",
    icon: PaperAirplaneIcon,
  },
  {
    name: "Contact our Support Team",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: ChatBubbleLeftIcon,
  },
];
const callsToAction = [
  { name: "See Demo Booking", href: "#", icon: PlayCircleIcon },
  { name: "Contact Support", href: "#", icon: PhoneIcon },
];

const otherItems = [
  {
    name: "Flights",
    href: "#",
  },
  {
    name: "Car Rentals",
    href: "#",
  },
  {
    name: "Attractions",
    href: "#",
  },
  {
    name: "Flight + Hotel",
    href: "#",
  },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-bkBlue">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">Booking.com</span>
            <img
              className="h-12 w-auto"
              src="https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w"
              alt=""
            />
          </Link>
        </div>
        {/* humb menu */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"></Bars3Icon>
          </button>
        </div>
        {/* pc menu */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton
              className={
                "flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              }
            >
              Stays
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-white"
                aria-hidden="true"
              />
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center roundee-lg bg-gray-50 group-hover:bg-gray-200">
                        <item.icon
                          className="h-6 w-6 text-bkBlue group-hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-bkBlue"
                        >
                          {item.name}
                          <span className="absolute inset-0"></span>
                        </a>
                        <p className="mt-1 text-bkBlue">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013B94] hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-[#013B94]"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
          {otherItems.map((item) => (
            <div key={item.name}>
              <a
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </a>
            </div>
          ))}
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Login <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10">
          <DialogPanel
            className={
              "fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-bkBlue px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            }
          >
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Booking.com</span>
                <img
                  className="h-8 w-auto"
                  src="https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true"></XMarkIcon>
              </button>
            </div>
            <div className="mt-5 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                          Stays
                          <ChevronDownIcon
                            className={cn(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {[...products, ...callsToAction].map((item) => (
                            <DisclosureButton
                              key={item.name}
                              as="a"
                              href={item.href}
                              className={
                                "block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-blue-800"
                              }
                            >
                              {item.name}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                  {otherItems.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800"
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}

                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-blue-800"
                    >
                      Log In
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}

export default Header;
