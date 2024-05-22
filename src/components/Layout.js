// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';


const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-primary-light text-primary-dark">
            {/* Navigation Bar */}
            <nav className="bg-primary-dark text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold">Your Logo</Link>

                    {/* Navigation links */}
                    <ul className="flex">
                        <li className="ml-4">
                            <Link to="/" className="hover:text-gray-300">Home</Link>
                        </li>
                        <li className="ml-4">
                            <Link to="/about" className="hover:text-gray-300">About</Link>
                        </li>
                        {/* Add more navigation links */}
                    </ul>
                </div>
            </nav>
            
            {/* Content Area */}
            <main className="container mx-auto flex-grow py-8">
                {children}
            </main>
            
            {/* Footer */}
            <footer className="bg-primary-dark text-white p-4">
                <div className="container mx-auto">
                    {/* Footer content */}
                </div>
            </footer>
        </div>
    );
};

export default Layout;
