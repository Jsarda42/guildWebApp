import { FaDiscord, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com/invite/yeSXK2QTX7", icon: <FaDiscord /> },
  { href: "https://youtube.com/@xenecajeuxmobile?si=fsiQUlpVI_PAHews", icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©jsarda 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
