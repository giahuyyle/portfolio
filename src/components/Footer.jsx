
export const Footer = () => {
    return (
        <footer className="flex flex-col items-center justify-center w-full h-16 text-zinc-700 pb-5 space-y-2">
            <div className="flex space-x-5">
                <a
                    href="https://linkedin.com/in/huylegia"
                    target="_blank"
                    rel="noopenner noreferrer"
                >
                    <i className="pi pi-linkedin text-3xl" />
                </a>
                <a
                    href="https://github.com/giahuyyle"
                    target="_blank"
                    rel="noopenner noreferrer"
                >
                    <i className="pi pi-github text-3xl" />
                </a>
            </div>
         
            <div className="text-xs">
                &copy; {new Date().getFullYear()} Huy Le. All rights reserved.
            </div>
        </footer>
    );
};