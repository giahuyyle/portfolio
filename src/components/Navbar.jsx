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
        <nav className="fixed w-full flex z-40 items-center justify-center bg-transparent backdrop-blur-md border-b border-zinc-200/50 px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
                <div className="flex space-x-3 sm:space-x-10 font-semibold">
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