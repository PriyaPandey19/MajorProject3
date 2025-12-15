import React from "react";
import {Link} from "react-router-dom"

const Navbar = () =>{
    return(
    <nav className="w-full py-5 px-8 flex items-center justify-between bg-black">
      {/* left log */}

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"></div>
        <h1 className="text-white font-semibold text-lg">Product Video <span className="text-gray-400">Example.com</span></h1>
         </div>

        {/* right menu */}
        <div className="flex items-center gap-8 text-white text-sm">
           <a href="/#features" className="hover:text-gray-300 transition">Features</a>
           <a href="/#blog" className="hover:text-gray-300 transition">Blog</a>
           <a href="/login" className="hover:text-gray-300 transition">Login</a>
           <a href="/portfolio" className="hover:text-gray-300 transition">Portfolio Generator</a>

            <button className="px-5 py-2 rounded-md font-medium text-white bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 hover:opacity-80 tarnsition">Get free access</button>

        </div>
     
    </nav>
    )
}
export default Navbar;