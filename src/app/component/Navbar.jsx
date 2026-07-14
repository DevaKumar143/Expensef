"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useAuthStore from "@/store/auth.store"; 

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [hasMounted, setHasMounted] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isLoggedIn = hasMounted && !!user;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const navigation = isLoggedIn
    ? [
        { name: "Home", href: "/" },
        { name: "Add Expense", href: "/create" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Add Expense", href: "/create" },
        { name: "Signup", href: "/signup" },
        { name: "Login", href: "/login" },
      ];

  return (
    <Disclosure
      as="nav"
      className="relative bg-gray-900 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 hover:text-white"
            >
              <BellIcon className="size-6" />
            </button>

            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full">
                <img
                  className="size-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg">
                <MenuItem>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Your Profile
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                </MenuItem>

                {isLoggedIn ? (
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Login
                    </Link>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-400 hover:bg-white/5"
            >
              Logout
            </button>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}