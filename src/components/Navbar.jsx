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
        <nav className="fixed w-full flex z-40 items-center justify-center">
            <div className="flex items-center justify-between mt-5">
                <div className="flex space-x-3 sm:space-x-5 font-semibold">
                    {navItems.map((item, key) => (
                        <a
                            key={key}
                            href={item.href}
                            className="text-zinc-700/9- hover:text-zinc-500 text-sm sm:text-base cursor-pointer"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};