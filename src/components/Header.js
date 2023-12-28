import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  
  return (
    <nav class="sticky z-10 w-full bg-yellow-400 md:absolute md:bg-transparent">
      <div class="container m-auto px-2 md:px-12 lg:px-7">
        <div class="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div class="w-full px-6 flex justify-between lg:w-max md:px-0">
            <Link
              to="/home"
              aria-label="logo"
              class="flex space-x-2 items-center"
            >
              <img
                src="https://tailus.io/sources/blocks/food-delivery/preview/images/icon.png"
                class="w-12"
                alt="tailus logo"
                width="144"
                height="133"
              />
              <span class="text-2xl font-bold text-yellow-900">
                Real <span class="text-yellow-700">Foodies</span>
              </span>
            </Link>

            <button
              aria-label="humburger"
              id="hamburger"
              class="relative w-10 h-10 -mr-2 lg:hidden"
            >
              <div
                aria-hidden="true"
                id="line"
                class="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transtion duration-300"
              ></div>
              <div
                aria-hidden="true"
                id="line2"
                class="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transtion duration-300"
              ></div>
            </button>
          </div>

          <div class="hidden w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
            <div class="text-gray-600 lg:pr-4">
              <ul class="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                <li>
                  <Link
                    to="/about"
                    class="block md:px-4 transition hover:text-yellow-700"
                  >
                    <span>About</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    class="block md:px-4 transition hover:text-yellow-700"
                  >
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div class="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l flex gap-2">
              <button
                onClick={() => navigate('/signup')}
                type="button"
                title="Create Account"
                class=" ml-2 w-full py-2 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
              >
                <span class="block text-yellow-800 font-semibold text-sm">
                  Sign up
                </span>
              </button>
              <button
                onClick={() => navigate('/login')}
                type="button"
                title="Login"
                class="w-full py-2 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
              >
                <span class="block text-yellow-900 font-semibold text-sm">
                  Login
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
