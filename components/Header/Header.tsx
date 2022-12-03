import Link from "next/link";
import React, { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import useStore from "../../zustand";
import TippyMenu from "../Tippy/TippyMenu";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useStore();

  return (
    <>
      <nav className="w-full bg-gray-800 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-4 md:block">
              <Link href="/">
                <h2 className="text-2xl font-semibold text-white my-auto">
                  Comics App
                </h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-white rounded-md outline-none"
                  onClick={() => setOpen(!open)}
                >
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                open ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 md:my-auto">
                <li className="text-white ">
                  <Link href="/">
                    <span className="text-white">TRANG CHỦ</span>
                  </Link>
                </li>
                <li className="text-white ">
                  <Link href="/follow">
                    <span className="text-white">THEO DÕI</span>
                  </Link>
                </li>
                <li className="text-white ">
                  <Link href="/history">
                    <span className="text-white">LỊCH SỬ</span>
                  </Link>
                </li>
                <li className="text-white ">
                  <Link href="/category">
                    <span className="text-white">THỂ LOẠI</span>
                  </Link>
                </li>
                <li className="text-white ">
                  <Link href="/search">
                    <span className="text-white text-2xl">
                      <AiOutlineSearch />
                    </span>
                  </Link>
                </li>
                <li className="rounded-lg">
                  {user ? (
                    <TippyMenu>
                      <img
                        className=" w-12 h-12 rounded-full"
                        src={user?.photoURL}
                        alt={user.displayName}
                      />
                    </TippyMenu>
                  ) : (
                    <Link href="/signup">
                      <span className="text-white">ĐĂNG NHẬP </span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
