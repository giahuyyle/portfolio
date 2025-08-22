import { useState, useEffect } from "react";

const navItems = [
    { name: "home", href: "/#hero" },
    { name: "projects", href: "/#projects" },
    { name: "skills", href: "/#skills" },
    { name: "experience", href: "/#experience" },
    { name: "contact", href: "/#contact" },
];

export const Navbar = () => {
    return (
        <nav className="fixed w-full z-40 flex items-center justify-center">
            <div className="flex items-center justify-between mt-5 border-[0.75px] rounded-full px-5 py-2 transition-all duration-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
                <div className="flex space-x-3 sm:space-x-5">
                    {navItems.map((item, key) => (
                        <a
                            key={key}
                            href={item.href}
                            className="text-zinc-700 hover:text-zinc-900 text-sm sm:text-base"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};