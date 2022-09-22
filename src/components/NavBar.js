import React from "react";

function NavBar() {
  return (
    <nav className="bg-[#000000bb]">
      <div className="container flex items-center justify-between h-16 xl:h-16 sm:h-16 md:16">
        <a href="#1" className="flex items-center cursor-pointer">
          <span className="self-center text-3xl font-semibold text-lime-50 ">
            uz news
          </span>
        </a>

        <ul className="flex">
          <li className="mx-5 text-white text-2xl">
            <a href="3#">home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
