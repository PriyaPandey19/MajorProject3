import React, { useState } from "react";
import {Link} from "react-router-dom"

const Navbar = () =>{
    // 1. Add state to track menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
    // 2. Add 'relative' and 'z-10' to the nav for absolute positioning
    <nav className="w-full py-5 px-8 flex items-center justify-between bg-black relative z-10">
      
        {/* left log */}
        <div className="flex items-center gap-2 z-20"> 
          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"></div>
          <h1 className="text-white font-semibold text-lg">Product Video <span className="text-gray-400">Example.com</span></h1>
        </div>

        {/* right menu: DESKTOP MENU (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-8 text-white text-sm">
          <a href="/#features" className="hover:text-gray-300 transition">Features</a>
          <a href="/#blog" className="hover:text-gray-300 transition">Blog</a>
          <a href="/login" className="hover:text-gray-300 transition">Login</a>
          <a href="/portfolio" className="hover:text-gray-300 transition">Portfolio Generator</a>
          <button className="px-5 py-2 rounded-md font-medium text-white bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 hover:opacity-80 transition">Get free access</button>
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="text-white text-xl lg:hidden z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // 👈 Toggle menu state on click
        >
            {/* Show X when open, Bars when closed */}
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
        
        {/* MOBILE MENU DROPDOWN - Conditional styling */}
        <div
            className={`
                absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700
                flex flex-col items-start p-4 space-y-3 lg:hidden transition-all duration-300
                ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} 
            `}
            onClick={() => setIsMenuOpen(false)} // Auto-close on link click
        >
            <a href="/#features" className="text-white hover:text-gray-300 transition w-full p-2 rounded-md hover:bg-gray-800">Features</a>
            <a href="/#blog" className="text-white hover:text-gray-300 transition w-full p-2 rounded-md hover:bg-gray-800">Blog</a>
            <a href="/login" className="text-white hover:text-gray-300 transition w-full p-2 rounded-md hover:bg-gray-800">Login</a>
            <a href="/portfolio" className="text-white hover:text-gray-300 transition w-full p-2 rounded-md hover:bg-gray-800">Portfolio Generator</a>
            <button className="w-full mt-4 px-5 py-2 rounded-md font-medium text-white bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 hover:opacity-80 transition">Get free access</button>
        </div>
      
    </nav>
    )
}
export default Navbar;