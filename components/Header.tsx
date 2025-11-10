
import path from 'path';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.96 16.17 11 13 17 12V8z" />
        <path d="M17 8a5.207 5.207 0 0 0-3-4.99V2h-2v1.01A5.207 5.207 0 0 0 9 8h8z" />
    </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClasses = "relative text-gray-600 hover:text-primary transition-colors duration-300 font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100";
    const activeNavLinkClasses = "text-primary after:scale-x-100";

    const navLinks = [
        { path: "/", name: "Home" },
        { path: "/services", name: "Services" },
        { path: "/gallery", name: "Gallery" },
        { path: "/about", name: "About" },
        { path: "/contact", name: "Contact" },
        { path: "/blog", name: "Blog" },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm shadow-sm'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
                    <Link to="/" className="flex items-center gap-2">
                        <LeafIcon className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold text-primary">TrueLine</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                             <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                         <Link to="/booking" className="hidden sm:inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                            Book Now
                        </Link>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                           {isMenuOpen ? <CloseIcon className="w-6 h-6 text-dark-text" /> : <MenuIcon className="w-6 h-6 text-dark-text" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 flex flex-col items-center space-y-4">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => `${navLinkClasses} text-lg ${isActive ? activeNavLinkClasses : ''}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                         <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                            Book Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;