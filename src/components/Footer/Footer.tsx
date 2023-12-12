import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col text-white text-center bg-slate-800">
      <div className="p2">
        <div className=" mb-md-0">
          <ul className="flex flex-row gap-4 justify-center">
            <li>
              <a
                href="https://linkedin.com/in/dejan-ivkovski"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://github.com/DekoIvko"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center p-2">© 2023 Copyright</div>
    </footer>
  );
};

export default Footer;
